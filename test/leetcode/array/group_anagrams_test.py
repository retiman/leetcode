import leetcode.array.group_anagrams as lc


soln = lc.Solution()


def test_case_1(snapshot):
    snapshot.assert_match(soln.groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
