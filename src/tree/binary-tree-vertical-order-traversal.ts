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
// The BFS will run in O(n) time where n is the number of nodes.  The result computation at the end will run in O(k)
// time where k is the number of columns.  However, you're always guaranteed to have more nodes than columns (or the
// same) so overall time complexity is still O(n).
//
// Space complexity is O(n) because we are storing k columns mapping to lists of nodes, but the overall number of nodes
// stored in the map is at most n.  We are also using a queue, which has at most n nodes in it.
function verticalOrder(root: TreeNode | null): number[][] {
  type Column = number;

  if (root === null) {
    return [];
  }

  // Keep a map of column to nodes.  Note that we don't actually need to store their row values, because if we visit
  // the nodes in the right order, the array will already be sorted by row.  The key is to push the left child before
  // the right child.
  const map = new Map<Column, TreeNode[]>();

  // We DO need to store the column values in our BFS queue though.  That's because as we shift items off the queue, we
  // will need to know which column it's in, so we can add it to the TreeNode array in the map above.
  type ExtendedNode = [TreeNode, Column];
  const queue: ExtendedNode[] = [[root, 0]];

  // Finally, we have to keep track of the min and max columns so we know where to start with the vertical order list.
  let min = 0;
  let max = 0;

  // The rest of the algorithm is a standard BFS.  We don't need to maintain a visited set because the nodes are
  // guaranteed to be organized as a tree, so we can't visit the same node twice.
  while (queue.length > 0) {
    const [node, column] = queue.shift()!;

    // Add the node to this map for bookkeeping.
    if (!map.has(column)) {
      map.set(column, []);
    }
    map.get(column)!.push(node);

    // Update min/max columns.
    min = Math.min(min, column);
    max = Math.max(max, column);

    // Enqueue the children as usual in BFS, but make sure to enqueue the LEFT child first to keep our proper row order.
    if (node.left !== null) {
      queue.push([node.left, column - 1]);
    }

    // Enqueue the children as usual in BFS, but make sure to enqueue the RIGHT child last.
    if (node.right !== null) {
      queue.push([node.right, column + 1]);
    }
  }

  // Now we have a map of Column -> TreeNode[], and for each column, we just print out the values in the row.
  const result: number[][] = [];
  for (let column = min; column <= max; column++) {
    // These nodes are already in row order because we visited the left child before the right.
    const rows = map.get(column)!;

    // Now map each extended node to its value for the final result.
    const values = rows.map(node => node.val);
    result.push(values);
  }

  return result;
}
