import React from "react";
import { Provider } from "react-redux";

import { mainStore } from "reduxStore";
export default function reduxView() {
  const mainState = mainStore.getState();
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
        <button onClick={() => switchLoading()}></button>
      </div>
      <Provider store={mainStore}>
        <></>
      </Provider>
    </div>
  );
}
