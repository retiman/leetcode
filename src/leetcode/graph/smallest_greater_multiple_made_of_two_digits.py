# DIFFICULTY: MEDIUM
# ------------------
#
# Given three integers, k, digit1, and digit2, you want to find the smallest integer that is:
#
# - Larger than k,
# - A multiple of k, and
# - Comprised of only the digits digit1 and/or digit2.
#
# Return the smallest such integer. If no such integer exists or the integer exceeds the limit of a signed 32-bit
# integer (2^31 - 1), return -1.
#
# See https://leetcode.com/problems/smallest-greater-multiple-made-of-two-digits
from collections import deque


class Solution:
    def findInteger(self, k: int, digit1: int, digit2: int) -> int:
        """
        SOLUTION
        --------

        In order to find our target number, we start with the first digit and generate all possible 2 digit numbers.
        Then from there we generate all possible 3 digit numbers, and so on.  We also go back to checking the second
        digit, generating 2 digit, 3 digit, etc numbers.

        This can be done via a graph search algorithm.  However, since we want to find the smallest such number, we
        should use BFS instead of DFS.

        COMPLEXITY
        ----------
        """
        queue: deque[str] = deque()
        seen: set[str] = set()

        # We always want to start generating numbers from the smaller digit first, so let's rearrange them so that the
        # smaller digit is digit1.
        (d1, d2) = (digit1, digit2) if digit1 < digit2 else (digit2, digit1)

        # Convert the digits to strings; this will be useful in building our number later.
        s1 = str(d1)
        s2 = str(d2)

        # For the first digits, do not push a 0, because generating a number starting at 0 is the same as generating a
        # number using the rest of the digits.
        if d1 != 0:
            queue.append(s1)
            seen.add(s1)

        if d2 != 0 and d1 != d2:
            queue.append(s2)
            seen.add(s2)

        max_value = 2**31 - 1
        while queue:
            s = queue.popleft()

            # From the problem description, this is the max integer we should consider.
            value = int(s)
            if value > max_value:
                continue

            # Check if this number is both larger than k and a multiple of k; if so we have reached our target.
            if value > k and value % k == 0:
                return value

            # Otherwise, use the digits to construct our frontier nodes.  We know that by adding in this order, the
            # smaller number gets added first (since digit1 < digit2).
            next1 = s + s1
            next2 = s + s2
            if next1 not in seen:
                queue.append(next1)
                seen.add(next1)
            if next2 not in seen:
                queue.append(next2)
                seen.add(next2)

        return -1
