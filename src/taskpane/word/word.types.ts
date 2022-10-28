export type ParagraphContent = string;
export type ParagraphHTMLString = string;
export type ParagraphHTML = Element;
export type ParagraphContentCollection = Array<ParagraphContent>;
export type ParagraphHTMLCollection = Array<ParagraphHTML>;

export interface IParagraphsHTML {
  paragraph: ParagraphHTML;
  paragraphCollection: ParagraphHTMLCollection;
}

export interface IParagraphInfo {
  html: ParagraphHTMLString;
  text: ParagraphContent;
}
