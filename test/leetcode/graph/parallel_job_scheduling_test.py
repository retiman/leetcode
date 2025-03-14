from leetcode.graph.parallel_job_scheduling import Solution


soln = Solution()


def test_case_1(snapshot):
    snapshot.assert_match(sorted(soln.parallelize(["A:B,C", "B:D,E,F"])))


def test_case_2(snapshot):
    snapshot.assert_match(sorted(soln.parallelize(["A:B,C", "B:D,E", "F:G"])))
