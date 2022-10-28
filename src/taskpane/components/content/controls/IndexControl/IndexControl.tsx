import * as React from "react";
import { Stack, ActionButton, IIconProps, mergeStyleSets, Separator, IStackProps } from "@fluentui/react";

export interface IndexControlProps extends IStackProps {
  onIndexChangeHandler: (index: number) => void;
  upperLimitIndex: number;
  currentIndex: number;
}

const classNames = mergeStyleSets({
  iconClass: {
    fontSize: 14,
    margin: 0,
    padding: 0,
  },
});

const prevIcon: IIconProps = { iconName: "ChevronLeftMed" };
const nextIcon: IIconProps = { iconName: "ChevronRightMed" };

export const IndexControl = ({ onIndexChangeHandler, upperLimitIndex, currentIndex, ...props }: IndexControlProps) => {
  const onClickHandler = (value: number) => {
    onIndexChangeHandler(value);
  };

  const prevDisabled = currentIndex <= 0;
  const nextDisabled = currentIndex >= upperLimitIndex - 1;

  return (
    <Stack {...props}>
      <Stack.Item>
        <ActionButton
          aria-label="Previous Paragraph"
          iconProps={prevIcon}
          className={classNames.iconClass}
          disabled={prevDisabled}
          onClick={() => {
            onClickHandler(currentIndex - 1);
          }}
          title={"Previous Paragraph"}
        >
          Back
        </ActionButton>
      </Stack.Item>
      <Stack.Item>
        <Separator vertical />
      </Stack.Item>
      {/* <Stack horizontal horizontalAlign="space-between" verticalAlign="center" tokens={{ childrenGap: 10 }}>
        <Stack.Item>{currentParagraph}</Stack.Item>
        
        <Stack.Item>{totalParagraphs}</Stack.Item>
      </Stack> */}
      <Stack.Item>
        <ActionButton
          aria-label="Next Paragraph"
          iconProps={nextIcon}
          className={classNames.iconClass}
          disabled={nextDisabled}
          onClick={() => {
            onClickHandler(currentIndex + 1);
          }}
          title={"Next Paragraph"}
          styles={{
            flexContainer: {
              flexDirection: "row-reverse",
            },
          }}
        >
          Next
        </ActionButton>
      </Stack.Item>
    </Stack>
  );
};
