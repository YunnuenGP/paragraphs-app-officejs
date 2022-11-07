import * as React from "react";
import { fetchParagraphBatch, fetchParagraphCollection } from "../api/fetchFromDocument";
import { getParagraphElement } from "../utils/paragraphParser";
import { useStore } from "../context/StoreContext";

export const useDocumentData = () => {
  const [state, actions] = useStore();
  const data = state?.data;

  React.useEffect(() => {
    actions.setLoading(true);
    const getAllParagraphs = async () => {
      try {
        // fetch a small batch as an opt-in feature to reduce initial loading screen.
        const _paragraphs = fetchParagraphBatch(10, { HTMLCallback: getParagraphElement });

        // fetch entire document in the background and update store once it finish.
        fetchParagraphCollection({ HTMLCallback: getParagraphElement }).then((collection) => {
          actions.addCollection(collection);
        });

        actions.addCollection(await _paragraphs);
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
