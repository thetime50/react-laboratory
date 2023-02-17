import React from "react";

import { mainStore } from "reduxStore";
export default function reduxChild1() {
  const mainState = mainStore.getState();
  return (
    <div>
      <h2>reduxChild1</h2>
      <div>mainState.cnt {mainState.cnt}</div>
      <div>mainState.loading {String(mainState.loading)}</div>
    </div>
  );
}
