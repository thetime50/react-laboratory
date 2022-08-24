import { Graph, Model, Node, Cell } from "@antv/x6";

export async function renderX6domo(dom: HTMLDivElement) {
  const graph = new Graph({
    container: dom,
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

  parent.addChild(source);
  parent.addChild(target);

  let ctrlPressed = false;
  const embedPadding = 20;

  graph.on<"node:embedding">("node:embedding", ({ e }) => {
    ctrlPressed = e.metaKey || e.ctrlKey;
  });

  graph.on("node:embedded", () => {
    ctrlPressed = false;
  });

  graph.on("node:change:size", ({ node, options }) => {
    if (options.skipParentHandler) {
      return;
    }

    const children = node.getChildren();
    if (children && children.length > 0) {
      // node.prop('originSize', node.getSize())
    }
  });

  graph.on("node:change:position", ({ node, options }) => {
    if (options.skipParentHandler || ctrlPressed) {
      return;
    }

    const children = node.getChildren();
    if (children && children.length > 0) {
      // node.prop('originPosition', node.getPosition())
    }

    const parent = node.getParent();
    if (parent && parent.isNode()) {
      let originSize = parent.prop("originSize");
      if (originSize == undefined) {
        originSize = parent.getSize();
        // parent.prop('originSize', originSize)
      }

      let originPosition = parent.prop("originPosition");
      if (originPosition == undefined) {
        originPosition = parent.getPosition();
        // parent.prop('originPosition', originPosition)
      }

      let { x } = originPosition;
      let { y } = originPosition;
      let cornerX = originPosition.x + originSize.width;
      let cornerY = originPosition.y + originSize.height;
      let hasChange = false;

      const children = parent.getChildren();
      if (children) {
        for (const child of children) {
          const bbox = child.getBBox().inflate(embedPadding);
          const corner = bbox.getCorner();

          if (bbox.x < x) {
            x = bbox.x;
            hasChange = true;
          }

          if (bbox.y < y) {
            y = bbox.y;
            hasChange = true;
          }

          if (corner.x > cornerX) {
            cornerX = corner.x;
            hasChange = true;
          }

          if (corner.y > cornerY) {
            cornerY = corner.y;
            hasChange = true;
          }
        }
      }

      if (hasChange) {
        parent.prop(
          {
            position: { x, y },
            size: { width: cornerX - x, height: cornerY - y },
          },
          { skipParentHandler: true }
        );
      }
    }
  });
}
