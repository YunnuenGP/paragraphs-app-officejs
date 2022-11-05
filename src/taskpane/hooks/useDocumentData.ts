import * as React from "react";
import { fetchParagraphBatch, fetchParagraphCollection } from "../api/fetchFromDocument";
import { getParagraphHTMLParsedString } from "../utils/paragraphParser";
import { useStore } from "../context/StoreContext";

export const useDocumentData = () => {
  const [state, actions] = useStore();
  const data = state?.data;

  React.useEffect(() => {
    actions.setLoading(true);
    const getAllParagraphs = async () => {
      try {
        // fetch a small batch as an opt-in feature to reduce initial loading screen.
        const _paragraphs = await fetchParagraphBatch(5, { HTMLCallback: getParagraphHTMLParsedString });
        actions.addCollection(_paragraphs);

        // fetch entire document in the background and update store once it finish.
        fetchParagraphCollection({ HTMLCallback: getParagraphHTMLParsedString }).then((collection) => {
          actions.addCollection(collection);
        });
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
