import React from "react";
import produce from "immer";

// todo 错误捕获

export default function ImmerPage() {
  try {
    const currentState = {
      val: 1,
      arr: [2],
    };
    let dState = null;
    const nextState = produce(
      currentState,
      function recipe(draftState: typeof currentState) {
        dState = draftState;
        // console.log(
        //   "draftState === currentState :>> ",
        //   draftState === currentState
        // ); // false
        draftState.val = 12;
        console.log("draftState.val", draftState.val);
      }
    );
    // console.log("dState === nextState :>> ", dState === nextState); // false
    // nextState.val = 123; // 被冻结 报错
    // nextState.arr[0] = 22; // 被冻结 报错
    // nextState.arr.push(3); // 被冻结 报错
  } catch (error) {
    console.error(error);
  }
  return <div>immer page</div>;
}
