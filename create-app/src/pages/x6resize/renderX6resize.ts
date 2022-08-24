import { Graph, Model, Node, Cell } from "@antv/x6";

function haveChild(node: Node) {
  if (node.getChildren()?.length) {
    return true;
  }
  return false;
}

const STROKE_DIR_T = 0b0001;
const STROKE_DIR_R = 0b0010;
const STROKE_DIR_B = 0b0100;
const STROKE_DIR_L = 0b1000;
const STROKE_DIR_TR = STROKE_DIR_T | STROKE_DIR_R;
const STROKE_DIR_TL = STROKE_DIR_T | STROKE_DIR_L;
const STROKE_DIR_BR = STROKE_DIR_B | STROKE_DIR_R;
const STROKE_DIR_BL = STROKE_DIR_B | STROKE_DIR_L;

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

function resizeDataChilds(node: Cell) {
  return (
    node.getChildren()?.reduce((t: any, childNode) => {
      t[childNode.id] = {
        position: childNode.prop("position") as { x: number; y: number },
        size: childNode.prop("size") as { x: number; y: number },
        childs: resizeDataChilds(childNode),
      };
      return t;
    }, {} as any) || []
  );
}
function getNodeRectangle(node: Node) {
  const position = node.prop("position");
  const size = node.prop("size");
  if (!position) {
    throw new Error(`bnPosition is ${position}`);
  }
  if (!size) {
    throw new Error(`bnSize is ${size}`);
  }
  return {
    lert: position.x,
    right: position.x + size.width,
    top: position.y,
    bottom: position.y + +size.height,
  };
}

export function renderX6resize(dom: HTMLDivElement) {
  // console.log('x6Ref :>> ', x6Ref);
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

  // data

  const source = graph.addNode({
    x: 80,
    y: 100,
    width: 80,
    height: 40,
    label: "Child",
    zIndex: 10,
    attrs: {
      body: {
        stroke: "none",
        fill: "#3199FF",
      },
      label: {
        fill: "#fff",
        fontSize: 12,
      },
    },
  });

  const target = graph.addNode({
    x: 280,
    y: 80,
    width: 80,
    height: 40,
    label: "Child",
    zIndex: 10,
    attrs: {
      body: {
        stroke: "none",
        fill: "#47C769",
      },
      label: {
        fill: "#fff",
        fontSize: 12,
      },
    },
  });
  const grandfather = graph.addNode({
    x: 30,
    y: 30,
    width: 390,
    height: 190,
    zIndex: 1,
    label: "grandfather",
    attrs: {
      body: {
        fill: "#fffbe6",
        stroke: "#ffe7ba",
      },
      label: {
        fontSize: 12,
      },
    },
  });
  const parent = graph.addNode({
    x: 40,
    y: 40,
    width: 360,
    height: 160,
    zIndex: 1,
    label: "Parent",
    attrs: {
      body: {
        fill: "#fffbe6",
        stroke: "#ffe7ba",
      },
      label: {
        fontSize: 12,
      },
    },
  });

  grandfather.addChild(parent);
  parent.addChild(source);
  parent.addChild(target);

  let ctrlPressed = false;
  const embedPadding = 20;
  const handlePadding = 20;
  // graph.on('*', (e: any) => {
  //   console.log('e', e)
  // })
  graph.on<"node:embed">("node:embed", (ee) => {
    const { e, node } = ee;
    console.log("node:embed");
    ctrlPressed = e.metaKey || e.ctrlKey;
    if (ctrlPressed) return;
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
      const point = graph!.pageToLocal({
        x: e.pageX,
        y: e.pageY,
      });
      // console.log('rec :>> ', rec)
      // console.log('point :>> ', point);
      // console.log('position', position)
      // console.log('e :>> ', e);
      let strokeDir = 0;
      // console.log('point.y > rec.top && point.y < rec.top+ handlePadding :>> ', point.y > rec.top && point.y < rec.top+ handlePadding);
      if (point.y > rec.top && point.y < rec.top + handlePadding) {
        strokeDir |= STROKE_DIR_T;
      }
      if (point.y < rec.bottom && point.y > rec.bottom - handlePadding) {
        strokeDir |= STROKE_DIR_B;
      }
      if (point.x > rec.left && point.x < rec.left + handlePadding) {
        strokeDir |= STROKE_DIR_L;
      }
      if (point.x < rec.right && point.x > rec.right - handlePadding) {
        strokeDir |= STROKE_DIR_R;
      }
      console.log("strokeDir", strokeDir.toString(2));
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
  });
  graph.on<"node:embedding">("node:embedding", ({ e, node }) => {
    // console.log('node:embedding', ctrlPressed)
    // console.log('node.getData()', node)
    function resetChildPosition(
      currentNodes: Array<Cell>,
      originNodes: ResizeData["childs"]
    ) {
      for (const childNode of currentNodes) {
        const originChild = originNodes[childNode.id];
        originChild && childNode.prop("position", originChild.position);
        const childs = childNode.getChildren();
        if (childs && childs.length > 0) {
          resetChildPosition(childs, originChild.childs);
        }
      }
    }
    if (ctrlPressed) return;
    // const parent = node.getParent()
    // if (parent && parent.getProp('resizeData')) {
    //   return
    //  }
    const resizeData = node.prop("resizeData");
    const point = graph!.pageToLocal({
      x: e.pageX,
      y: e.pageY,
    });
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
      // console.log('strokeDir', strokeDir.toString(2))
      // console.log('node.prop()', node.prop())
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
        if (resultRec.left > minRec.left - embedPadding) {
          resultRec.left = minRec.left - embedPadding;
        }
        if (resultRec.right < minRec.right + embedPadding) {
          resultRec.right = minRec.right + embedPadding;
        }
        if (resultRec.top > minRec.top - embedPadding) {
          resultRec.top = minRec.top - embedPadding;
        }
        if (resultRec.bottom < minRec.bottom + embedPadding) {
          resultRec.bottom = minRec.bottom + embedPadding;
        }
      }
      // 父元相交控制
      const inRange = (min: number, max: number, value: number) =>
        value > min && value < max;
      const parent = node.getParent();
      let brother: Array<Cell> = [];
      let maxRec = {
        // 这个逻辑不对
        left: Number.MIN_VALUE,
        top: Number.MIN_VALUE,
        right: Number.MAX_VALUE,
        bottom: Number.MAX_VALUE,
      };
      if (parent) {
        const parentPosition = parent.prop("position");
        const parentSize = parent.prop("size");
        maxRec = {
          left: parentPosition.x,
          top: parentPosition.y,
          right: parentPosition.x + parentSize.width,
          bottom: parentPosition.y + parentSize.height,
        };
        brother = parent.getChildren() || [];
      } else {
        brother = graph?.getRootNodes() || [];
      }

      for (const brotherNode of brother) {
        if (brotherNode.isNode()) {
          if (brotherNode.id === node.id) continue;
          const bnRec = getNodeRectangle(brotherNode);
          if (inRange(maxRec.top, maxRec.bottom, bnRec.top)) {
            // if (bnRec.top < maxRec.bottom)
          }
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
  });

  graph.on<"node:mouseup">("node:mouseup", ({ node }) => {
    ctrlPressed = false;
    node.removeProp("resizeData");
    console.log("node:mouseup :>> ");
  });
}
