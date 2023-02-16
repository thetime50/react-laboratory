import { createStore } from "redux";
import type { Action } from "redux";

interface MainStateInterface {
  cnt: number;
  loading: boolean;
}

interface DataAction<D = any, T = any> extends Action<T> {
  data?: D;
}

function mainRecuder(
  state: MainStateInterface = { cnt: 0, loading: false },
  action: DataAction
) {
  console.log("action", action);
  switch (action.type) {
    case "cnt/update":
      return { ...state, cnt: action.data };
    case "loading/update":
      return { ...state, loading: action.data };
    default:
      return state;
  }
}

export const mainStore = createStore<MainStateInterface, Action, {}, {}>(
  mainRecuder
);
