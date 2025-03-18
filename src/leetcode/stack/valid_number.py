# DIFFICULTY: HARD
# ----------------
#
# A valid number can be split up into these components (in order):
# - A decimal number or an integer.
# - (Optional) An 'e' or 'E', followed by an integer.

# A decimal number can be split up into these components (in order):
# - (Optional) A sign character (either '+' or '-').
#
# One of the following formats:
# - One or more digits, followed by a dot '.'.
# - One or more digits, followed by a dot '.', followed by one or more digits.
# - A dot '.', followed by one or more digits.
#
# An integer can be split up into these components (in order):
# - (Optional) A sign character (either '+' or '-').
# - One or more digits.
#
# For example, all the following are valid numbers:
# ["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"]
#
# While the following are not valid numbers:
# ["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"].
#
# Given a string s, return true if s is a valid number.
#
# See https://leetcode.com/problems/valid-number
class Solution:
    def isNumber(self, s: str) -> bool:
        """
        SOLUTION
        --------

        I don't know that this is a particularly hard problem, but it is a bit tricky to get all the edge cases right.
        It doesn't seem like a particularly fair problem to ask in a 45m interview though.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the length of the input string.

        Space complexity is O(1).
        """
        digits = False
        decimal = False
        exponent = False

        for i, c in enumerate(s.lower()):
            # Get the previous character, if it exists.
            p = "" if i == 0 else s[i - 1]

            match c:
                case "+" | "-":
                    # After seeing the E symbol, signs are only valid immediately after the E symbol.
                    if exponent and p != "e":
                        return False

                    # However, signs are not valid if they are the last symbol.
                    if exponent and i == len(s) - 1:
                        return False

                    # Before seeing the E symbol, signs are not valid if they aren't in the first position.
                    if i != 0:
                        return False

                    # Signs are invalid after we have encountered a decimal.
                    if decimal:
                        return False

                    # Signs are invalid if they are the last symbol, and no digits have been seen.  For example, "9." is
                    # valid, but "." by itself is not.
                    if i == len(s) - 1 and not digits:
                        return False
                case "e" | "E":
                    # If the E symbol is encountered again after already seeing one, the number is automatically
                    # invalid.
                    if exponent:
                        return False

                    # The E symbol may not appear as the first symbol or the last symbol.
                    if i == 0 or i == len(s) - 1:
                        return False

                    # The E symbol may not appear just after the sign symbol.  For example, 46+e3 is invalid.
                    if p == "+" or p == "-":
                        return False

                    # The E symbol may not appear after a decimal symbol, if no digits have been seen.  For example,
                    # 9.e3 is valid, but .e3 is not valid.
                    if p == "." and not digits:
                        return False

                    exponent = True
                case ".":
                    # The decimal symbol may not appear after the E symbol has appeared.
                    if exponent:
                        return False

                    # The decimal symbol may not appear after the decimal symbol has appeared.
                    if decimal:
                        return False

                    # The decimal symbol cannot be the last symbol, unless digits have already been seen.
                    if i == len(s) - 1 and not digits:
                        return False

                    decimal = True
                case _:
                    # Any other character that is not a digit does not constitute a number.
                    if not c.isdigit():
                        return False

                    digits = True

        return True
