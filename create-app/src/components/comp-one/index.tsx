import React from "react";
import style from "./index.module.scss";
import "./index.scoped.scss";
import classnames from "classnames";
console.log("style", style);

export default function ComputedOne() {
  return (
    <>
      <p className={classnames([style["comp-one"]], { "comp-one": true })}>
        Hi, I'm computed one.
      </p>
      <p className="comp-one">Hi, I'm computed one. p2</p>
    </>
  );
}
