// 本质上这两个sction是共同作用域的 写在同一个枚举里会更好
export enum CntActionType {
  UPDATE = "cnt/update",
  ADD = "cnt/add",
  SUB = "cnt/sub",
}
export enum LoadingActionType {
  UPDATE = "loading/update",
  SWITCH = "loading/switch",
}
