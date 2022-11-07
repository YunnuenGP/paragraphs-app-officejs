export const getParagraphElement = (HTMLString: string) => {
  const paragraphElement = getParagraphElementFromHTMLString(HTMLString);
  const parsedString = stringCleanUp(paragraphElement.innerHTML);

  return parsedString as string;
};

export const getHighlightedText = (text: string, highlight: string, isHTMLString: boolean) => {
  if (!text) return "";
  if (!highlight || !highlight.trim()) {
    return text;
  }

  const re = getRegexpForHighlight(highlight);
  let _text = text;

  if (isHTMLString) {
    const paragraphElement = getParagraphElementFromHTMLString(text);
    _text = paragraphElement.textContent;
  }

  const paragraphHighlighted = getParsedTextWithHighlight(_text, re);
  return paragraphHighlighted as string;
};

export const getRegexpForHighlight = (highlight: string) => {
  const SPECIAL_CHAR_RE = /([.?*+^$[\]\\(){}|-])/g;
  const escapedHighlight = highlight.replace(SPECIAL_CHAR_RE, "\\$1");
  return new RegExp(`(${escapedHighlight})`, "gi") as RegExp;
};

export const getParsedTextWithHighlight = (text: string, regexp: RegExp) => {
  return text.replace(regexp, function (str) {
    return `<mark><strong>${str}</strong></mark>`;
  }) as string;
};

export const stringCleanUp = (text: string) => {
  return text
    .replace(/\r?\n|\r/g, " ") // Removing newlines aka break lines.
    .replace(/&nbsp;/g, " ") // Removing no-break space (white space).
    .trim() as string;
};

export const getParagraphElementFromHTMLString = (HTMLString: string) => {
  //Every paragraph contains html, head and body elements. We need to remove them!.
  const parser = new DOMParser();
  let htmlDoc: Document;
  try {
    htmlDoc = parser.parseFromString(HTMLString, "text/html");

    //TODO: Apply HTML sanitizer if necessary.
  } catch {
    throw new Error(`${HTMLString} is not a valid html string.`);
  }

  return htmlDoc.body?.firstElementChild as Element;
};
