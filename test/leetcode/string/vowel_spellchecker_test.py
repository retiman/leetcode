from leetcode.string.vowel_spellchecker import Solution


soln = Solution()


def test_case_1():
    wordlist = ["KiTe", "kite", "hare", "Hare"]
    queries = ["kite", "Kite", "KiTe", "Hare", "HARE", "Hear", "hear", "keti", "keet", "keto"]

    assert soln.spellchecker(wordlist, queries) == [
        "kite",
        "KiTe",
        "KiTe",
        "Hare",
        "hare",
        "",
        "",
        "KiTe",
        "",
        "KiTe",
    ]
