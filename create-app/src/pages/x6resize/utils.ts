import { Node } from "@antv/x6";

export function getNodeRectangle(node: Node) {
  const position = node.prop("position");
  const size = node.prop("size");
  if (!position) {
    throw new Error(`bnPosition is ${position}`);
  }
  if (!size) {
    throw new Error(`bnSize is ${size}`);
  }
  return {
    left: position.x,
    right: position.x + size.width,
    top: position.y,
    bottom: position.y + +size.height,
  };
}
