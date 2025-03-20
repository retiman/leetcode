# DIFFICULTY: MEDIUM
# ------------------
#
# Given a string s of '(' , ')' and lowercase English characters.
#
# Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting
# parentheses string is valid and return any valid string.
#
# Formally, a parentheses string is valid if and only if:
#
# - It is the empty string, contains only lowercase characters, or
# - It can be written as AB (A concatenated with B), where A and B are valid strings, or
# - It can be written as (A), where A is a valid string.
#
# See https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses
class Solution:
    def minRemoveToMakeValid(self, s: str) -> str:
        """
        SOLUTION
        --------

        Imagine if we were just asked to validate the parentheses.  This can be done with a stack pretty easily.  In
        this problem, we can push open parens onto the stack, then pop off close parens when we encounter them.  If we
        ever encounter a close parens while the stack is empty, OR if we have remaining open parens on the stack, then
        we know the parentheses are invalid.

        Here, though, we are asked to remove invalid parentheses.  This means that instead of failing immediately, every
        time we encounter a close without an open we need to mark it for removal.  In addition, any open parens left on
        the stack at the end should also be marked for removal.

        Once we have indices that are marked for removal, we'll go through the string again, and copy it to a new
        string, but avoid any indices that are marked for removal.

        COMPLEXITY
        ----------

        Time complexity is O(n) for each pass through the string.  Two passes means O(n) overall.

        Space complexity is O(n) because we are using the stack (which is size of the string) and the removable set,
        which is also size of the string.
        """
        # For the validate parens problem, we'll have a stack of '(' strings.  However, notice that in that case we
        # never push any ')' onto the stack; as soon as ')' we pop the item off the stack or we fail.  That is, in the
        # validation # problem, we only ever have '(' characters on the stack.
        #
        # Therefore we can reclaim that space by pushing the index of the '(' character onto the stack.  It is not
        # necessary to declare both:
        #
        # stack: list[str] = []
        # opens: set[int] = set()
        #
        # One array data structure is enough to handle both.  Note that having a set would cause problems because we'd
        # at some point need to pop the last open paren off the stack, and we'd have to search the set for it (or
        # convert the set into an array).
        opens: list[int] = []

        # Remove these indices at the end; these are unmatched close parens.
        closes: set[int] = set()

        # Find indices to remove.
        for i, c in enumerate(s):
            # If we encounter open paren, just push it onto the stack.
            if c == "(":
                opens.append(i)

            # If we encounter a non-close paren, just skip it.  It's not relevant for the removal process.
            if c != ")":
                continue

            # If we have a matched close paren, pop the associated open from the stack and just continue.
            if opens:
                opens.pop()
                continue

            # Uh oh!  At this point, we have an unmatched close paren, so mark this index for removal.
            closes.add(i)

        # It's possible we are left with some unmatched open parens, so mark them for removal as well.
        for open in opens:
            closes.add(open)

        # Copy the string, skipping any indices that are marked for removal.
        result = ""
        for i, c in enumerate(s):
            if i in closes:
                continue
            result += c

        return result
