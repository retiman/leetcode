# DIFFICULTY: HARD
# ----------------
#
# Design a data structure that simulates an in-memory file system.
#
# Implement the FileSystem class:
#
# - FileSystem()
#   Initializes the object of the system.
# - List<String> ls(String path)
#   If path is a file path, returns a list that only contains this file's name.
#   If path is a directory path, returns the list of file and directory names in this directory.
#   The answer should in lexicographic order.
# - void mkdir(String path)
#   Makes a new directory according to the given path. The given directory path does not exist.
#   If the middle directories in the path do not exist, you should create them as well.
# - void addContentToFile(String filePath, String content)
#   If filePath does not exist, creates that file containing given content.
#   If filePath already exists, appends the given content to original content.
# - String readContentFromFile(String filePath)
#   Returns the content in the file at filePath.
#
# See https://leetcode.com/problems/design-in-memory-file-system
class FileNode:
    def __init__(self):
        self.is_file = False
        self.content = ""
        self.children: "dict[str, FileNode]" = {}


class FileSystem:
    def __init__(self):
        """
        SOLUTION
        --------

        The problem states that we can assume all inputs are valid, so we don't need to check if we try to mkdir on path
        parts that contain files, or otherwise list children of files.  We can also assume that all listed directories
        and files exist.

        COMPLEXITY
        ----------

        Time complexity is O(n) for all operations.

        Space complexity is O(n) where n is the number of directories and files in the file system.
        """
        self.root = FileNode()

    def ls(self, path: str) -> list[str]:
        node = self.root

        normalized = self.__normalize(path)
        for part in normalized.split("/"):
            if part not in node.children:
                return []

            node = node.children[part]

            # Note that the ls function only wants to know the name of the file, not the absolute path, so don't bother
            # prefixing the parent path.
            if node.is_file:
                return [part]

        children = list(node.children.keys())
        children.sort()
        return children

    def mkdir(self, path: str) -> None:
        node = self.root

        normalized = self.__normalize(path)
        for part in normalized.split("/"):
            if part not in node.children:
                node.children[part] = FileNode()

            node = node.children[part]

    def addContentToFile(self, filePath: str, content: str) -> None:
        node = self.root

        normalized = self.__normalize(filePath)
        parts = normalized.split("/")
        for i, part in enumerate(parts):
            # The problem isn't exactly clear here, but the assumption is that we also mkdir the paths if they do not
            # exist.
            if part not in node.children:
                node.children[part] = FileNode()

            node = node.children[part]

            # The very last part is the filename, so append the content.
            if i == len(parts) - 1:
                node.content = node.content + content if node.content else content
                node.is_file = True

    def readContentFromFile(self, filePath: str) -> str:
        node = self.root

        normalized = self.__normalize(filePath)
        for part in normalized.split("/"):
            node = node.children[part]

        return node.content if node.content else ""

    def __normalize(self, path: str) -> str:
        return path[0:-1] if path[-1] == "/" else path
