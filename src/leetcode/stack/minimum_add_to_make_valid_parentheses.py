# DIFFICULTY: MEDIUM
# ------------------
#
# A parentheses string is valid if and only if:
#
# - It is the empty string,
# - It can be written as AB (A concatenated with B), where A and B are valid strings, or
# - It can be written as (A), where A is a valid string.
# - You are given a parentheses string s. In one move, you can insert a parenthesis at any position of the string.
#
# For example, if s = "()))", you can insert an opening parenthesis to be "(()))" or a closing parenthesis to be
# "())))".
#
# Return the minimum number of moves required to make s valid.
#
# See https://leetcode.com/problems/minimum-add-to-make-parentheses-valid
class Solution:
    def minAddToMakeValid(self, s: str) -> int:
        """
        SOLUTION
        --------

        One way to do this is to use a stack and push open braces onto it.  Then, when we encounter a closing brace, we
        can pop it off.  If we don't have closing braces left, then increment opensRequired.  At the end, count up the
        number of elements still left on the stack (the unmatched closing braces), and add that to the number of opening
        braces tallied up.

        However!  Notice that we don't even need a stack for this.  We just have to keep track of any open and close
        braces, which can be done with a simple counter for each variable.

        COMPLEXITY
        ----------

        Time complexity is O(n) because we are iterating through all elements in the string.

        Space complexity is O(1).
        """
        # Every time we see '(', increment this counter.  Every time we see ')', decrement this counter, making it
        # similar to our stack without using one.
        #
        # Likewise, at the end, if this variable isn't 0, then it's the same as the situation where the stack still has
        # elements in it, which indicates some number of unmatched closing braces.
        closes_required = 0

        # If we encounter a ')' and we don't have a matching '(' (aka the stack is empty), then we have to insert an
        # opening brace later.
        opens_required = 0

        for c in s:
            # If we encounter an opening brace, we'll need to require that we close it eventually.
            if c == "(":
                closes_required += 1
                continue
            # If we encounter a closing brace, there are two possibilities:
            #
            # 1. We already have an opening brace to match it, which means we can decrement the number of closing braces
            #    we .
            # 2. We don't have an opening brace to match it, which means we have to insert an opening brace later.
            elif c == ")":
                # This is case 1; we encountered '(' earlier, which caused us to increment closesRequired.  But we
                # encountered a closing brace, so we can decrement the number of closing braces we need to insert.
                if closes_required > 0:
                    closes_required -= 1
                # This is case 2; we don't have an opening brace to match it, so we have to remember to insert one.
                else:
                    opens_required += 1

        return closes_required + opens_required
