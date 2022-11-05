export const getParagraphHTMLParsedString = (HTMLString: string): string => {
  const paragraphElement = getHTMLParagraphNodeFromString(HTMLString);
  const parsedString = stringCleanUp(paragraphElement.innerHTML);

  return parsedString;
};

export const getHighlightedText = (text: string, highlight: string, isHTMLString: boolean): string => {
  if (!text) return "";
  if (!highlight || !highlight.trim()) {
    return text;
  }

  const re = getRegexpForHighlight(highlight);
  let paragraphHighlighted = "";

  if (isHTMLString) {
    const paragraphElement = getHTMLParagraphNodeFromString(text) as HTMLElement;

    //TODO: Check the entire element's childNode's and replace textNode found (nodeType === 3) with 3 new Element nodes.
    // (textNode, <Mark>textNode</Mark>, textNode);
    paragraphElement.innerHTML = getParsedTextWithHighlight(paragraphElement.innerText, re);
    paragraphHighlighted = paragraphElement.innerHTML;
  } else {
    paragraphHighlighted = getParsedTextWithHighlight(text, re);
  }

  return paragraphHighlighted;
};

const getRegexpForHighlight = (highlight: string) => {
  const SPECIAL_CHAR_RE = /([.?*+^$[\]\\(){}|-])/g;
  const escapedHighlight = highlight.replace(SPECIAL_CHAR_RE, "\\$1");
  return new RegExp(`(${escapedHighlight})`, "gi");
};

const getParsedTextWithHighlight = (text: string, regexp: RegExp) => {
  return text.replace(regexp, function (str) {
    return "<mark><strong>" + str + "</strong></mark>";
  });
};

const stringCleanUp = (text: string) => {
  return text
    .replace(/\r?\n|\r/g, " ") // Removing newlines aka break lines.
    .replace(/&nbsp;/g, " ") // Removing no-break space (white space).
    .trim();
};

const getHTMLParagraphNodeFromString = (HTMLString: string) => {
  //Every paragraph contains html, head and body elements. We need to remove them!.
  const parser = new DOMParser();
  let htmlDoc: Document;
  try {
    htmlDoc = parser.parseFromString(HTMLString, "text/html");

    //TODO: Apply HTML sanitizer if necessary.
  } catch {
    throw new Error(`${HTMLString} is not a valid html string.`);
  }

  return htmlDoc.body?.firstElementChild;
};
