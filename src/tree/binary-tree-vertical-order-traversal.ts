// DIFFICULTY: MEDIUM
// Given the root of a binary tree, return the vertical order traversal of its nodes' values. (i.e., from top to bottom,
// column by column).
//
// If two nodes are in the same row and column, the order should be from left to right.
//
// See {@link https://leetcode.com/problems/binary-tree-vertical-order-traversal/}.
import { TreeNode } from './common/tree-node';
export { verticalOrder };

// SOLUTION:
//
// There is no straightforward vertical order traversal.  However, a standard level order traversal can be used to get
// part of the way there.  If we assume that the root is at row 0 and column 0, we can do some bookkeeping while we
// traverse the nodes to assign a coordinate to every single node.
//
// While doing the traversal, we can keep track of a Map<Column, TreeNode[]> where each column is mapped to an array of
// nodes in the order they were encountered.  By doing a level order traversal (or BFS), we can ensure that nodes in
// the same "row" are encountered from left to right.
//
// COMPLEXITY:
//
// The BFS will run in O(n) time, and the sorting will run in O(n * log(n)) time.  We could, in theory, have a very
// imbalanced tree where the sorting dominates the time complexity.
function verticalOrder(root: TreeNode | null): number[][] {
  type Row = number;
  type Column = number;
  type ExtendedNode = {
    node: TreeNode;
    row: Row;
    column: Column;
  };

  if (root === null) {
    return [];
  }

  // Keep a map of column to nodes with their row values, so we can order by row later.
  const map = new Map<Column, ExtendedNode[]>();
  const queue: ExtendedNode[] = [{ node: root, row: 0, column: 0 }];

  // Keep track of the min and max columns so we can iterate over them later.
  let min = 0;
  let max = 0;

  while (queue.length > 0) {
    const u = queue.shift()!;

    // Add the node to this map for bookkeeping.
    if (!map.has(u.column)) {
      map.set(u.column, []);
    }
    map.get(u.column)!.push(u);

    // Update min/max columns.
    min = Math.min(min, u.column);
    max = Math.max(max, u.column);

    // Enqueue the children as usual in BFS.
    if (u.node.left !== null) {
      queue.push({
        node: u.node.left,
        row: u.row + 1,
        column: u.column - 1
      });
    }

    if (u.node.right !== null) {
      queue.push({
        node: u.node.right,
        row: u.row + 1,
        column: u.column + 1
      });
    }
  }

  const result: number[][] = [];
  for (let column = min; column <= max; column++) {
    // Sort the nodes by the row index to get the vertical order for this particular column.
    const nodes = map.get(column)!;
    nodes.sort((a, b) => a.row - b.row);

    // Now map each extended node to its value for the final result.
    const values = nodes.map(u => u.node.val);
    result.push(values);
  }

  return result;
}
