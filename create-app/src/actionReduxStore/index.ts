import thunkMiddleware from "redux-thunk"; // 已集成在Redux toolkit中
// import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { createLogger } from "redux-logger";
import { selectSubreddit, fetchPosts } from "./actions";
import rootReducer from "./reducers";

interface PostInterface {
  isFetching: boolean;
  didInvalidate: boolean;
  items: any[]; // {title}
  lastUpdated: number;
}
export interface StoreState {
  postsBySubreddit: Record<string, PostInterface>;
  selectedSubreddit: string;
}

const loggerMiddleware = createLogger();

// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunkMiddleware, loggerMiddleware)
// );
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware, loggerMiddleware),
});

store.dispatch(selectSubreddit("reactjs"));
// store
//   .dispatch(fetchPosts("reactjs"))
//   .then(() => console.log(store.getState()))
//   .catch((e) => e);
