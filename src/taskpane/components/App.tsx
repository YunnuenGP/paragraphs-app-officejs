import { Stack } from "@fluentui/react";
import * as React from "react";
import { Header } from "./header/Header";
import { ContentContainer } from "./content/Container";
import { Provider } from "../context/StoreContext";

export interface Props {
  title: string;
  isOfficeInitialized: boolean;
}

const App: React.FC<Props> = () => {
  return (
    <Stack as="section" verticalFill>
      <Header logo={require("./../../../assets/logo-filled.png")} title={"logo"} message="Paragraphs" />
      <Provider>
        <ContentContainer />
      </Provider>
    </Stack>
  );
};

export default App;
