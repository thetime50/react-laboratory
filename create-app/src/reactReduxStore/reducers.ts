import { combineReducers } from "redux";
import type { Action } from "redux";
import { CntActionType, LoadingActionType } from "./action_type";

interface DataAction<D = any, T = any> extends Action<T> {
  data?: D;
}

const nameReducer = function (state = "react redux", action: DataAction) {
  switch (action.type) {
    default:
      return state;
  }
};
const cntReducer = function (state = 0, action: DataAction) {
  switch (action.type) {
    case CntActionType.UPDATE:
      return action.data;
    case CntActionType.ADD:
      return state + 1;
    case CntActionType.SUB:
      return state - 1;
    default:
      return state;
  }
};
const loadingReducer = function (state = false, action: DataAction) {
  switch (action.type) {
    case LoadingActionType.UPDATE:
      return Boolean(action.data);
    case LoadingActionType.SWITCH:
      return !state;
    default:
      return state;
  }
};

// 把拆分多个函数的reduser 合并为一个reduser函数
const reactStore = combineReducers({
  name: nameReducer,
  cnt: cntReducer,
  loading: loadingReducer,
});

export default reactStore;
