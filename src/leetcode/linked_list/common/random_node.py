# This class definition comes from the problem itself and we cannot change it, or else our submission will not be
# accepted.
class Node:
    def __init__(self, x: int, next: "Node | None" = None, random: "Node | None" = None):
        self.val = int(x)
        self.next = next
        self.random = random
