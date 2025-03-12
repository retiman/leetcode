from leetcode.array.group_anagrams import Solution


soln = Solution()


def test_case_1(snapshot):
    snapshot.assert_match(soln.groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
