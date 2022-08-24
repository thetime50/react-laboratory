import { Graph, Cell, Events } from "@antv/x6";
import { GraphControlBase } from "./GraphControlManager";
import * as lodash from "lodash";
// import { getLogger } from "@greatrpa/core/src/utils/console.logger";
// const logger = getLogger("native.message.call");

const logger = console.log;

const STROKE_DIR_T = 0b0001;
const STROKE_DIR_R = 0b0010;
const STROKE_DIR_B = 0b0100;
const STROKE_DIR_L = 0b1000;
const STROKE_DIR_TR = STROKE_DIR_T | STROKE_DIR_R;
const STROKE_DIR_TL = STROKE_DIR_T | STROKE_DIR_L;
const STROKE_DIR_BR = STROKE_DIR_B | STROKE_DIR_R;
const STROKE_DIR_BL = STROKE_DIR_B | STROKE_DIR_L;

const DIR_INDEX_T = 0;
const DIR_INDEX_R = 1;
const DIR_INDEX_B = 2;
const DIR_INDEX_L = 3;

function resizeDataChilds(node: Cell) {
  return (
    node.getChildren()?.reduce((t: any, childNode) => {
      if (childNode.isNode()) {
        t[childNode.id] = {
          position: childNode.prop("position") as { x: number; y: number },
          size: childNode.prop("size") as { width: number; height: number },
          childs: resizeDataChilds(childNode),
        };
      }
      return t;
    }, {} as any) || []
  );
}

interface ResizeData {
  originSize: {
    width: number;
    height: number;
  };
  originPosition: {
    x: number;
    y: number;
  };
  originRectangle: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  strokeDir: number;
  childs: {
    [key: string]: {
      position: {
        x: number;
        y: number;
      };
      size: {
        width: number;
        height: number;
      };
      childs: ResizeData["childs"];
    };
  };
}

interface HandleResizeControlOptionsParameter {
  embedPadding?: [number] | [number, number] | [number, number, number, number]; // 上右下左
  handlePadding?:
    | [number]
    | [number, number]
    | [number, number, number, number]; // 上右下左
}
interface HandleResizeControlOptions {
  embedPadding: [number, number, number, number]; // 上右下左
  handlePadding: [number, number, number, number]; // 上右下左
}

function getDefaultOptions(): HandleResizeControlOptions {
  return {
    embedPadding: [20, 20, 20, 20],
    handlePadding: [20, 20, 20, 20],
  };
}
function getPaddingArray(
  ...args: Array<number>
): [number, number, number, number] {
  let res: [number, number, number, number] = [0, 0, 0, 0];
  switch (args.length) {
    case 1: {
      res = [args[0], args[0], args[0], args[0]];

      break;
    }
    case 2: {
      res = [args[0], args[1], args[0], args[1]];

      break;
    }
    case 4: {
      res = [args[0], args[1], args[2], args[3]];

      break;
    }
    default: {
      throw new Error(`getPaddingArr args length is ${args.length}`);
    }
  }
  return res;
}

export default class HandleResizeControl extends GraphControlBase {
  ctrlPressed = false;
  options: HandleResizeControlOptions;
  constructor(graph: Graph, options?: HandleResizeControlOptionsParameter) {
    super(graph);
    const opt = options
      ? this.optionsParam2options(options)
      : ({} as HandleResizeControlOptions);
    this.options = this.mergeOptions(getDefaultOptions(), opt);
    this.nodeEmbed = this.nodeEmbed.bind(this);
    this.nodeEmbedding = this.nodeEmbedding.bind(this);
    this.nodeMouseup = this.nodeMouseup.bind(this);
  }
  install() {
    this.graph.on<"node:embed">("node:embed", this.nodeEmbed);
    this.graph.on<"node:embedding">("node:embedding", this.nodeEmbedding);
    this.graph.on<"node:mouseup">("node:mouseup", this.nodeMouseup);
  }

  uninstall(): void {
    this.graph.off("node:embed", this.nodeEmbed);
    this.graph.off("node:embedding", this.nodeEmbedding);
    this.graph.off("node:mouseup", this.nodeMouseup);
  }

  optionsParam2options(
    optionsParameter: HandleResizeControlOptionsParameter
  ): HandleResizeControlOptions {
    // 参数结构整理 HandleResizeControlOptionsParam 转为 HandleResizeControlOptions
    const options = lodash.cloneDeep(optionsParameter);
    if (options.embedPadding) {
      options.embedPadding = getPaddingArray(...options.embedPadding);
    }
    if (options.handlePadding) {
      options.handlePadding = getPaddingArray(...options.handlePadding);
    }
    return options as HandleResizeControlOptions;
  }
  mergeOptions(
    ...args: Array<HandleResizeControlOptions>
  ): HandleResizeControlOptions {
    const res = args.reduce((t, v) => {
      lodash.assign(t, lodash.cloneDeep(v));
      return t;
    }, {});
    return res as HandleResizeControlOptions;
  }

  nodeEmbed(ge: Events.EventArgs["node:embed"]) {
    const { e, node } = ge;
    // logger('node:embed');
    this.ctrlPressed = e.metaKey || e.ctrlKey;
    if (this.ctrlPressed) return;
    const childs = node.getChildren();
    if (childs && childs.length > 0) {
      const size = node.getProp("size");
      const position = node.getProp("position");
      if (!size) return;
      if (!position) return;
      const rec = {
        left: position.x,
        right: position.x + size.width,
        top: position.y,
        bottom: position.y + size.height,
      };
      const point = this.graph!.pageToLocal({
        x: e.pageX,
        y: e.pageY,
      });
      let strokeDir = 0;
      const opt = this.options;
      if (
        point.y > rec.top &&
        point.y < rec.top + opt.handlePadding[DIR_INDEX_T]
      ) {
        strokeDir |= STROKE_DIR_T;
      }
      if (
        point.y < rec.bottom &&
        point.y > rec.bottom - opt.handlePadding[DIR_INDEX_B]
      ) {
        strokeDir |= STROKE_DIR_B;
      }
      if (
        point.x > rec.left &&
        point.x < rec.left + opt.handlePadding[DIR_INDEX_L]
      ) {
        strokeDir |= STROKE_DIR_L;
      }
      if (
        point.x < rec.right &&
        point.x > rec.right - opt.handlePadding[DIR_INDEX_R]
      ) {
        strokeDir |= STROKE_DIR_R;
      }
      // logger('strokeDir', strokeDir.toString(2));
      if (strokeDir) {
        // graph?.disableSelectionMovable()
        node.setProp("resizeData", {
          originSize: size,
          originPosition: position,
          originRectangle: rec,
          strokeDir,
          childs: resizeDataChilds(node),
        });
      }
    }
  }
  nodeEmbedding({ e, node }: Events.EventArgs["node:embedding"]) {
    // logger('node:embedding', ctrlPressed)
    // logger('node.getData()', node)
    function resetChildPosition(
      currentNodes: Array<Cell>,
      originNodes: ResizeData["childs"]
    ) {
      for (const childNode of currentNodes) {
        if (!childNode.isNode()) continue;
        const originChild = originNodes[childNode.id];
        originChild && childNode.prop("position", originChild.position);
        const childs = childNode.getChildren();
        if (childs && childs.length > 0) {
          resetChildPosition(childs, originChild.childs);
        }
      }
    }
    if (this.ctrlPressed) return;
    // const parent = node.getParent()
    // if (parent && parent.getProp('resizeData')) {
    //   return
    //  }
    const resizeData = node.prop("resizeData");
    const point = this.graph!.pageToLocal({
      x: e.pageX,
      y: e.pageY,
    });
    const opt = this.options;
    if (resizeData) {
      const { originPosition, originSize, originRectangle, strokeDir } =
        resizeData as ResizeData;
      // const resultPosition = {
      //   ...originPosition,
      // }
      // const resultSize ={
      //   ...originSize,
      // }
      const resultRec = {
        ...originRectangle,
      };
      if (strokeDir & STROKE_DIR_L) {
        resultRec.left = point.x;
      }
      if (strokeDir & STROKE_DIR_R) {
        resultRec.right = point.x;
      }
      if (strokeDir & STROKE_DIR_T) {
        resultRec.top = point.y;
      }
      if (strokeDir & STROKE_DIR_B) {
        resultRec.bottom = point.y;
      }
      // logger('strokeDir', strokeDir.toString(2))
      // logger('node.prop()', node.prop())
      const childs = node.getChildren();
      const minRec = {
        left: Number.MAX_VALUE,
        top: Number.MAX_VALUE,
        right: Number.MIN_VALUE,
        bottom: Number.MIN_VALUE,
      };

      // 子元素相交控制
      if (childs) {
        Object.keys(resizeData.childs).forEach((key: string) => {
          const child = resizeData.childs[key];
          const childRec = {
            left: child.position.x,
            top: child.position.y,
            right: child.position.x + child.size.width,
            bottom: child.position.y + child.size.height,
          };
          if (minRec.left > childRec.left) {
            minRec.left = childRec.left;
          }
          if (minRec.right < childRec.right) {
            minRec.right = childRec.right;
          }
          if (minRec.top > childRec.top) {
            minRec.top = childRec.top;
          }
          if (minRec.bottom < childRec.bottom) {
            minRec.bottom = childRec.bottom;
          }
        });
        if (resultRec.left > minRec.left - opt.embedPadding[DIR_INDEX_L]) {
          resultRec.left = minRec.left - opt.embedPadding[DIR_INDEX_L];
        }
        if (resultRec.right < minRec.right + opt.embedPadding[DIR_INDEX_R]) {
          resultRec.right = minRec.right + opt.embedPadding[DIR_INDEX_R];
        }
        if (resultRec.top > minRec.top - opt.embedPadding[DIR_INDEX_T]) {
          resultRec.top = minRec.top - opt.embedPadding[DIR_INDEX_T];
        }
        if (resultRec.bottom < minRec.bottom + opt.embedPadding[DIR_INDEX_B]) {
          resultRec.bottom = minRec.bottom + opt.embedPadding[DIR_INDEX_B];
        }
      }

      const resultPosition = {
        x: resultRec.left,
        y: resultRec.top,
      };
      const resultSize = {
        width: resultRec.right - resultRec.left,
        height: resultRec.bottom - resultRec.top,
      };
      node.prop({ size: resultSize, position: resultPosition });
      if (childs) {
        resetChildPosition(childs, resizeData.childs);
      }
    }
  }
  nodeMouseup({ node }: Events.EventArgs["node:mouseup"]) {
    this.ctrlPressed = false;
    node.removeProp("resizeData");
    // logger('node:mouseup');
  }
}
