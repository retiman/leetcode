# DIFFICULTY: MEDIUM
# ------------------
#
# Implement a key-value store with the following functionality:
#
# - get(key: string)
# - set(key: string, value: number)
# - delete(key: string)
# - begin() starts a transaction
# - commit() commits a transaction
# - rollback() rolls back a transaction
#
# This structure supports nested transactions, and the topmost transaction should be able to see the values in the
# transactions below it.
#
# See https://leetcode.com/discuss/interview-question/279913/Bloomberg-or-Onsite-or-Key-Value-Store-with-transactions
class KeyValueStore:
    """
    SOLUTION
    --------

    Use a stack to store the transactions.  Each transaction is a dictionary that maps keys to values.

    COMPLEXITY
    ----------

    Time complexity is O(1) for all operations.

    Space complexity is O(n) where n is the number of keys in the data structure.
    """

    def __init__(self) -> None:
        self.deletions: list[set[str]] = []
        self.txs: list[dict[str, int]] = []
        self.main: dict[str, int] = {}

    def get(self, key: str) -> int | None:
        if not self.txs:
            return self.main.get(key, None)

        frame = len(self.txs) - 1
        while frame >= 0:
            if key in self.deletions[frame]:
                return None
            if key in self.txs[frame]:
                return self.txs[frame].get(key, None)
            frame -= 1

        return None

    def set(self, key: str, value: int) -> None:
        if not self.txs:
            self.main[key] = value
            return

        self.txs[-1][key] = value

    def delete(self, key: str) -> None:
        if not self.txs:
            self.main.pop(key, None)
            return

        self.txs[-1].pop(key, None)
        self.deletions[-1].add(key)

    def begin(self) -> None:
        self.txs.append({})
        self.deletions.append(set())

    def commit(self) -> None:
        if not self.txs:
            return

        target = self.main if len(self.txs) == 1 else self.txs[-2]
        source = self.txs[-1]

        for key, value in source.items():
            target[key] = value

        for key in self.deletions[-1]:
            target.pop(key, None)

        self.txs.pop()
        self.deletions.pop()

    def rollback(self) -> None:
        if not self.txs:
            return

        self.txs.pop()
        self.deletions.pop()
