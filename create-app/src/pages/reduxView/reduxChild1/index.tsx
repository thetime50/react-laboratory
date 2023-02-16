import React from "react";
import { Provider } from "react-redux";

import { mainStore } from "reduxStore";
export default function reduxView() {
  const mainState = mainStore.getState();
  return (
    <div>
      <h2>reduxChild1</h2>
      <Provider store={mainStore}>
        <div>{cnt}</div>
        <div>{loading}</div>
      </Provider>
    </div>
  );
}
