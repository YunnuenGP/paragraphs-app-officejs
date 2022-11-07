interface OptionsProps {
  HTMLCallback?: (HTMLString: string) => string;
}

export interface ParagraphInfo {
  html: string;
  text: string;
}

export const fetchSingleParagraph = (index: number, options?: OptionsProps) => {
  return Word.run(async (context) => {
    // Getting first paragraph node from body content.
    let paragraph = context.document.body.paragraphs.getFirst();

    // Traveling across paragraphs nodes.
    for (let i = 1; i <= index; i++) {
      paragraph = paragraph.getNextOrNullObject();
    }

    // Queueing actions to get paragraph data and its HTML representation, position matters!.
    paragraph.load("text");
    let htmlParagraph = paragraph.getHtml();

    // Apply Queued actions.
    await context.sync();

    /*  If index is greater than Paragraphs length, than we are getting a null object. 
        We are fixing our last paragraph as our upper limit. */
    if (paragraph.isNullObject) {
      paragraph = context.document.body.paragraphs.getLast();
      htmlParagraph = paragraph.getHtml();
      await context.sync();
    }

    // Applying any external parser to the values.
    const html = options.HTMLCallback ? options.HTMLCallback(htmlParagraph.value) : htmlParagraph.value;
    const text = paragraph.text;

    return { html, text };
  }) as Promise<ParagraphInfo>;
};

export const fetchParagraphBatch = (amount: number, options?: OptionsProps) => {
  return Word.run(async (context) => {
    const paragraphs = [];
    let paragraph = context.document.body.paragraphs.getFirst();
    paragraph.load("text");
    let htmlParagraph = paragraph.getHtml();
    paragraphs.push({ content: paragraph, html: htmlParagraph });

    // Traveling across paragraphs nodes.
    for (let i = 1; i <= amount; i++) {
      paragraph = paragraph.getNextOrNullObject();
      paragraph.load("text");
      htmlParagraph = paragraph.getHtml();
      paragraphs.push({ content: paragraph, html: htmlParagraph });
    }

    // Apply Queued actions. We need this to get access to paragraphs methods such as getHtml.
    await context.sync();

    // We need to get html value created on the last sync. Also applying any external parser to the values.
    return paragraphs
      .filter((paragraphInfo) => !paragraphInfo.content.isNullObject)
      .map((paragraphInfo) => {
        const html = options.HTMLCallback ? options.HTMLCallback(paragraphInfo.html.value) : paragraphInfo.html.value;
        const text = paragraphInfo.content.text;
        return { html, text };
      });
  }) as Promise<ParagraphInfo[]>;
};

export const fetchParagraphCollection = (options?: OptionsProps) => {
  return Word.run(async (context) => {
    // Getting all paragraph nodes from body content.
    const paragraphs = context.document.body.paragraphs;

    // Queueing actions to get paragraph's smallest property data. We need to load this beafore asking for HTML.
    paragraphs.load("text");
    await context.sync();

    // Creating a Queue action pool to get each paragraph's HTML representation.
    const paragraphInfoCollection = paragraphs.items.map((p) => p.getHtml());
    await context.sync();

    // We need to get html value created on the last sync. Also applying any external parser to the values.
    return paragraphInfoCollection.map((paragraphInfo, index) => {
      const html = options.HTMLCallback ? options.HTMLCallback(paragraphInfo.value) : paragraphInfo.value;
      const text = paragraphs.items[index].text;
      return { html, text };
    });
  }) as Promise<ParagraphInfo[]>;
};
