import React, { FC, useState, useRef, useEffect } from "react";
import { DataItem } from "../playerLogType";
import style from "./style.module.scss";
import { getChartOpt, getSeriseOpt } from "./data";
import { EChartsOption, SeriesOption, XAXisComponentOption } from "echarts";
import dayjs from "dayjs";

import EchartsComp, { EchargsRef } from "../echartsComp";

interface ChartBlockProp {
  title: string;
  keyStr: "1" | "2" | "3" | "4" | "5" | "6";
  data: Array<DataItem>;
  interval: number;
}

const seriesOpt = [
  { name: "success", color: "#52c41a" },
  { name: "failed", color: "#ff4d4f" },
  { name: "total", color: "#faad14" },
];

export const ChartBlock: FC<ChartBlockProp> = function (props: ChartBlockProp) {
  const { title, keyStr, data, interval } = props;
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
    let total: Array<number> = [];

    const formatStr = interval >= 24 ? "MM-DD" : "MM-DD HH:00";
    // for (const v of data) {
    data.forEach((v) => {
      time = time.concat(
        dayjs(v.time.toString(), "YYYYMMDDHH").format(formatStr)
      );
      success = success.concat(v.data[keyStr].success);
      failed = failed.concat(v.data[keyStr].failed);
      total = total.concat(v.data[keyStr].total);
    });
    (chartOpt.xAxis as any).data = time;
    series[0].data = success;
    series[1].data = failed;
    series[2].data = total;
    if (echartRef.current) {
      chartInited = true;
      echartRef.current.setOption(chartOpt as any);
    }
  }
  function onEchargInit() {
    refresh();
  }
  useEffect(() => {
    refresh();
  }, [data]);
  return (
    <div className={style["chart-block"]}>
      <h3>{title}</h3>
      <div className={style["chart-wp"]}>
        <EchartsComp ref={echartRef} onInit={onEchargInit}></EchartsComp>
      </div>
    </div>
  );
};
