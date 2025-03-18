# DIFFICULTY: HARD
#
# Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a
# valid dictionary word. Return all such possible sentences in any order.
#
# Note that the same word in the dictionary may be reused multiple times in the segmentation.
#
# See https://leetcode.com/problems/word-break-ii
class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> list[str]:
        """
        SOLUTION
        --------

        To do this, we can use a recursive backtracking algorithm.

        COMPLEXITY
        ----------

        Time complexity is O(2^n) where n is the number of words in the string.

        Space complexity is O(n) because we are storing the words in stack frames.
        """
        uniques = set(wordDict)
        memo: dict[int, list[str]] = {}

        # This generates all possible sentences using words that start at index i (if any exist) recursively.
        #
        # Since the only words we have available to us are the ones in the wordDict, we'll just have to loop through
        # from i to the end of the string to see if any of those substrings form a 'word'.
        def generate(i: int) -> list[str]:
            # Because we are slicing from [i, j), and slice is exclusive on the second index, we will be starting at
            # i + 1.  Therefore, do the bounds check for i == len(s).
            if i == len(s):
                return []

            if i in memo:
                return memo[i]

            sentences: list[str] = []
            # Attempt to generate sentences beginning with the 'word' from i to j.  Note that we want to slice from i to
            # j, so we actually want j to start at i + 1, and we also want to include j === s.length, because the slice
            # function is inclusive for the first index, and exclusive for the second index.
            for j in range(i + 1, len(s) + 1):
                word = s[i:j]
                if word not in uniques:
                    continue

                # Now generate all possible sentences using words that start at index j (if any exist), and put the word
                # from index i in front.
                rest = generate(j)

                # If the problem allowed us to generate sentences using a partial selection of characters (e.g. if we
                # couldn't make more words at this point), we could just add the current word to the result, even if
                # there were unused characters remaining.
                #
                # However, the problem does not allow us to do this, so we only add the current word if there are no
                # unused characters remaining.
                if len(rest) == 0 and j == len(s):
                    sentences.append(word)
                    continue

                # If we could generate words starting at j, prepend the word starting at index i.
                for sentence in rest:
                    sentences.append(word + " " + sentence)

            memo[i] = sentences
            return sentences

        return generate(0)
