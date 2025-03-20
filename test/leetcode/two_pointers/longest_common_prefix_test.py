from leetcode.two_pointers.longest_common_prefix import Solution


soln = Solution()


def test_case_1():
    assert soln.longestCommonPrefix(["ab", "a"]) == "a"


def test_case_2():
    assert soln.longestCommonPrefix(["a"]) == "a"


def test_case_3():
    assert soln.longestCommonPrefix(["flower", "flow", "flight"]) == "fl"


def test_case_4():
    assert soln.longestCommonPrefix(["dog", "racecar", "car"]) == ""


def test_case_5():
    assert soln.longestCommonPrefix(["", "car"]) == ""
