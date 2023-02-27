import React, { FC } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { MainStateInterface, mainStore } from "reduxStore";

interface ReduxChild2PropInterface {
  childCnt: number;
  childLoading: boolean;
  subCnt: () => void;
  switchLoading: () => void;
}
const reduxChild2: FC<ReduxChild2PropInterface> = function (props) {
  const { childCnt, childLoading, subCnt, switchLoading } = props;
  return (
    <div>
      <h2>reduxChild2</h2>
      <div>
        使用redux -&gt; createStore构建，Provider/connect注入、转发、触发
        <br />
        修改值时 需要在 connect的 mapDispatchToProps 里重新store.getState()
        <br />
        mapDispatchToProps使用函数-dispatch的形式
      </div>
      <div>childCnt {childCnt}</div>
      <div>childLoading {childLoading.toString()}</div>
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
const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: any, // 如果没有这个定义 ownProps 参数不会传入args里面
  ...args: any[]
) => ({
  // dispatch - prop 映射
  // // https://blog.csdn.net/weixin_45868552/article/details/116500637
  subCnt() {
    console.log("ownProps", ownProps); // 父组件传入的prop
    console.log("args :>> ", args);
    const state = mainStore.getState();
    let action = {
      type: "cnt/update",
      data: state.cnt - 1,
    };
    dispatch(action); //主要是用于发送一个action
  },
  // // https://blog.huati365.com/c8c951d74774581a
  switchLoading: bindActionCreators(() => {
    const state = mainStore.getState();

    return {
      type: "loading/update",
      data: !state.loading,
    };
  }, dispatch),
  // https://juejin.cn/post/6844903505191239694
  // increment: (...args) => dispatch(actions.increment(...args)),
  // decrement: (...args) => dispatch(actions.decrement(...args))
});

// https://react-redux.js.org/tutorials/connect#connecting-the-components
// const mapDispatchToProps = (dispatch: Dispatch, ownProps = {}) => ({
//   // 和 ReduxChild2PropInterface 名称一致会冲突
//   subCnt: () => {
//     console.log("ownProps", ownProps);
//     let action = {
//       type: "cnt/update",
//       data: 1,
//     };
//     dispatch(action);
//   },
// });
export default connect(mapStateToProps, mapDispatchToProps)(reduxChild2);

// function test(props: ReduxChild2PropInterface) {
//   //
// }

// test({} as Matching<
//   { childCnt: number; childLoading: boolean } & { subCnt: () => void },
//   ReduxChild2PropInterface
// >;)
