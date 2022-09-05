import React, { FC, useState, useRef, useEffect } from "react";
import { DataItem } from "../playerLogType";
import style from "./style.module.scss";
import { getChartOpt, getSeriseOpt } from "./data";
import { EChartsOption, SeriesOption, XAXisComponentOption } from "echarts";

import EchartsComp, { EchargsRef } from "../echartsComp";

interface ChartBlockProp {
  title: string;
  keyStr: "1" | "2" | "3" | "4" | "5" | "6";
  data: Array<DataItem>;
}

const seriesOpt = [
  { name: "success", color: "#51ff51" },
  { name: "failed", color: "#ff5151" },
  { name: "total", color: "#ff9f51" },
];

export const ChartBlock: FC<ChartBlockProp> = function (props) {
  const { title, keyStr, data } = props;
  const echartRef = useRef<EchargsRef>(null);
  let chartInited = false;
  function refresh() {
    let chartOpt: EChartsOption = {
      xAxis: { data: [] },
      series: [{ data: [] }, { data: [] }, { data: [] }],
    };
    if (!chartInited) {
      chartOpt = getChartOpt();
      chartOpt.series = seriesOpt.map((v) => getSeriseOpt(v.name, v.color));
    }
    const series = chartOpt.series as Array<SeriesOption>;
    let time: Array<string> = [];
    let success: Array<number> = [];
    let failed: Array<number> = [];
    let total: Array<number> = [1, 2, 4, 2];

    for (const v of data) {
      time = time.concat(v.time.toString());
      success = success.concat(v.data[keyStr].success);
      failed = failed.concat(v.data[keyStr].failed);
      total = total.concat(v.data[keyStr].total);
    }
    // const res = data.reduce(
    //   (t, v) => {
    //     t.time.push(v.time.toString());
    //     t.success.push(v.data[keyStr].success);
    //     t.failed.push(v.data[keyStr].failed);
    //     t.total.push(v.data[keyStr].total);
    //     return t;
    //   },
    //   {
    //     time: [] as Array<string>,
    //     success: [] as Array<number>,
    //     failed: [] as Array<number>,
    //     total: [9, 10] as Array<number>,
    //   }
    // );
    // XAXisComponentOption
    // (chartOpt.xAxis as any).data = time;
    // series[0].data = success;
    // series[1].data = failed;
    // series[2].data = total;
    // series[0].data = res.success;
    // series[1].data = res.failed;
    // series[2].data = res.total;
    console.dir([1, 2]);
    console.dir(success);
    // console.log([1, 2].__proto__, success.__proto__);
    // console.log([1, 2].__proto__ === success.success);
    if (echartRef.current) {
      // console.log(chartOpt.series[0].data.length);
      chartInited = true;
      // echartRef.current.setOption(chartOpt as any);
    }
  }
  function onEchargInit() {
    refresh();
  }
  useEffect(() => {
    refresh();
  }, [data]);
  return (
    <div className={""}>
      <h3>{title}</h3>
      <div className={style["chart-wp"]}>
        <EchartsComp ref={echartRef} onInit={onEchargInit}></EchartsComp>
      </div>
    </div>
  );
};
