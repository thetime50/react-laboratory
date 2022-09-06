import React, {
  FC,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  RefObject,
} from "react";
import * as echarts from "echarts";

import style from "./style.module.scss";

export interface EchargsRef {
  setOption: echarts.EChartsType["setOption"];
}

interface EchargsProps {
  ref: RefObject<EchargsRef>;
  // onInit: () => echarts.EChartsOption | void;
  onInit?: () => void;
}

const EchartsComp = forwardRef<EchargsRef, EchargsProps>((props, ref) => {
  const chartEl = useRef(null);
  const { onInit } = props;
  const echartsIts = useRef<null | echarts.ECharts>(null);
  useEffect(() => {
    if (chartEl.current) {
      echartsIts.current = echarts.init(chartEl.current);
      onInit && onInit();
    }
    return () => {
      echartsIts.current && echartsIts.current.dispose();
    };
  }, [chartEl]);

  useImperativeHandle(ref, () => {
    const setOption: echarts.EChartsType["setOption"] = (...args) => {
      return (
        echartsIts.current && echartsIts.current.setOption(...(args as [any]))
      );
    };
    return {
      setOption,
    };
  });
  return <div className={style.EchartsComp} ref={chartEl}></div>;
});
export default EchartsComp;
