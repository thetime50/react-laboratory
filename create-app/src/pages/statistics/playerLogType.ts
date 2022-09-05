export interface PlayerLogSuccessTotalQuery {
  start: string;
  end: string;
  interval: number;
}
export interface RowType {
  success: number;
  failed: number;
  total: number;
}
export interface DataItem {
  time: number;
  data: {
    1: RowType; // 1、插件模式，云端VPS环境，网页自动化;
    2: RowType; // 2、插件模式，云端VPS环境，插件自动化;
    3: RowType; // 3、小助手模式，云端VPS环境，网页自动化;
    4: RowType; // 4、小助手模式，云端VPS环境，插件自动化;
    5: RowType; // 5、小助手模式，自有设备环境，网页自动化;
    6: RowType; // 6、小助手模式，自有设备环境，插件自动化
  };
}

export type PlayerLogSuccessTotalPesponses = Array<DataItem>;
