import React, { useEffect } from "react";
import "./index.scoped.scss";
import { Graph, Model, Node, Cell } from "@antv/x6";
import { renderX6domo } from "./x6demo";
import { renderX6resize } from "./renderX6resize";
// import HandleResizeControl from "./HandleResizeControl";
// import GraphControlManager from "./GraphControlManager";

async function delay(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

export default function Page2Page(props: {}) {
  const x6Reference = React.createRef<HTMLDivElement>();
  let graph: Graph | null = null;

  useEffect(() => {
    (async () => {
      if (!x6Reference.current) {
        return;
      }
      await delay(300);
      renderX6resize(x6Reference.current);
      // renderX6domo(x6Ref.current)
    })();
  }, [x6Reference]);
  return (
    <div className="x6resize-page flex-layout">
      <h1 className="flex-none">Page 2</h1>
      <div className="x6 flex-auto" ref={x6Reference} />
    </div>
  );
}
