# DIFFICULTY: HARD
# ----------------
#
# Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every
# character in t (including duplicates) is included in the window. If there is no such substring, return the empty
# string "".
#
# The testcases will be generated such that the answer is unique.
#
# See https://leetcode.com/problems/minimum-window-substring
from collections import defaultdict
import math


class Solution:
    def minWindow(self, s: str, t: str) -> str:
        """
        SOLUTION
        --------

        This can be solved using the sliding window technique with a bunch of extra bookkeeping.  The right pointer will
        be expanded until we have a valid window, then the left pointer will be shrunk to the minimum size window that
        still satisfies the requirements.

        COMPLEXITY
        ----------

        Time complexity is O(m + n) where m and n are the lengths of the source and target strings.

        Space complexity is O(m + n) because we store character frequency of the source and target strings.
        """
        # It is not possible to return a minimum window here; the target substring MUST be shorter than the source
        # string.
        if len(t) > len(s):
            return ""

        # First we need to create a frequency map, so we can easily check if a substring has all the characters in t.
        # This is required because the characters in t can be duplicated, and we require the same number of duplicates
        # in the source substring.
        want: dict[str, int] = defaultdict(int)
        for c in t:
            want[c] += 1

        # Define a map to keep track of the characters we have seen so far in the window.  This will let us know when we
        # have a valid window.
        #
        # We also keep track of which characters we've 'gotten' so far.  That is, if we have a requirement to contain X
        # number of 'a' characters, and we have seen X characters, then we have 'gotten' that character.  When we have
        # 'gotten' all characters in the string, we have a valid window.
        got: dict[str, int] = defaultdict(int)
        gotten = 0

        # Keep track of our minimum window substring.  The left pointer should point to the start, and the size will
        # tell us the length of the window, allowing us to call slice the string later.
        #
        # If we run through the algorithm and don't get a valid window, because min_size never got updated, then we
        # return ''.
        min_left = 0
        min_size = math.inf

        # Define both pointers to start at the source string, and start by expanding the right pointer.  Once a valid
        # window is discovered, we contract the left pointer.
        left = 0
        right = 0

        # Begin by expanding the right pointer until we have a valid window.
        while right < len(s):
            # Update the frequency of the character that we have got.
            c = s[right]
            got[c] += 1

            # If it turns out that we got exactly the frequency of character c that we wanted, then the requirement to
            # contain X number of character c has been satisfied.
            if c in want and got[c] == want[c]:
                gotten += 1

            # If we've gotten all the characters at exactly the right frequency, then we have a valid window.  In that
            # case, we can begin shrinking the window to see if it stays valid.
            while gotten == len(want):
                k = s[left]

                # Calculate the size of the window.  Note that left and right are INCLUSIVE indexes, so if we want the
                # window size of say [0, 1, 2, 3] with left = 0 and right = 3 (a window size of 4), we should do
                # 3 - 0 + 1 = 4.
                #
                # So make sure to add 1 here to get the correct size.
                size = right - left + 1
                if size < min_size:
                    min_size = size
                    min_left = left

                # Now try to contract the window by moving the left pointer.  When we do this, we have to update the
                # frequency of characters we've gotten so far, and update the gotten count.
                #
                # Update the frequency of the character that we are about to lose.  Then if we have got fewer characters
                # than wanted, we decrement the 'gotten' count because we no longer have a valid window.
                got[k] -= 1
                if k in want and got[k] < want[k]:
                    gotten -= 1

                # Move the left pointer to the right.
                left += 1

            # Keep expanding the right window until we have a valid window.
            right += 1

        # This means we didn't find any valid window.
        if min_size == math.inf:
            return ""

        i = min_left
        j = min_left + min_size
        return s[i:j]
