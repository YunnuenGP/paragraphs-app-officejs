import * as React from "react";
import { getTheme, Stack, mergeStyleSets } from "@fluentui/react";

export interface HeaderProps {
  title: string;
  logo: string;
  message: string;
}

const theme = getTheme();
const styles = {
  root: [
    {
      // background: theme.palette.themeSecondary,
      background: `linear-gradient(90deg, ${theme.palette.themePrimary} 0%, ${theme.palette.themeSecondary} 100%)`,
      // selectors: {
      //   ":hover": {
      //     background: theme.palette.themeSecondary,
      //   },
      // },
    },
  ],
};

const classNames = mergeStyleSets({
  image: {
    width: 48,
    height: 44,
  },
  title: {
    color: theme.palette.themeLighter,
    marginTop: 0,
    marginBottom: 0,
  },
});

export const Header: React.FC<HeaderProps> = (props) => {
  const { title, logo, message } = props;

  return (
    <Stack
      as="header"
      horizontal
      verticalAlign="center"
      styles={styles}
      tokens={{ childrenGap: "2%", padding: "1% 20px" }}
    >
      <img className={classNames.image} src={logo} alt={title} />
      <h1 className={classNames.title}>{message}</h1>
    </Stack>
  );
};
