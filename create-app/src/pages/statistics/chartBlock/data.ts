import * as echarts from "echarts";

export const getChartOpt: () => echarts.EChartsOption = () => ({
  grid: {
    left: 2,
    right: 24,
    top: 30,
    bottom: 30,
    containLabel: true,
  },
  xAxis: {
    data: [],
    type: "category",
    // boundaryGap: false,
    axisLine: {
      // show: false,
      lineStyle: {
        color: "#aaa",
      },
    },
  },
  tooltip: {
    show: true,
    trigger: "axis",
  },
  legend: {},
  yAxis: {
    type: "value",
    // boundaryGap: [0, '30%'],
  },
  series: [],
});

export const getSeriseOpt: (
  name: string,
  color: string
) => echarts.SeriesOption = (name: string, color: string) => ({
  type: "line",
  name,
  // smooth: 0.6,
  symbol: "none",
  color,
  lineStyle: {
    color,
    width: 2,
  },
  // areaStyle: {
  //   color: color + '10',
  // },
  data: [],
});

export const getModkData = () => [
  {
    time: 2022090221,
    data: {
      "1": { success: 2856, failed: 919, total: 3775 },
      "2": { success: 49, failed: 23, total: 72 },
      "3": { success: 6662, failed: 2463, total: 9125 },
      "4": { success: 0, failed: 0, total: 0 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 18, failed: 110, total: 128 },
    },
  },
  {
    time: 2022090222,
    data: {
      "1": { success: 2687, failed: 872, total: 3559 },
      "2": { success: 59, failed: 52, total: 111 },
      "3": { success: 2824, failed: 1507, total: 4331 },
      "4": { success: 1, failed: 1, total: 2 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 19, failed: 0, total: 19 },
    },
  },
  {
    time: 2022090223,
    data: {
      "1": { success: 3539, failed: 921, total: 4460 },
      "2": { success: 215, failed: 166, total: 381 },
      "3": { success: 5343, failed: 2588, total: 7931 },
      "4": { success: 3, failed: 2, total: 5 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 9, failed: 0, total: 9 },
    },
  },
  {
    time: 2022090300,
    data: {
      "1": { success: 6744, failed: 2122, total: 8866 },
      "2": { success: 473, failed: 444, total: 917 },
      "3": { success: 20209, failed: 7709, total: 27918 },
      "4": { success: 3, failed: 12, total: 15 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 0, failed: 0, total: 0 },
    },
  },
  {
    time: 2022090301,
    data: {
      "1": { success: 9589, failed: 3166, total: 12755 },
      "2": { success: 377, failed: 461, total: 838 },
      "3": { success: 24124, failed: 8634, total: 32758 },
      "4": { success: 1, failed: 16, total: 17 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 0, failed: 0, total: 0 },
    },
  },
  {
    time: 2022090302,
    data: {
      "1": { success: 13178, failed: 5702, total: 18880 },
      "2": { success: 88, failed: 152, total: 240 },
      "3": { success: 16149, failed: 6308, total: 22457 },
      "4": { success: 0, failed: 5, total: 5 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 0, failed: 0, total: 0 },
    },
  },
  {
    time: 2022090303,
    data: {
      "1": { success: 9320, failed: 4653, total: 13973 },
      "2": { success: 13, failed: 36, total: 49 },
      "3": { success: 15379, failed: 4835, total: 20214 },
      "4": { success: 0, failed: 0, total: 0 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 0, failed: 0, total: 0 },
    },
  },
  {
    time: 2022090304,
    data: {
      "1": { success: 2915, failed: 1067, total: 3982 },
      "2": { success: 16, failed: 48, total: 64 },
      "3": { success: 12040, failed: 2601, total: 14641 },
      "4": { success: 0, failed: 0, total: 0 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 0, failed: 60, total: 60 },
    },
  },
  {
    time: 2022090305,
    data: {
      "1": { success: 2234, failed: 605, total: 2839 },
      "2": { success: 35, failed: 45, total: 80 },
      "3": { success: 5464, failed: 1530, total: 6994 },
      "4": { success: 1, failed: 1, total: 2 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 11, failed: 104, total: 115 },
    },
  },
  {
    time: 2022090306,
    data: {
      "1": { success: 2950, failed: 1191, total: 4141 },
      "2": { success: 42, failed: 58, total: 100 },
      "3": { success: 3390, failed: 1065, total: 4455 },
      "4": { success: 1, failed: 1, total: 2 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 16, failed: 83, total: 99 },
    },
  },
  {
    time: 2022090307,
    data: {
      "1": { success: 3490, failed: 1627, total: 5117 },
      "2": { success: 140, failed: 111, total: 251 },
      "3": { success: 3221, failed: 1651, total: 4872 },
      "4": { success: 2, failed: 9, total: 11 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 15, failed: 82, total: 97 },
    },
  },
  {
    time: 2022090308,
    data: {
      "1": { success: 3697, failed: 2121, total: 5818 },
      "2": { success: 512, failed: 299, total: 811 },
      "3": { success: 2958, failed: 3174, total: 6132 },
      "4": { success: 2, failed: 9, total: 11 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 20, failed: 83, total: 103 },
    },
  },
  {
    time: 2022090309,
    data: {
      "1": { success: 4672, failed: 3193, total: 7865 },
      "2": { success: 471, failed: 394, total: 865 },
      "3": { success: 2650, failed: 3508, total: 6158 },
      "4": { success: 0, failed: 2, total: 2 },
      "5": { success: 4, failed: 5, total: 9 },
      "6": { success: 20, failed: 96, total: 116 },
    },
  },
  {
    time: 2022090310,
    data: {
      "1": { success: 3825, failed: 2535, total: 6360 },
      "2": { success: 113, failed: 205, total: 318 },
      "3": { success: 2708, failed: 3075, total: 5783 },
      "4": { success: 3, failed: 2, total: 5 },
      "5": { success: 5, failed: 6, total: 11 },
      "6": { success: 20, failed: 99, total: 119 },
    },
  },
  {
    time: 2022090311,
    data: {
      "1": { success: 3111, failed: 1508, total: 4619 },
      "2": { success: 531, failed: 109, total: 640 },
      "3": { success: 2792, failed: 2471, total: 5263 },
      "4": { success: 8, failed: 0, total: 8 },
      "5": { success: 1, failed: 1, total: 2 },
      "6": { success: 20, failed: 84, total: 104 },
    },
  },
  {
    time: 2022090312,
    data: {
      "1": { success: 3474, failed: 1196, total: 4670 },
      "2": { success: 748, failed: 146, total: 894 },
      "3": { success: 2029, failed: 1396, total: 3425 },
      "4": { success: 6, failed: 1, total: 7 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 20, failed: 61, total: 81 },
    },
  },
  {
    time: 2022090313,
    data: {
      "1": { success: 3424, failed: 1079, total: 4503 },
      "2": { success: 472, failed: 155, total: 627 },
      "3": { success: 1360, failed: 953, total: 2313 },
      "4": { success: 1, failed: 1, total: 2 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 20, failed: 60, total: 80 },
    },
  },
  {
    time: 2022090314,
    data: {
      "1": { success: 4649, failed: 1848, total: 6497 },
      "2": { success: 465, failed: 199, total: 664 },
      "3": { success: 1226, failed: 1055, total: 2281 },
      "4": { success: 1, failed: 0, total: 1 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 20, failed: 80, total: 100 },
    },
  },
  {
    time: 2022090315,
    data: {
      "1": { success: 5457, failed: 2872, total: 8329 },
      "2": { success: 303, failed: 330, total: 633 },
      "3": { success: 2038, failed: 1300, total: 3338 },
      "4": { success: 4, failed: 0, total: 4 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 20, failed: 80, total: 100 },
    },
  },
  {
    time: 2022090316,
    data: {
      "1": { success: 5160, failed: 2830, total: 7990 },
      "2": { success: 105, failed: 341, total: 446 },
      "3": { success: 2765, failed: 1684, total: 4449 },
      "4": { success: 3, failed: 0, total: 3 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 20, failed: 81, total: 101 },
    },
  },
  {
    time: 2022090317,
    data: {
      "1": { success: 5771, failed: 2414, total: 8185 },
      "2": { success: 83, failed: 331, total: 414 },
      "3": { success: 2071, failed: 1222, total: 3293 },
      "4": { success: 0, failed: 0, total: 0 },
      "5": { success: 0, failed: 0, total: 0 },
      "6": { success: 20, failed: 81, total: 101 },
    },
  },
];
