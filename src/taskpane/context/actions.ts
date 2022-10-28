import { types } from "./reducers";

export const useActions = (dispatch) => {
  const addCollection = (newCollection: string[]) => {
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
