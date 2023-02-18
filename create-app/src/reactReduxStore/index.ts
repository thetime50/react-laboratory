import { createStore } from "redux";

import rootReducers from "./reducers";

export interface ReactStoreStateInterface {
  name: string;
  cnt: number;
  loading: boolean;
}

const reactStore = createStore(rootReducers);

export default reactStore;
