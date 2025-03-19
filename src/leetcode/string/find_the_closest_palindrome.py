# DIFFICULTY: HARD
# ----------------
#
# Given a string n representing an integer, return the closest integer (not including itself), which is a palindrome.
# If there is a tie, return the smaller one.
#
# The closest is defined as the absolute difference minimized between two integers.
#
# Constraints: 1 <= len(str(n)) <= 18
#
# See https://leetcode.com/problems/find-the-closest-palindrome
from collections import defaultdict
import math


class Solution:
    def nearestPalindromic(self, text: str) -> str:
        """
        SOLUTION
        --------

        To devise a strategy, first consider a few examples:

        "123"  => "121"
        "1234" => "1221"
        "1000" => "1001"
        "1"    => "0"     <-- It's not "1" because we can't return the number itself.
        "999"  => "1001"  <-- It's not "888" because "1001" is "closer" to "999" by 2.
        "1221" => "1111"  <-- It's not "1221" because we can't return the number itself.

        Generally, we can either mirror the left side of the number (since that should result in the "closer" number)
        and use that, or we may have to do some incrementing/decrementing to get a part of the number we can mirror.  We
        also need to handle edge cases like "1" or "0".

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the length of the input string.

        Space complexity is O(n).
        """
        n = int(text)

        # If it's just a single digit, return that digit minus one (since we can't return the original digit).
        if len(text) == 1:
            return str(n - 1)

        # Split up the string so we have the left prefix (and middle) in case we need it.
        (left, mid) = self.__findPrefix(text)

        # Find possible candidates for the closest palindrome.
        candidates = self.__findCandidates(text, left, mid)

        # Find the actual closest.
        closest = self.__findClosest(candidates, n)

        return closest

    def __findPrefix(self, text: str) -> tuple[str, str]:
        # Find the left half of the number, which we may need to mirror.  If the number has an odd number of digits, we
        # don't take the midpoint because we won't want to mirror it anyways.
        k = len(text) // 2
        left = text[:k]
        mid = text[k] if len(text) % 2 == 1 else ""
        return (left, mid)

    def __findCandidates(self, text: str, left: str, mid: str) -> list[str]:
        # Generate candidate palindromes; if the original number is already a palindrome, this won't work and we'll have
        # to increment or decrement the left side to find the nearest palindrome.
        #
        # In some cases, we may also have to increment or decrement the middle digit.
        uniques: set[str] = set()
        for i in [-1, 0, 1]:
            prefix = str(int(left) + i)
            suffix = prefix[::-1]
            uniques.add(prefix + mid + suffix)

            # Skip middle digit variation if there is no middle digit.
            if not mid:
                continue

            # There are cases where the middle digit needs to be incremented or decremented as well.  For example, take
            # the following cases:
            #
            # "11911" => "11811"
            # "10001" => "11111"
            #
            # To handle these cases we'll vary the middle digit as well.  However, we need to be careful about the
            # middle digit going out of bounds, so we'll wrap around if it does.
            for j in [-1, 0, 1]:
                m = int(mid) + j
                if m == 10:
                    m = 0
                if m == -1:
                    m = 9
                uniques.add(prefix + str(m) + suffix)

        # These candidates will work for the vast majority of numbers, but sometimes we'll get edge cases where simply
        # incrementing or decrementing won't work.  For example:
        #
        # "101" => "99"
        # "99"  => "101"
        #
        # In these situations, just special case them by building special numbers like all 9's or 100...001.
        for length in [len(text) - 1, len(text), len(text) + 1]:
            xs = [9] * length

            # Add all 9s.
            value = "".join(map(str, xs))
            uniques.add(value)

            # Add 100..001.
            xs = [0] * length
            xs[0] = 1
            xs[-1] = 1
            value = "".join(map(str, xs))
            uniques.add(value)

        # Finally prune the candidate list of numbers that don't make sense.
        candidates: list[str] = []
        for candidate in uniques:
            if candidate.startswith("0"):
                continue

            if candidate == text:
                continue

            candidates.append(candidate)

        return candidates

    def __findClosest(self, candidates: list[str], n: int) -> str:
        # Find the closest elements to the original number.  Since we need to find the smallest to break a tie, just map
        # deltas to their candidates.
        deltas: dict[int, list[int]] = defaultdict(list)
        lowest = math.inf
        for candidate in candidates:
            c = int(candidate)
            delta = abs(n - c)
            lowest = min(lowest, delta)
            deltas[delta].append(c)

        # If there are multiple closest candidates, return the smallest one.
        xs = deltas[int(lowest)]
        xs.sort()
        return str(xs[0])
