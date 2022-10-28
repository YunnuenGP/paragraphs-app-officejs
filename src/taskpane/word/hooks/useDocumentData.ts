import * as React from "react";
import { fetchParagraphInfoCollection } from "../common/fetchFromDocument";
import { getParagraphHTMLParsedString } from "../../utils/paragraphParser";
import { useStore } from "../../context/StoreContext";

export const useDocumentData = () => {
  const [state, actions] = useStore();
  const data = state?.data.length > 0 ? state.data : [""];

  React.useEffect(() => {
    actions.setLoading(true);
    const getAllParagraphs = async () => {
      try {
        const _paragraphs = await fetchParagraphInfoCollection({ htmlCallback: getParagraphHTMLParsedString });
        actions.addCollection(_paragraphs);
      } catch (error) {
        let message: string;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        actions.setErrorMessage(message);
      }
    };

    getAllParagraphs();
  }, []);

  return { data, loading: state.isLoading, errorMessage: state.errorMessage };
};
