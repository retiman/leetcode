// This class definition comes from the problem itself and we cannot change it, or else our submission will not be
// accepted.
export class _Node {
  val: boolean;

  isLeaf: boolean;

  topLeft: _Node | null;

  topRight: _Node | null;

  bottomLeft: _Node | null;

  bottomRight: _Node | null;

  constructor(
    val?: boolean,
    isLeaf?: boolean,
    topLeft?: _Node,
    topRight?: _Node,
    bottomLeft?: _Node,
    bottomRight?: _Node
  ) {
    this.val = val === undefined ? false : val;
    this.isLeaf = isLeaf === undefined ? false : isLeaf;
    this.topLeft = topLeft === undefined ? null : topLeft;
    this.topRight = topRight === undefined ? null : topRight;
    this.bottomLeft = bottomLeft === undefined ? null : bottomLeft;
    this.bottomRight = bottomRight === undefined ? null : bottomRight;
  }
}
