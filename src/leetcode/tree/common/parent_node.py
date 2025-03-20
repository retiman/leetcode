from collections import deque


# This class definition comes from the problem itself and we cannot change it, or else our submission will not be
# accepted.
class Node:
    def __init__(self, val=0):
        self.val = val
        self.left: "Node | None" = None
        self.right: "Node | None" = None
        self.parent: "Node | None" = None


def array2tree(array: list[int | None]) -> Node | None:
    if not array or array[0] is None:
        return None

    root = Node(array[0])
    queue = deque([root])
    i = 1

    while queue and i < len(array):
        node = queue.popleft()

        if node is None:
            continue

        if i < len(array):
            val = array[i]
            if val is not None:
                node.left = Node(val)
                node.left.parent = node
                queue.append(node.left)
            i += 1

        if i < len(array):
            val = array[i]
            if val is not None:
                node.right = Node(val)
                node.right.parent = node
                queue.append(node.right)
            i += 1

    return root
