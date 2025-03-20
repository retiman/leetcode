from leetcode.tree.common.parent_node import array2tree
from leetcode.tree.lowest_common_ancestor_of_a_binary_tree_iii import Solution


soln = Solution()


def test_case_1():
    tree = array2tree([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4])
    assert tree
    assert tree.left
    assert tree.right

    lca = soln.lowestCommonAncestor(tree.left, tree.right)
    assert lca

    assert lca.val == 3
