import * as React from "react";
import { Search, IndexControl } from "./";
import { IndexControlProps } from "./IndexControl/IndexControl";
import { Stack, DefaultEffects } from "@fluentui/react";

interface ControlsProps extends IndexControlProps {
  content: string;
  highlight: string;
  onSearch: (value: string) => void;
}

export const withControls = <TProps extends ControlsProps>(Component: React.ComponentType<TProps>) => {
  // eslint-disable-next-line react/display-name
  return (props: TProps) => {
    return (
      <>
        <Stack
          horizontal
          verticalAlign="center"
          horizontalAlign="space-between"
          tokens={{ childrenGap: 40 }}
          disableShrink
          wrap
        >
          <Stack.Item grow={4}>
            <Search handleSearch={(value) => props.onSearch(value)} />
          </Stack.Item>
          <IndexControl
            onIndexChangeHandler={(value) => props.onIndexChangeHandler(value)}
            currentIndex={props.currentIndex}
            upperLimitIndex={props.upperLimitIndex}
            horizontal={true}
            verticalAlign="center"
            horizontalAlign="space-between"
            grow={1}
          />
        </Stack>
        <Component
          {...props}
          content={props.content}
          highlight={props.highlight}
          style={{ boxShadow: DefaultEffects.elevation8 }}
          tokens={{ padding: "10px 20px" }}
        />
      </>
    );
  };
};

// export const ControlContainer = ({ onIndexChange, onSearchChange }: IProps) => {
//   return (
//     <Stack horizontal verticalAlign="center" horizontalAlign="space-between" tokens={{ childrenGap: 20 }} wrap>
//       <Search handleSearch={onSearchChange} />
//       <IndexControl onChangeHandler={onIndexChange} upperLimitIndex={10} />
//     </Stack>
//   );
// };
