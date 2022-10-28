import * as React from "react";
import { getHighlightedText } from "../../../utils/paragraphParser";

type HighlightProps = {
  content: string;
  highlight: string;
};

export const withHighlight = <TProps extends HighlightProps>(Component: React.ComponentType<TProps>) => {
  // eslint-disable-next-line react/display-name
  return (props: TProps) => {
    const content = getHighlightedText(props.content, props.highlight, true);

    return <Component {...props} content={content} />;
  };
};
