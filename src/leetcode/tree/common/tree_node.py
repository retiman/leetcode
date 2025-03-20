from collections import deque


# This class definition comes from the problem itself and we cannot change it, or else our submission will not be
# accepted.
class TreeNode:
    def __init__(self, val=0, left: "TreeNode | None" = None, right: "TreeNode | None" = None):
        self.val = val
        self.left = left
        self.right = right


def array2tree(array: list[int | None]) -> TreeNode | None:
    if not array:
        return None

    if not array[0]:
        return None

    root = TreeNode(array[0])
    queue = deque([root])
    i = 1

    while queue and i < len(array):
        node = queue.popleft()

        if not node:
            continue

        if i < len(array):
            val = array[i]
            if val is not None:
                node.left = TreeNode(val)
                queue.append(node.left)
            i += 1

        if i < len(array):
            val = array[i]
            if val is not None:
                node.right = TreeNode(val)
                queue.append(node.right)
            i += 1

    return root
