import React, { FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import type { ReactStoreStateInterface } from "reactReduxStore";
import {
  cntUpdate,
  cntAdd,
  cntSub,
  loadingUpdate,
  loadingSwitch,
} from "reactReduxStore/action";

interface ReduxChild2PropInterface {
  childCnt: number;
  childLoading: boolean;
  cntSub: () => {};
  loadingSwitch: () => {};
}
const reduxChild3: FC<ReduxChild2PropInterface> = function (props) {
  const { childCnt, childLoading, cntSub, loadingSwitch } = props;
  return (
    <div>
      <h2>reduxChild3</h2>
      <div>
        使用redux -&gt; createStore 构造，Provider/connect 注入、转发，
        <br />
        触发数据修改 mapDispatchToProps 使用 对象-函数返回值的形式
      </div>
      <div>childCnt {childCnt}</div>
      <div>childLoading {String(childLoading)}</div>
      <div>
        <button onClick={cntSub}>sub cnt</button>
        <button onClick={loadingSwitch}>switch loading</button>
      </div>
    </div>
  );
};
const mapStateToProps = (state: ReactStoreStateInterface) => {
  // state - prop 映射
  return {
    childCnt: state.cnt,
    childLoading: state.loading,
  };
};

const mapDispatchToProps = {
  cntUpdate,
  cntAdd,
  cntSub,
  loadingUpdate,
  loadingSwitch,
}; // (dispatch: Dispatch, ownProps = {}) => ();
export default connect(mapStateToProps, mapDispatchToProps)(reduxChild3);
