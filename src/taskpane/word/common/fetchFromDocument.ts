import { IParagraphInfo } from "../word.types";

interface IOptionsProps {
  htmlCallback?: (htmlString: string) => string;
  textCallback?: (htmlString: string) => string;
}

export const fetchParagraphInfo = (index: number, options?: IOptionsProps): Promise<IParagraphInfo> => {
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
    const html = options.htmlCallback ? options.htmlCallback(htmlParagraph.value) : htmlParagraph.value;
    const text = options.textCallback ? options.textCallback(paragraph.text) : paragraph.text;

    return { html, text };
  });
};

export const fetchParagraphInfoCollection = (options?: IOptionsProps): Promise<string[]> => {
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
      const html = options.htmlCallback ? options.htmlCallback(paragraphInfo.value) : paragraphInfo.value;

      return html;
    });
  });
};
