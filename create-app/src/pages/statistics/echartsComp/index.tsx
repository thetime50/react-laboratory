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
  let echartsIts: echarts.EChartsType | null = null;
  useEffect(() => {
    if (chartEl.current) {
      echartsIts = echarts.init(chartEl.current);
      onInit && onInit();
    }
    return () => {
      echartsIts && echartsIts.dispose();
    };
  }, [chartEl]);

  useImperativeHandle(ref, () => {
    const setOption: echarts.EChartsType["setOption"] = (...args) => {
      return echartsIts && echartsIts.setOption(...(args as [any]));
    };
    return {
      setOption,
    };
  });
  return <div className={style.echartsComp} ref={chartEl}></div>;
});
export default EchartsComp;
