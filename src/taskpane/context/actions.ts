import { types } from "./reducers";
import { ParagraphInfo } from "../api/fetchFromDocument";

export const useActions = (dispatch) => {
  const addCollection = (newCollection: ParagraphInfo[]) => {
    dispatch({ type: types.ADD_PARAGRAPH_COLLECTION, payload: { data: newCollection } });
  };
  const setLoading = (isLoading: boolean) => {
    dispatch({ type: types.APP_LOADING, payload: { isLoading } });
  };
  const setErrorMessage = (errorMessage: string) => {
    dispatch({ type: types.ERROR_MESSAGE, payload: { errorMessage } });
  };
  return {
    addCollection,
    setLoading,
    setErrorMessage,
  };
};
