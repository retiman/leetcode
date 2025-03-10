// DIFFICULTY: MEDIUM
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
// The idea is to recursively check the left and right subtrees for nodes p and q.  There are three cases:
//
// 1. We find p and q in DIFFERENT subtrees.
// 2. We find p and q BOTH in the left subtree.
// 3. We find p and q BOTH in the right subtree.
//
// Well, in case 1, if we began this process from the root, that's it!  The current node has to be the LCA.  If instead
// we discover that p and q are BOTH in the left or right subtree, make that subtree the new root and continue the
// search.
//
// Note that this solution requires that both p and q exist in the tree.  If one of them doesn't exist we could return
// a false LCA.  To guard against this we'd have to check the tree beforehand to ensure that both p and q exist.
//
// COMPLEXITY:
//
// The recursive calls visit every node once, so the time complexity is O(n) in number of nodes.  We don't use extra
// space but the call stack uses O(h) space where h is the height of the tree.
function lowestCommonAncestor(node: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  // Recursively find p or q in the tree rooted at node.
  function findNode(node: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    // We DID NOT find p or q in either of the subtrees.
    if (node === null) {
      return null;
    }

    // We DID find p or q in either of the subtrees, so return it.
    if (node === p || node === q) {
      return node;
    }

    // Otherwise, continue by checking for p and q in the left and right subtrees.
    //
    // If left is non-null, then we found one of p or q in the left subtree.
    // If right is non-null, then we found one of p or q in the right subtree.
    // If both were non-null, then we found p and q in different subtrees.
    const left = findNode(node.left, p, q);
    const right = findNode(node.right, p, q);

    // If BOTH left and right are non-null, then we found p and q in different subtrees.  If that is the case, the
    // current node must be the LCA.
    if (left !== null && right !== null) {
      return node;
    }

    // We found ONE of nodes p or q in the LEFT subtree.  However, we didn't find the other node in the right subtree
    // so we assume that they were both in the left subtree.  Note that we ASSUME that both p and q exist in the tree,
    // or else we could return a false LCA.
    if (left !== null) {
      return left;
    }

    // We found ONE of nodes p or q in the RIGHT subtree.  However, we didn't find the other node in the left subtree
    // so we assume that they were both in the right subtree.  Note that we ASSUME that both p and q exist in the tree,
    // or else we could return a false LCA.
    return right;
  }

  // Technically, lowestCommonAncestor has the same signature as findNode, so we could've just implemented the LCA
  // logic directly.
  //
  // However, lowestCommonAncestor will return to you the LCA always.  In findNode, sometimes the intermediate result
  // is not the LCA (e.g. when we are just looking for the node).
  return findNode(node, p, q);
}
