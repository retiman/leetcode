# DIFFICULTY: MEDIUM
# ------------------
#
# Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
#
# See https://leetcode.com/problems/generate-parentheses
class Solution:
    def generateParenthesis(self, n: int) -> list[int]:
        """
        SOLUTION
        --------

        A naive way to do this would be to do something like generate all the parentheses for n-1, then add more
        parentheses to each of the elements generated.  For example, by transforming each element of the n-1 solution to
        `${e}()`, `()${e}`, and `($e)`.

        This doesn't work for values like n=4, because you will miss solutions like `(())(())`.  Instead, we'll
        construct the string as we go along, keeping track of how many open and close parentheses we have used.  In
        total, the resulting strings will each have length n*2.

        This is because well formed strings have additional constraints; when generating a power set using the naive
        method, for example, you don't need to worry about balancing the elements within the sub set.  In contrast to
        generating a power set, you would have far fewer resulting elements.

        COMPLEXITY
        ----------

        Time complexity is uh... we'll just go with O(4^n) since we can generate all possible 2 * n length strings using
        characters '(' and ')'.  With 2 characters, it's 2^(2 * n) = 4^n.

        Space complexity is O(4^n).
        """
        if n == 0:
            return []

        result = []

        def generate(text, opens: int, closes: int):
            # The max length of the string is n * 2 because each open paren requires a close paren.  We can't get fewer
            # than n * 2 characters in a string either, because we have to generate all possible combinations.
            if len(text) == n * 2:
                result.append(text)
                return

            if opens < n:
                generate(text + "(", opens + 1, closes)

            if closes < opens:
                generate(text + ")", opens, closes + 1)

        generate("", 0, 0)
        return result
