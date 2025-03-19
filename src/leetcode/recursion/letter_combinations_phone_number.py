# DIFFICULTY: MEDIUM
# ------------------
#
# Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could
# represent. Return the answer in any order.
#
# A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any
# letters.
#
# See https://leetcode.com/problems/letter-combinations-of-a-phone-number
class Solution:
    def letterCombinations(self, s: str) -> list[str]:
        """
        SOLUTION
        --------

        This can be done recursively; first generate all combinations for string of digits minus the head digit.  Then
        add letters to each combination of the rest.

        COMPLEXITY
        ----------
        """
        table: dict[str, str] = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz",
        }

        def generate(t: str) -> list[str]:
            nonlocal table

            if len(t) == 0:
                return []

            if len(t) == 1:
                return list(table[t])

            # Separate the first digit and the rest of the digits.
            first = t[0]
            rest = t[1:]

            # Find all combinations of words possible just from the rest of the digits.
            combinations = generate(rest)

            # Get the letters possible from the first digit.
            letters = table[first]

            # Now insert the letters possible from the first digit in front of each combination.
            result = []
            for combination in combinations:
                for letter in letters:
                    result.append(letter + combination)

            return result

        return generate(s)
