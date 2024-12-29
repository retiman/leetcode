// DIFFICULTY: Medium
//
// Given two nodes of a binary tree p and q, return their lowest common ancestor (LCA).
//
// According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes p and q in a tree T is the
// lowest node that has both p and q as descendants (where we allow a node to be a descendant of itself)."
//
// See {@link https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii}
import { _Node } from './common/parent-node';
export { lowestCommonAncestor };

// SOLUTION:
//
// Note that this problem is quite simple since we are given parent nodes.  All we have to do is traverse up to the root
// for one node and collect ancestors.  Then we traverse up to the root for the other node and check if any parent is in
// the ancestor set.  If it is, then we have found the lowest common ancestor.
//
// This problem becomes much more difficult if we are not given parent nodes.  See the first version of this problem for
// a solution to that.
//
// COMPLEXITY:
//
// Runs in O(h + h) where h is the depth of the deeper node.  We need O(log(n)) space to store the nodes in the ancestor
// set.
function lowestCommonAncestor(p: _Node | null, q: _Node | null): _Node | null {
  const ancestors = new Set<_Node>();
  let node = p;
  while (node !== null) {
    ancestors.add(node);
    node = node.parent;
  }

  node = q;
  while (node !== null) {
    if (ancestors.has(node)) {
      return node;
    }

    node = node.parent;
  }

  return null;
}
