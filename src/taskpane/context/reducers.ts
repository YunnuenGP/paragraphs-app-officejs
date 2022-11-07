import * as React from "react";
import { ParagraphInfo } from "../api/fetchFromDocument";

export interface IContextProps {
  data: ParagraphInfo[];
  isLoading: boolean;
  errorMessage: string;
}

interface IAction<T, P> {
  type: T;
  payload: P;
}

export type ActionsTypes = IAction<string, IContextProps>;

export const types = {
  ADD_PARAGRAPH_COLLECTION: "ADD_PARAGRAPH_COLLECTION",
  APP_LOADING: "APP_LOADING",
  ERROR_MESSAGE: "ERROR_MESSAGE",
};

const reducer = (state: IContextProps, action: ActionsTypes) => {
  switch (action.type) {
    case types.ADD_PARAGRAPH_COLLECTION:
      return {
        ...state,
        data: [...action.payload.data],
        isLoading: false,
        error: "",
      };
    case types.APP_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case types.ERROR_MESSAGE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };
    default:
      throw new Error("Unexpected action");
  }
};

export function useDocumentReducer(initialState: ParagraphInfo[]) {
  const [state, dispatch] = React.useReducer(reducer, {
    data: initialState,
    isLoading: false,
    errorMessage: "",
  });

  return {
    state,
    dispatch,
  };
}
