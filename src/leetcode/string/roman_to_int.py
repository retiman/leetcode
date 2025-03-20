# DIFFICULTY: EASY
# ----------------
#
# Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
#
# Symbol       Value
# I             1
# V             5
# X             10
# L             50
# C             100
# D             500
# M             1000
#
# For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is
# simply X + II. The number 27 is written as XXVII, which is XX + V + II.
#
# Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII.
# Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same
# principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:
#
# - I can be placed before V (5) and X (10) to make 4 and 9.
# - X can be placed before L (50) and C (100) to make 40 and 90.
# - C can be placed before D (500) and M (1000) to make 400 and 900.
#
# Given a roman numeral, convert it to an integer.
#
# See https://leetcode.com/problems/roman-to-integer
class Solution:
    def romanToInt(self, s: str) -> int:
        """
        SOLUTION
        --------

        A straightforward solution works.


        COMPLEXITY
        ----------

        Time complexity is O(n).  However, there is an upper limit of what roman numerals can represent, so you can also
        argue that the time complexity is O(1).

        Space complexity is O(1).

        """
        numerals: dict[str, int] = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}

        result = 0
        for i, c in enumerate(s):
            # Get the current roman numeral value.
            current_val = numerals[c]

            # Get the next roman numeral value, if it exists.
            next_val = None
            if i + 1 < len(s):
                next_numeral = s[i + 1]
                next_val = numerals[next_numeral]

            # In this case, we have a situation like IV (4) or IX (9), where the current number is less than the next
            # number.  That means we want to do a subtraction.
            if next_val and current_val < next_val:
                result -= current_val
            #  Other cases like VI (6) or XI (11), we just want to add.
            else:
                result += current_val

        return result
