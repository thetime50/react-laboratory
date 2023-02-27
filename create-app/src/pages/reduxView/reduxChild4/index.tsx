import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { ReactStoreStateInterface } from "reactReduxStore";
import { CntActionType, LoadingActionType } from "reactReduxStore/action_type";
import { cntAdd, loadingSwitch } from "reactReduxStore/action";

const UeduxChild4: FC = function (props) {
  const cntSel = useSelector((state: ReactStoreStateInterface) => state.cnt);
  const loadingSel = useSelector(
    (state: ReactStoreStateInterface) => state.loading
  );
  const dispatch = useDispatch();
  return (
    <div>
      <h2>reduxChild4</h2>
      <div>
        使用react -&gt; creactStore 构建， Provider构建， react-redux -&gt;
        useSelector useDispatch获取 修改
      </div>
      <div>childCnt {cntSel}</div>
      <div>childLoading {String(loadingSel)}</div>
      <div>
        <button
          onClick={() => {
            dispatch({ type: CntActionType.ADD });
          }}
        >
          add cnt
        </button>
        <button onClick={() => dispatch(loadingSwitch())}>
          switch loading
        </button>
      </div>
    </div>
  );
};

export default UeduxChild4;
