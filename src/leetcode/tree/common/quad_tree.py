# This class definition comes from the problem itself and we cannot change it, or else our submission will not be
# accepted.
class Node:
    def __init__(
        self,
        val: bool = False,
        isLeaf: bool = False,
        topLeft: "Node | None" = None,
        topRight: "Node | None" = None,
        bottomLeft: "Node | None" = None,
        bottomRight: "Node | None" = None,
    ) -> None:
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight
