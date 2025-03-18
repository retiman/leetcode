# DIFFICULTY: MEDIUM
# ------------------
#
# You are given an absolute path for a Unix-style file system, which always begins with a slash '/'. Your task is to
# transform this absolute path into its simplified canonical path.
#
# The rules of a Unix-style file system are as follows:
#
# - A single period '.' represents the current directory.
# - A double period '..' represents the previous/parent directory.
# - Multiple consecutive slashes such as '//' and '///' are treated as a single slash '/'.
# - Any sequence of periods that does not match the rules above should be treated as a valid directory or file name.
#   For example, '...' and '....' are valid directory or file names.
#
# The simplified canonical path should follow these rules:
#
# - The path must start with a single slash '/'.
# - Directories within the path must be separated by exactly one slash '/'.
# - The path must not end with a slash '/', unless it is the root directory.
# - The path must not have any single or double periods ('.' and '..') used to denote current or parent directories.
#
# Return the simplified canonical path.
#
# See https://leetcode.com/problems/simplify-path
class Solution:
    def simplifyPath(self, path: str) -> str:
        """
        SOLUTION
        --------

        Just iterate through the path and use a stack to keep track of directories.  The only one we need to be careful
        with is the '..' name; this means we need to pop the last directory from the stack to "go up" one level.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the length of the input string.

        Space complexity is O(n) to store the string segments on the stack.
        """
        stack: list[str] = []
        names = path.split("/")

        for name in names:
            # Presumably these can just get ignored and thrown away.
            if name == "" or name == ".":
                continue

            # If we are going up a level, we need to pop the last directory from the stack.
            #
            # Wait, what happens if we are already at the root directory and we can't go up a directory anymore?  The
            # instructions are not clear, but we definitely do get inputs like '/../' and the result should be '/',
            # indicating that the desired behavior is to do nothing.
            if name == "..":
                if stack:
                    stack.pop()
                continue

            # Otherwise we should just push the directory onto the stack as normal.
            stack.append(name)

        return "/" + "/".join(stack)
