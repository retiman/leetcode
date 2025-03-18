# DIFFICULTY: MEDIUM
# ------------------
#
# Suppose we have a file system that stores both files and directories. An example of one system is represented in the
# following picture:
#
# Here, we have `dir` as the only directory in the root. `dir` contains two subdirectories, `subdir1` and `subdir2`.
# `subdir1` contains a file `file1.ext` and subdirectory `subsubdir1`. `subdir2` contains a subdirectory `subsubdir2`,
# which contains a file `file2.ext`.
#
# In text form, it looks like this (with ⟶ representing the tab character):
#
# dir
# ⟶ subdir1
# ⟶ ⟶ file1.ext
# ⟶ ⟶ subsubdir1
# ⟶ subdir2
# ⟶ ⟶ subsubdir2
# ⟶ ⟶ ⟶ file2.ext
#
# If we were to write this representation in code, it will look like this:
#
# - "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext".
#
# Note that the '\n' and '\t' are the new-line and tab characters.
#
# Every file and directory has a unique absolute path in the file system, which is the order of directories that must
# be opened to reach the file/directory itself, all concatenated by '/'s. Using the above example, the absolute path
# to file2.ext is "dir/subdir2/subsubdir2/file2.ext". Each directory name consists of letters, digits, and/or spaces.
# Each file name is of the form name.extension, where name and extension consist of letters, digits, and/or spaces.
#
# Given a string input representing the file system in the explained format, return the length of the longest absolute
# path to a file in the abstracted file system. If there is no file in the system, return 0.
#
# Note that the testcases are generated such that the file system is valid and no file or directory name has length 0.
#
# See https://leetcode.com/problems/longest-absolute-file-path
class Solution:
    def lengthLongestPath(self, input: str) -> int:
        """
        SOLUTION
        --------

        A solution can be efficient by using a stack to keep track of directory depth.  However, this only works if the
        input does not contain duplicate sub directories, and all of the files appear right after the subdirectory they
        are in.  If it turns out the input can vary such that files and subdirectories appear out of order, or the
        subdirectories can contain duplicates, we'll have to actually build out a real filesystem structure using a
        graph of FileNode (with strings mapping to subdirectory FileNodes).

        In this solution, we will assume that the input is constrained.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the length of the input string.

        Space complexity is O(n) because we are storing the file path in a stack.
        """
        # This is a stack that will keep track of where we are in the directory structure.  We'll assume that every
        # directory has a trailing slash (no leading slash).  We never calculate directory lengths, so that won't mess
        # up our calculation.
        stack: list[str] = []

        # The current and max file lengths.
        current_len = 0
        max_len = 0

        parts = input.split("\n")
        for part in parts:
            # If the string contents a "\t" character, that means that this part of the text is in a subdirectory.  We
            # can locate the subdirectory by popping directories off of the stack.
            #
            # We can figure out how many directories to pop by counting the number of tabs in the string.
            levels = part.count("\t")
            while len(stack) > levels:
                # Adjust the current length by subtracting the length of the directory name; note that the directory
                # name doesn't include a trailing slash but the length should account for it.
                current_len -= len(stack.pop()) + 1

            # To get the name of the file, we replace all the tabs with empty string.
            name = part.replace("\t", "")

            # All directories have no extension, and all files have an extension.  If we see a dot in the name, that
            # means its a file.
            if "." in name:
                max_len = max(max_len, current_len + len(name))
            else:
                # Otherwise, we are looking at a directory, and we should push it onto the stack.  The stack doesn't need to
                # store the directory with the trailing slash, but make sure to account for it in the current length
                # calculation.
                stack.append(name)
                current_len += len(name) + 1

        return max_len
