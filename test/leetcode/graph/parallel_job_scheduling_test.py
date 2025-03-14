from leetcode.graph.parallel_job_scheduling import Solution


soln = Solution()


def test_case_1(snapshot):
    result = soln.parallelize(["A:B,C", "B:D,E,F"])

    expected = [sorted(xs) for xs in result]
    snapshot.assert_match(sorted(expected))


def test_case_2(snapshot):
    result = soln.parallelize(["A:B,C", "B:D,E", "F:G"])

    expected = [sorted(xs) for xs in result]
    snapshot.assert_match(sorted(expected))
