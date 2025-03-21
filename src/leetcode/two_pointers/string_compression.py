# DIFFICULTY: MEDIUM
# ------------------
#
# Given an array of characters chars, compress it using the following algorithm:
#
# Begin with an empty string s. For each group of consecutive repeating characters in chars:
#
# - If the group's length is 1, append the character to s.
# - Otherwise, append the character followed by the group's length.
#
# The compressed string s should not be returned separately, but instead, be stored in the input character array chars.
# Note that group lengths that are 10 or longer will be split into multiple characters in chars.
#
# After you are done modifying the input array, return the new length of the array.
#
# You must write an algorithm that uses only constant extra space.
#
# See https://leetcode.com/problems/string-compression
class Solution:
    def compress(self, cs: list[str]) -> int:
        """
        SOLUTION
        --------

        Because we cannot use extra space, we will need to read and write to the array at the same time.  We can use the
        two pointer approach for doing so.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of characters in the array.

        Space complexity is O(1).
        """
        read = 0
        write = 0

        while read < len(cs):
            # Keep track of the current character and the number of times it has appeared.
            c = cs[read]
            n = 0

            # Consume the characters until we reach a point where the character differs.
            while read < len(cs) and cs[read] == c:
                read += 1
                n += 1

            # Write the current character and the number of times it appears.  We'll always have enough room because
            # we'll only need to write more than one digit if we have 10 or more characters.
            cs[write] = c
            write += 1

            # Only write digits if the count > 1; otherwise just leave the character as is.
            if n > 1:
                for digit in str(n):
                    cs[write] = digit
                    write += 1

        return write
