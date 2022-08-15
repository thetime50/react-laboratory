import React from "react";
import style from "./index.module.scss";
console.log("style", style);

export default function ComputedOne() {
  return (
    <>
      <p className={style["comp-one"]}>Hi, I'm computed one.</p>
    </>
  );
}
