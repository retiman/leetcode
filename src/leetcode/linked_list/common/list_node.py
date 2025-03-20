# This class definition comes from the problem itself and we cannot change it, or else our submission will not be
# accepted.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def list2array(node: ListNode | None) -> list[int]:
    if not node:
        return []

    xs: list[int] = []
    current = node
    while current:
        xs.append(current.val)
        current = current.next

    return xs


def array2list(xs: list[int]) -> ListNode | None:
    if not xs:
        return None

    root: ListNode | None = None
    current: ListNode | None = None
    for x in xs:
        if not current:
            current = ListNode(x)
            root = current
            continue
        else:
            current.next = ListNode(x)
            current = current.next

    return root
