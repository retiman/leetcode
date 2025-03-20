# DIFFICULTY: HARD
# ----------------
#
# Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result
# of the evaluation.
#
# Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as
# eval().
#
# See https://leetcode.com/problems/basic-calculator
class Solution:
    def calculate(self, s: str) -> int:
        """
        SOLUTION
        --------

        This is way harder than basic calculator ii, even though we don't consider multiplication and division.  Here,
        we have to consider parentheses.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the length of the string.

        Space complexity is O(n) because we are storing the numbers in a stack.
        """
        stack: list[int] = []

        # The sign of the current number.
        sign = 1

        # The current number.
        number = 0

        # The current sub expression value.
        expr = 0

        for c in s:
            if c.isdigit():
                number = number * 10 + int(c)
            elif c == "+":
                # Whatever the current number is, add it to the current expression.  The sign will account for
                # subtractions.
                expr += sign * number

                # Now we reset the sign to be POSITIVE and number to be 0.
                sign = 1
                number = 0
            elif c == "-":
                # Whatever the current number is, add it to the current expression.  The sign will account for
                # subtractions.
                expr += sign * number

                # Now we reset the sign to be NEGATIVE and number to be 0.
                sign = -1
                number = 0
            elif c == "(":
                # Opening brace means we are evaluating an expression.  Whatever the current expression and sign are,
                # push it onto the stack.
                stack.append(expr)
                stack.append(sign)

                # Now we reset the entire calculator (result, sign, current number) to evaluate the expression.
                expr = 0
                sign = 1
                number = 0
            elif c == ")":
                # Closing brace means we are finished evaluating an expression.  Resolve the current operation and
                # add it to the current expression result.
                expr += sign * number

                # Pop off the sign.  If we had a NEGATIVE sign when opening the brace, the entire expression needs to be
                # negated.  That is, '-(1+2)' would require us to do result *= -1.
                expr *= stack.pop()

                # Pop off the original result and add it to the expression.
                expr += stack.pop()

                # Now reset the calculator.
                sign = 1
                number = 0

        return expr + sign * number
