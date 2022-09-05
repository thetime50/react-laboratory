import React, { useState, useRef, useEffect } from "react";
import { Form, DatePicker } from "antd";
import Moment from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import style from "./style.module.scss";
import { ChartBlock } from "./chartBlock";

// import { playerLogDuccessTotal } from "@/api/playerLog";
import { DataItem } from "./playerLogType";
import { useLivecycle } from "./reactUtils";

import { getModkData } from "./chartBlock/data";

function playerLogDuccessTotal(a: {
  start: string;
  end: string;
  interval: number;
}) {
  return {
    state: 0,
    data: getModkData(),
  };
}

export default function AtatisticsPage() {
  const [date, setDate] = useState([
    Moment().subtract(3, "days"),
    Moment(),
  ] as RangeValue<Moment.Moment>);
  const [data, setData] = useState<Array<DataItem>>([]);
  const blocks: Array<{
    title: string;
    keyStr: "1" | "2" | "3" | "4" | "5" | "6";
  }> = [
    { title: "插件模式，云端VPS环境，网页自动化", keyStr: "1" },
    { title: "插件模式，云端VPS环境，插件自动化", keyStr: "2" },
    { title: "小助手模式，云端VPS环境，网页自动化", keyStr: "3" },
    { title: "小助手模式，云端VPS环境，插件自动化", keyStr: "4" },
    { title: "小助手模式，自有设备环境，网页自动化", keyStr: "5" },
    { title: "小助手模式，自有设备环境，插件自动化", keyStr: "6" },
  ];
  useLivecycle({
    componentDidMount: async () => {
      // console.log(
      //   `playerLogDuccessTotal({
      //   start: "2022092000",
      //   end: "2022090100"
      // }) :>> `,
      //   await playerLogDuccessTotal({
      //     start: '2022090100',
      //     end: '2022090200',
      //     interval: 1,
      //   })
      // );
      refresh(date);
    },
  });
  async function refresh(
    dates: RangeValue<Moment.Moment>,
    dateStrings?: [string, string]
  ) {
    if (!dates || !dates[0] || !dates[1]) {
      return;
    }
    setDate(dates);
    const start = dates[0]?.format("YYYYMMDDHH");
    const end = dates[1]?.format("YYYYMMDDHH");
    let interval = 24;
    if (dates[1].unix() - dates[0].unix() <= 3 * 24 * 60 * 60) {
      interval = 1;
    }
    console.log("{start,end,interval} :>> ", { start, end, interval });
    const res = await playerLogDuccessTotal({
      start,
      end,
      interval,
    });
    setData(res.data || []);
  }
  const charts = blocks.map((v) => {
    return (
      <ChartBlock
        data={data}
        title={v.title}
        keyStr={v.keyStr}
        key={v.keyStr}
      />
    );
  });
  return (
    <div className={style.atatisticsPage + " flex-layout fcol"}>
      <h2 className="flex-none">统计数据</h2>
      <div className="flex-auto">
        <div className="form">
          <DatePicker.RangePicker
            onChange={refresh}
            defaultValue={date}
          ></DatePicker.RangePicker>
        </div>
        {charts}
      </div>
    </div>
  );
}
