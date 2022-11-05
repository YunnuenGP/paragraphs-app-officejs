interface IOptionsProps {
  HTMLCallback?: (HTMLString: string) => string;
}

export const fetchSingleParagraph = (index: number, options?: IOptionsProps): Promise<string> => {
  return Word.run(async (context) => {
    // Getting first paragraph node from body content.
    let paragraph = context.document.body.paragraphs.getFirst();

    // Traveling across paragraphs nodes.
    for (let i = 1; i <= index; i++) {
      paragraph = paragraph.getNextOrNullObject();
    }

    // Queueing actions to get paragraph data and its HTML representation, position matters!.
    paragraph.load("style");
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

    return html;
  });
};

export const fetchParagraphBatch = (amount: number, options?: IOptionsProps): Promise<string[]> => {
  return Word.run(async (context) => {
    const paragraphs = [];
    let paragraph = context.document.body.paragraphs.getFirst();
    paragraph.load("style");
    paragraphs.push(paragraph);

    // Traveling across paragraphs nodes.
    for (let i = 1; i <= amount; i++) {
      paragraph = paragraph.getNextOrNullObject();
      paragraph.load("style");
      paragraphs.push(paragraph);
    }

    // Apply Queued actions. We need this to get access to paragraphs methods such as getHtml.
    await context.sync();

    const paragraphBatch = paragraphs.map((p) => p.getHtml());
    await context.sync();

    // We need to get html value created on the last sync. Also applying any external parser to the values.
    return paragraphBatch.map((paragraphInfo) => {
      const html = options.HTMLCallback ? options.HTMLCallback(paragraphInfo.value) : paragraphInfo.value;
      return html;
    });
  });
};

export const fetchParagraphCollection = (options?: IOptionsProps): Promise<string[]> => {
  return Word.run(async (context) => {
    // Getting all paragraph nodes from body content.
    const paragraphs = context.document.body.paragraphs;

    // Queueing actions to get paragraph's smallest property data. We need to load this beafore asking for HTML.
    paragraphs.load("style");
    await context.sync();

    // Creating a Queue action pool to get each paragraph's HTML representation.
    const paragraphInfoCollection = paragraphs.items.map((p) => p.getHtml());
    await context.sync();

    // We need to get html value created on the last sync. Also applying any external parser to the values.
    return paragraphInfoCollection.map((paragraphInfo) => {
      const html = options.HTMLCallback ? options.HTMLCallback(paragraphInfo.value) : paragraphInfo.value;

      return html;
    });
  });
};
