import React from "react";
import { Provider } from "react-redux";
import { mainStore } from "reduxStore";
import reactStore from "reactReduxStore";

import ReduxChild1 from "./reduxChild1";
import ReduxChild2 from "./reduxChild2";
import ReduxChild3 from "./reduxChild3";
import ReduxChild4 from "./reduxChild4";

export default function reduxView() {
  const mainState = mainStore.getState(); // 不会触发刷新
  console.log(
    "mainState.cnt, mainState.loading",
    mainState.cnt,
    mainState.loading
  );
  function addCnt() {
    mainStore.dispatch({ type: "cnt/update", data: mainState.cnt + 1 });
  }
  function switchLoading(loading?: boolean) {
    if (loading === undefined) {
      loading = !mainState.loading;
    }
    mainStore.dispatch({ type: "loading/update", data: loading });
  }
  return (
    <div>
      <h1>redux</h1>
      <div>
        <button onClick={addCnt}> cnt add </button>
        <button onClick={() => switchLoading()}>switch loading</button>
      </div>
      <ReduxChild1 />

      <Provider store={mainStore}>
        <ReduxChild2 str="hello" />
      </Provider>
      <h1>react redux</h1>
      <Provider store={reactStore}>
        <ReduxChild3 />
        <ReduxChild4 />
      </Provider>
    </div>
  );
}
