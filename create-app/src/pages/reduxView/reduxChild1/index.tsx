import React from "react";

import { mainStore } from "reduxStore";
export default function reduxChild1() {
  const mainState = mainStore.getState();
  return (
    <div>
      <h2>reduxChild1</h2>
      <p>
        没有触发刷新 需要react-redux 的 Provider 和 connect 或者useSelect 来绑定
      </p>
      <div>mainState.cnt {mainState.cnt}</div>
      <div>mainState.loading {String(mainState.loading)}</div>
    </div>
  );
}
