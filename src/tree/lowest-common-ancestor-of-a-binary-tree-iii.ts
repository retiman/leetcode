// DIFFICULTY: MEDIUM
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
// However, that solution involves the use of a set.  We can optimize this by using the two pointer technique in a
// clever way.  Let's consider paths from p and q to the LCA.
//
// If path[p] === path[q], then all we have to do is advance both pointers one step at a time and they will converge at
// the LCA eventually.
//
// If path[p] !== path[q], then one of the pointers will reach past the root and become null first.
//
// The goal, then is to make BOTH pointers reach the LCA at the same time.  So let's say path[p].length === 5, and that
// path[q].length === 10.  If we could craft an extended path for both p and q so that they both travel the same
// distance, and end up at the LCA, then that would work.
//
// To create this extended path, envision an extended path2[p] that goes from p to the root then to q then to the root
// (yes, imagine there's a direct path from root -> q).  Likewise, envision an extended path2[q] that goes from q to the
// root then from p to the root.
//
// Now if you make both the p and q pointers follow this path, they will both advance PAST the root, but then eventually
// converge at the LCA before they hit the root again.
//
// COMPLEXITY:
//
// For the solution involving a set, the time complexity is O(h + h) where h is the depth of the deeper node.  The
// space complexity is O(h) to store the ancestors.
//
// For the solution not involving a set, the time complexity is O(h + h) where h is the depth of the deeper node.
function lowestCommonAncestor(p: _Node | null, q: _Node | null): _Node | null {
  // Create new pointers to advance; we need the original starting points p and q.
  let [a, b] = [p, q];

  // Eventually a and b will converge at the LCA.
  while (a !== b) {
    // Advance a = p -> root -> q -> root.  Pointers converge before hitting the root again.
    a = a !== null ? a.parent : q;

    // Advance b = q -> root -> p -> root.  Pointers converge before hitting the root again.
    b = b !== null ? b.parent : p;
  }

  // Return either pointer; they are both at the LCA.
  return a;
}
