// DIFFICULTY: Medium
//
// Given two nodes of a binary tree p and q, return their lowest common ancestor (LCA).
//
// According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes p and q in a tree T is the
// lowest node that has both p and q as descendants (where we allow a node to be a descendant of itself)."
//
// See {@link https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii}
import { TreeNode } from './common/tree-node';
export { lowestCommonAncestor };

// SOLUTION:
//
// In this problem, we are not given the parent nodes.  So we have to solve this problem using a recursive divide and
// conquer approach.
//
// The idea is that if p and q are in different subtrees (one in the left, one in the left), then the current node is
// their lowest common ancestor.
//
// However, if p and q are in the same subtree, then we can't make any determination about their LCA, so we have to
// continue the search down that subtree.
//
// COMPLEXITY:
//
// The recursive calls visit every node once, so the time complexity is O(n) in number of nodes.  We don't use extra
// space but the call stack uses O(h) space where h is the height of the tree.
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  // We couldn't find p or q in either of the subtrees.
  if (root === null) {
    return null;
  }

  // We a found in one of the left or right subtrees, so return it.
  if (root === p || root === q) {
    return root;
  }

  // Check for p and q in the left and right subtrees.
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // We found BOTH nodes in DIFFERENT subtrees, so the current node is the LCA.
  if (left !== null && right !== null) {
    return root;
  }

  // We found BOTH nodes in the LEFT subtree, so some node in the left subtree is the LCA.
  if (left !== null) {
    return left;
  }

  // We found BOTH nodes in the RIGHT subtree, so some node in the right subtree is the LCA.
  return right;
}
