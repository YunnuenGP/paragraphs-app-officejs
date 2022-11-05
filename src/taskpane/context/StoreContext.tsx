import * as React from "react";
import { useActions } from "./actions";
import { useDocumentReducer, IContextProps } from "./reducers";

interface ProviderProps {
  children: React.ReactNode;
}

interface IActions {
  [key: string]: (value: any) => void;
}

const State = React.createContext<Partial<IContextProps>>(null);
const Actions = React.createContext<Partial<IActions>>(null);

export const Provider = ({ children }: ProviderProps) => {
  // Get state and dispatch from our custom hook reducer.
  const { state, dispatch } = useDocumentReducer([""]);

  // Get actions from useActions and pass it to Context.
  const actions = useActions(dispatch);

  // Render state, dispatch and special case actions
  return (
    <State.Provider value={state}>
      <Actions.Provider value={actions}>{children}</Actions.Provider>
    </State.Provider>
  );
};

export const useStore = (): [Partial<IContextProps>, Partial<IActions>] => {
  const actions = React.useContext<Partial<IActions>>(Actions);
  const state = React.useContext<Partial<IContextProps>>(State);
  return [state, actions];
};
