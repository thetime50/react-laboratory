import thunkMiddleware from "redux-thunk"; // 已集成在Redux toolkit中
// import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { createLogger } from "redux-logger";
import { selectSubreddit, fetchPosts, fetchSignal } from "./actions";
import rootReducer from "./reducers";

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

store.dispatch(fetchSignal);
// store.dispatch((d1) => d1((d2) => d2(fetchSignal))); // 嵌套的dispatch回调传入
