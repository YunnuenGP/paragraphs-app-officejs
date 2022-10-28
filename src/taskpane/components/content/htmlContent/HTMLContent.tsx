import * as React from "react";
import {
  Stack,
  IStackProps,
  // mergeStyleSets
} from "@fluentui/react";

interface ContentProps extends IStackProps {
  content: string;
}

//TODO: Implement a screen reader only element to add real text instead of html.
// const classNames = mergeStyleSets({
//   SROnly: {
//     position: "absolute",
//     left: "-10000px",
//     top: "auto",
//     width: "1px",
//     height: "1px",
//     overflow: "hidden",
//   },
// });

export const HTMLContent = ({ content, ...props }: ContentProps) => {
  return (
    <Stack {...props}>
      <Stack.Item>
        <div aria-hidden="true" dangerouslySetInnerHTML={{ __html: content }} />
      </Stack.Item>
    </Stack>
  );
};
