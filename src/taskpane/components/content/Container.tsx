import * as React from "react";
import { Stack, MessageBar, MessageBarType, Spinner, SpinnerSize, Label } from "@fluentui/react";
import { HTMLContent } from "./htmlContent/";
import { withHighlight } from "./highlight/";
import { withControls } from "./controls/";
import { useDocumentData } from "../../word/hooks/useDocumentData";

const ContentWithHighlight = withHighlight(HTMLContent);
const ContentWithHighlightAndControls = withControls(ContentWithHighlight);

const ErrorAlert = ({ message }: { message: string }) => (
  <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
    {message}
  </MessageBar>
);

export const ContentContainer = () => {
  const [index, setIndex] = React.useState<number>(0);
  const [searchedValue, setSearchedValue] = React.useState<string>();
  const { data, errorMessage, loading } = useDocumentData();

  const filteredCollection = searchedValue
    ? data.filter((paragraph) => paragraph.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase()))
    : data;

  const content = filteredCollection[index];

  const onSearchHandler = (value: string) => {
    if (!value) {
      // Find filtered paragraph on main collection. So we wont change/skip/flicker page once we remove our search param.
      const currentIndex = data.findIndex((paragraph) => paragraph.includes(content)) || 0;
      setIndex(currentIndex);
    } else {
      // New search, setting to 0 to get first finding of filteredCollection.
      setIndex(0);
    }
    setSearchedValue(value);
  };

  if (loading)
    return (
      <Stack verticalAlign="center" horizontalAlign="center" verticalFill>
        <Label>Loading document.</Label>
        <Label>Please wait...</Label>
        <Spinner size={SpinnerSize.large} />
      </Stack>
    );

  return (
    <Stack as="section" tokens={{ padding: "50px 20px 0 20px", childrenGap: "10" }}>
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <ContentWithHighlightAndControls
        content={content}
        highlight={searchedValue}
        currentIndex={index}
        upperLimitIndex={filteredCollection?.length}
        onIndexChangeHandler={(newIndex) => setIndex(newIndex)}
        onSearch={onSearchHandler}
      />
    </Stack>
  );
};
