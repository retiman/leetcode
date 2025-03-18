from leetcode.stack.min_stack import MinStack


def test_case_1():
    stack = MinStack()
    stack.push(0)
    stack.push(-3)

    assert stack.getMin() == -3

    stack.pop()

    assert stack.top() == 0
    assert stack.getMin() == 0
