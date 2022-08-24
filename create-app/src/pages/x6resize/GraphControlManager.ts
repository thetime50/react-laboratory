import { Graph } from "@antv/x6";

/**
 * 应用数据无关的graph控制器管理器
 *
 * 业务应用程序 -----> graph交互/特性控制器 -------> graph控制器管理器 -------> x6 graph
 *
 * 1. 业务应用程序
 * 2. graph交互/特性控制器
 *  - 业务/应用无关的交互/特性控制器控制器插件 只用作对graph的控制实现graph交互特性
 *  - 如果有业务数据同步变动需要抛出接口(如注册回调 暴露一些参数等)，在应用层处理业务数据并通过回调注册进来
 * 3. graph控制器管理器
 *  - 控制器和graph的挂载，绑定和移除
 * 4. x6 graph
 *
 */
export class GraphControlBase {
  constructor(public graph: Graph) {}
  install() {
    //
  }
  uninstall() {
    //
  }
}

export interface ControlGraph extends Graph {
  graphControlManager_: GraphControlManager;
}

export default class GraphControlManager {
  controlList: Array<GraphControlBase> = [];
  public graph: ControlGraph;
  constructor(graph: Graph) {
    this.graph = graph as ControlGraph;
    this.graph.graphControlManager_ = this;
  }
  add(graphControl: GraphControlBase) {
    graphControl.install();
    this.controlList.push(graphControl);
  }
  remove(graphControl: GraphControlBase) {
    const match = this.controlList.indexOf(graphControl);
    if (match >= 0) {
      this.controlList[match].uninstall();
      this.controlList.splice(match, 1);
    }
  }
  removeAll() {
    for (const v of this.controlList) {
      v.uninstall();
    }
    this.controlList = [];
  }
}

type GraphControlManagerMethType = {
  add: GraphControlManager["add"];
  remove: GraphControlManager["remove"];
  removeAll: GraphControlManager["removeAll"];
};

export function testCreateGraphControlManager(graph: Graph) {
  const cgraph = graph as ControlGraph;
  return cgraph.graphControlManager_
    ? cgraph.graphControlManager_
    : new GraphControlManager(graph);
}

export function testGraphControlManagerExec<
  MK extends keyof GraphControlManagerMethType
>(
  graph: Graph,
  meth: MK,
  ...args: Parameters<GraphControlManagerMethType[MK]> // Parameters<>
): ReturnType<GraphControlManagerMethType[MK]> | void {
  const cgraph = graph as ControlGraph;
  if (cgraph.graphControlManager_) {
    // https://github.com/microsoft/TypeScript/issues/47615
    // type methType = (Parameters<GraphControlManagerMethType[MK]>) => ReturnType<GraphControlManagerMethType[MK]>
    // return cgraph.graphControlManager_[meth](...args);
    // 报错不友好 怎么处理
    return (cgraph.graphControlManager_[meth] as (...args: any[]) => any)(
      ...args
    );
  }
}
