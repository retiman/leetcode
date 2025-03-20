# DIFFICULTY: MEDIUM
# ------------------
#
# Given a wordlist, we want to implement a spellchecker that converts a query word into a correct word.
#
# For a given query word, the spell checker handles two categories of spelling mistakes:
#
# Capitalization: If the query matches a word in the wordlist (case-insensitive), then the query word is returned with
# the same case as the case in the wordlist.
#
# - Example: wordlist = ["yellow"], query = "YellOw": correct = "yellow"
# - Example: wordlist = ["Yellow"], query = "yellow": correct = "Yellow"
# - Example: wordlist = ["yellow"], query = "yellow": correct = "yellow"
# - Vowel Errors: If after replacing the vowels ('a', 'e', 'i', 'o', 'u') of the query word with any vowel
#   individually, it matches a word in the wordlist (case-insensitive), then the query word is returned with the same
#   case as the match in the wordlist.
# - Example: wordlist = ["YellOw"], query = "yollow": correct = "YellOw"
# - Example: wordlist = ["YellOw"], query = "yeellow": correct = "" (no match)
# - Example: wordlist = ["YellOw"], query = "yllw": correct = "" (no match)
#
# In addition, the spell checker operates under the following precedence rules:
#
# - When the query exactly matches a word in the wordlist (case-sensitive), you should return the same word back.
# - When the query matches a word up to capitlization, you should return the first such match in the wordlist.
# - When the query matches a word up to vowel errors, you should return the first such match in the wordlist.
# - If the query has no matches in the wordlist, you should return the empty string.
# - Given some queries, return a list of words answer, where answer[i] is the correct word for query = queries[i].
#
# See https://leetcode.com/problems/vowel-spellchecker
import re


class Solution:
    def spellchecker(self, wordlist: list[str], queries: list[str]) -> list[str]:
        """
        SOLUTION
        --------

        We will use a set to store the wordlist and two dictionaries to store the case-insensitive and vowel-error
        mappings.  We will then iterate through the queries and check for matches in the hash set, case-insensitive
        dictionary, and vowel-error dictionary in that order.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of queries.

        Space complexity is O(n).
        """
        uniques: set[str] = set(wordlist)
        lowers: dict[str, str] = {}
        vowels: dict[str, str] = {}

        # We can normalize all inputs and words to a canonical form, then check if the inputs match the canonical form.
        for word in wordlist:
            lowered = word.lower()

            # Problem says to only use the first mapping; multiple may be given.  So if we have a mapping, ignore the
            # rest.
            if lowered not in lowers:
                lowers[lowered] = word

            # Problem is not 100% clear, but it seems we are allowed to change any number of vowels so that the input
            # matches the word (not just a single vowel).  That means we can just normalize all the vowel inputs to a
            # canonical form with vowels replaced.
            voweled = re.sub(r"[aeiou]", "#", lowered)
            if voweled not in vowels:
                vowels[voweled] = word

        result: list[str] = []

        # Now just canonicalize all the words and check if they match a rule.
        for query in queries:
            if query in uniques:
                result.append(query)
                continue

            lowered = query.lower()
            if lowered in lowers:
                result.append(lowers[lowered])
                continue

            voweled = re.sub(r"[aeiou]", "#", lowered)
            if voweled in vowels:
                result.append(vowels[voweled])
                continue

            result.append("")

        return result
