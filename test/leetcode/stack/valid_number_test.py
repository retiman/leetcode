from leetcode.stack.valid_number import Solution


soln = Solution()


def test_case_1():
    assert soln.isNumber("2")


def test_case_2():
    assert soln.isNumber("0089")


def test_case_3():
    assert soln.isNumber("-0.1")


def test_case_4():
    assert soln.isNumber("+3.14")


def test_case_5():
    assert soln.isNumber("4.")


def test_case_6():
    assert soln.isNumber("-.9")


def test_case_7():
    assert soln.isNumber("2e10")


def test_case_8():
    assert soln.isNumber("-90E3")


def test_case_9():
    assert soln.isNumber("3e+7")


def test_case_10():
    assert soln.isNumber("+6e-1")


def test_case_11():
    assert soln.isNumber("53.5e93")


def test_case_12():
    assert soln.isNumber("-123.456e789")


def test_case_13():
    assert soln.isNumber("46.e3")


def test_case_14():
    assert soln.isNumber("1.e10")


def test_case_15():
    assert soln.isNumber("9.e3")


def test_case_16():
    assert not soln.isNumber("abc")


def test_case_17():
    assert not soln.isNumber("1a")


def test_case_18():
    assert not soln.isNumber("1e")


def test_case_19():
    assert not soln.isNumber("e3")


def test_case_20():
    assert not soln.isNumber("99e2.5")


def test_case_21():
    assert not soln.isNumber("--6")


def test_case_22():
    assert not soln.isNumber("-+3")


def test_case_23():
    assert not soln.isNumber("95a54e53")


def test_case_24():
    assert not soln.isNumber("1ee3")


def test_case_25():
    assert not soln.isNumber(".")


def test_case_26():
    assert not soln.isNumber("1e+")


def test_case_27():
    assert not soln.isNumber("1e+.")


def test_case_28():
    assert not soln.isNumber("+.")


def test_case_29():
    assert not soln.isNumber(".+")


def test_case_30():
    assert not soln.isNumber("+e3")


def test_case_31():
    assert not soln.isNumber("46e.3")


def test_case_32():
    assert not soln.isNumber(".e3")
