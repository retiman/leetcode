# DIFFICULTY: MEDIUM
# ------------------
#
# Given a string s, find the length of the longest substring without repeating characters.
#
# See https://leetcode.com/problems/longest-substring-without-repeating-characters
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        """
        SOLUTION
        --------

        This can be solved using the sliding window technique by maintaining, always, a window where we have a substring
        without repeating characters.

        To ensure we can check this constraint, we'll keep track of the last time we have seen a character, so we can
        move the left pointer to the right of the left seen index and maintain our no-repeat constraint.

        Once we move the left pointer just one step to the right of the last seen index, we'll update that seen index
        to the rightmost position we've seen it, so we can leverage the map again next time.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of characters in the string.

        Space complexity is O(1) because the number of characters in the alphabet is fixed.
        """
        # Keep a map of last seen character -> index.
        seen: dict[str, int] = {}

        # The length of the longest substring without repeating characters.
        max_length = 0

        # Use a sliding window approach by moving the right pointer along the string's characters, and updating the left
        # pointer any time we see a repeated character.
        left = 0
        right = 0
        while right < len(s):
            c = s[right]

            # If we've already seen this character, update the left pointer and move it just right of the last seen
            # occurrence to ensure no repeated characters.
            if c in seen:
                last = seen[c]
                left = max(left, last + 1)

            # Update our asumption about the current max.
            max_length = max(max_length, right - left + 1)

            # Set the current character to be seen and advance the right pointer.
            seen[c] = right
            right += 1

        return max_length
