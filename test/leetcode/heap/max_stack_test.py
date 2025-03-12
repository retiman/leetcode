import leetcode.heap.max_stack as lc


stack = lc.MaxStack()


def test_case_1():
    stack.push(5)
    stack.push(1)
    stack.push(5)

    assert stack.top() == 5
    assert stack.popMax() == 5
    assert stack.top() == 1
    assert stack.peekMax() == 5
    assert stack.pop() == 1
    assert stack.top() == 5
