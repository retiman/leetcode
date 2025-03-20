# This class definition comes from the problem itself and we cannot change it, or else our submission will not be
# accepted.
class NestedInteger:
    def __init__(self, value=None) -> None:
        self.value: int | None = value
        self.values: "list[NestedInteger]" = []

    def isInteger(self) -> bool:
        return self.value is not None

    def add(self, e: "NestedInteger") -> None:
        self.value = None
        self.values.append(e)

    def setInteger(self, value: int):
        self.value = value

    def getInteger(self) -> int | None:
        return self.value

    def getList(self) -> "list[NestedInteger]":
        return self.values
