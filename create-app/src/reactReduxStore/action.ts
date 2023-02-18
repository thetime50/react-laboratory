import { CntActionType, LoadingActionType } from "./action_type";

export const cntUpdate = (data: number) => {
  return { type: CntActionType.UPDATE, data };
};
export const cntAdd = () => {
  return { type: CntActionType.ADD };
};
export const cntSub = () => {
  return { type: CntActionType.SUB };
};
export const loadingUpdate = (data: boolean) => {
  return { type: LoadingActionType.UPDATE, data };
};
export const loadingSwitch = () => {
  return { type: LoadingActionType.SWITCH };
};
