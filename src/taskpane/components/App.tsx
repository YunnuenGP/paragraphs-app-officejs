import { Label, SearchBox, Stack } from "@fluentui/react";
import * as React from "react";
import { sampleParagraph } from "../../../data/sampleParagraphs";

export interface Props {
  title: string;
  isOfficeInitialized: boolean;
}

const App: React.FC<Props> = () => {
  const parsedParagraph = new DOMParser().parseFromString(sampleParagraph, "text/xml");

  // Get run elements in this paragraph. "w:r" is the tagname for runs
  const runs = parsedParagraph.documentElement.getElementsByTagName("w:r");
  let textContent = "";
  // @ts-ignore
  runs.forEach((run) => (textContent += run.textContent));

  return (
    <Stack tokens={{ childrenGap: 32 }}>
      <SearchBox onSearch={() => {}} />
      <Stack>
        <Label>Paragraph Content</Label>
        {parsedParagraph.documentElement.textContent}
      </Stack>
      <Stack>
        <Label>Run Content</Label>
        {textContent}
      </Stack>
    </Stack>
  );
};

export default App;
