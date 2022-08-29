import {
  testCreateGraphControlManager,
  testGraphControlManagerExec,
} from "./GraphControlManager";
import HandleResizeControl from "./handleResizeControl";
import { Graph, Model, Node, Cell } from "@antv/x6";

export function renderControlManager(dom: HTMLDivElement) {
  const graph = new Graph({
    container: dom,
    mousewheel: true,
    grid: true,
    embedding: {
      enabled: true,
    },
    highlighting: {
      embedding: {
        name: "stroke",
        args: {
          padding: -1,
          attrs: {
            stroke: "#73d13d",
          },
        },
      },
    },
  });

  const graphControlManager = testCreateGraphControlManager(graph);
  testGraphControlManagerExec(graph, "add", new HandleResizeControl(graph));
}
