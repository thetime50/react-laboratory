import React, { FC } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { MainStateInterface } from "reduxStore";

interface ReduxChild2PropInterface {
  childCnt: number;
  childLoading: boolean;
  subCnt: () => {};
  switchLoading: () => {};
}
const reduxChild2: FC<ReduxChild2PropInterface> = function (props) {
  const { childCnt, childLoading, subCnt, switchLoading } = props;
  return (
    <div>
      <h2>reduxChild2</h2>
      <div>childCnt {childCnt}</div>
      <div>childLoading {childLoading}</div>
      <div>
        <button onClick={subCnt}>sub cnt</button>
        <button onClick={switchLoading}>switch loading</button>
      </div>
    </div>
  );
};
const mapStateToProps = (state: MainStateInterface) => {
  // state - prop 映射
  return {
    childCnt: state.cnt,
    childLoading: state.loading,
  };
};
// const mapDispatchToProps = (dispatch /* , ownProps */) => ({
//   // dispatch - prop 映射
//   // // https://blog.csdn.net/weixin_45868552/article/details/116500637
//   // subCnt() {
//   //   let action = {
//   //     type: "cnt/update",
//   //     data: 1,
//   //   };
//   //   dispatch(action); //主要是用于发送一个action
//   // },
//   // // https://blog.huati365.com/c8c951d74774581a
//   // switchLoading: bindActionCreators(() => {}, dispatch),
//   // https://juejin.cn/post/6844903505191239694
//   // increment: (...args) => dispatch(actions.increment(...args)),
//   // decrement: (...args) => dispatch(actions.decrement(...args))

// });

// https://react-redux.js.org/tutorials/connect#connecting-the-components
const mapDispatchToProps = (dispatch: Dispatch, ownProps = {}) => ({
  // 和 ReduxChild2PropInterface 名称一致会冲突
  subTodo: () => {
    console.log("ownProps", ownProps);
    let action = {
      type: "cnt/update",
      data: 1,
    };
    dispatch(action);
    // return {
    //   type: "todo/update",
    //   data: 3,
    // };
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(reduxChild2);
