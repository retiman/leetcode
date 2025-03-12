import leetcode.array.dot_product_of_two_sparse_vectors as lc


def test_case_1():
    a = lc.SparseVector([1, 0, 0, 2, 3])
    b = lc.SparseVector([0, 3, 0, 4, 0])

    assert a.dotProduct(b) == 8
