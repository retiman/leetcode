# DIFFICULTY: MEDIUM
# ------------------
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
# For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is
# simply X + II. The number 27 is written as XXVII, which is XX + V + II.
#
# Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII.
# Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same
# principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:
#
# I can be placed before V (5) and X (10) to make 4 and 9.
# X can be placed before L (50) and C (100) to make 40 and 90.
# C can be placed before D (500) and M (1000) to make 400 and 900.
# Given an integer, convert it to a roman numeral.
#
# See https://leetcode.com/problems/integer-to-roman
class Solution:
    def intToRoman(self, n: int) -> str:
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

        def convert(digit: int, ones: str, fives: str, tens: str) -> str:
            match digit:
                case 1 | 2 | 3:
                    return ones * digit
                case 4:
                    return ones + fives
                case 5:
                    return fives
                case 6 | 7 | 8:
                    times = digit - 5
                    return fives + (ones * times)
                case 9:
                    return ones + tens
                case 0:
                    return ""
                case _:
                    raise ValueError("not a digit")

        cs = str(n)

        # If we have a number like 1, we don't know how many digits remain.  We could run two pointers through the
        # array, converting the least significant digits first, or we could just pad the number so that the hundreds and
        # thousands logic will skip over the few digits with zeroes.  Choosing the latter here.
        if len(cs) < 4:
            times = 4 - len(cs)
            cs = ("0" * times) + cs

        result: list[str] = []
        for i, c in enumerate(cs):
            digit = int(c)

            if i == 0:
                # We can't have any numbers over 3999, so we don't need to specify any numerals for fives or tens.
                roman = convert(digit, "M", "", "")
                result.append(roman)
                continue

            if i == 1:
                roman = convert(digit, "C", "D", "M")
                result.append(roman)
                continue

            if i == 2:
                roman = convert(digit, "X", "L", "C")
                result.append(roman)
                continue

            if i == 3:
                roman = convert(digit, "I", "V", "X")
                result.append(roman)
                continue

            raise ValueError("too many digits")

        return "".join(result)
