# DIFFICULTY: EASY
# ----------------
#
# Write a function to find the longest common prefix string amongst an array of strings.
#
# If there is no common prefix, return an empty string "".
#
# See https://leetcode.com/problems/longest-common-prefix
class Solution:
    def longestCommonPrefix(self, all: list[str]) -> str:
        """
        SOLUTION
        --------

        Note that the longest prefix can only be, at most, the length of the shortest string.  We can start with the
        first string as a guess for the longest prefix, then tighten the bounds of that guess as we look the other
        strings.

        COMPLEXITY
        ----------

        Time complexity is O(n * m) where n is the number of strings and m is the length of the shortest string.

        Space complexity is O(1).
        """
        if not all:
            return ""

        # The longest prefix can be at most the length of the shortest string.  Therefore, we can set our best guess of
        # the longest prefix to the first string.  From there, we can tighten the bounds of the prefix and come up with
        # an even shorter string as a result.
        longest = all[0]
        for i in range(1, len(all)):
            current = all[i]

            # Compare the current string, character by character, against the longest prefix we've found so far.  The
            # length of matching characters will be used to update our assumption about the longest prefix afterwards.
            j = 0
            while (
                # If the characters at the current position DO match, but we exceeded the length of either the current
                # string or the longest prefix, we have to stop.  There are no more characters to compare against each
                # other.
                j < min(len(current), len(longest))
                and
                # If the characters at the current position DO NOT match, stop.  The longest prefix will become where we
                # have stopped.
                longest[j] == current[j]
            ):
                j += 1

            # The length j represents how many characters match between the current prefix and the longest string, so
            # update that value.
            longest = current[:j]

        return longest
