# DIFFICULTY: MEDIUM
# ------------------
#
# You are given a string s and an integer k, a k duplicate removal consists of choosing k adjacent and equal letters
# from s and removing them, causing the left and the right side of the deleted substring to concatenate together.
#
# We repeatedly make k duplicate removals on s until we no longer can.
#
# Return the final string after all such duplicate removals have been made. It is guaranteed that the answer is unique.
#
# See https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii
class Solution:
    def removeDuplicates(self, s: str, k: int) -> str:
        """
        SOLUTION
        --------

        In contrast with remove duplicates i, we need to keep track of not just the top element of the stack, but rather
        if the top k elements constitute dupes.  Once we remove k elements, it's possible the new stack now has k more
        elements to remove.

        To account for this, we cannot simply count elements and remove when we see k, resetting out counter to 1.
        Instead we will have to store, at each stack frame, the elements *and* what the counter was.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the length of s.

        Space complexity is O(n).
        """
        stack: list[tuple[str, int]] = []
        freq = 1

        for c in s:
            # If the top of the stack and the current character match, increase our count.  If they don't match, reset
            # our freq so that it is 1 (since we always at least see 1 match; the character itself).
            if stack and c == stack[-1][0]:
                freq += 1
            else:
                freq = 1

            stack.append((c, freq))

            # Only if we've seen k dupes, pop them all.  Here, we cannot reset our counter back to 1; we have to
            # reset the counter back to what it was when we first pushed the top element onto the stack.
            if freq == k:
                for _ in range(k):
                    stack.pop()

                # Reset our count.  If we have no more stack elements, we can reset to 1.  However, if we have stack
                # elements, we have to reset to what it was previously.
                if not stack:
                    freq = 1
                else:
                    freq = stack[-1][1]

        return "".join([c for c, _ in stack])
