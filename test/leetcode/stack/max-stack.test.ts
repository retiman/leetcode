import { MaxStack } from '../../src/heap/max-stack';

describe('max stack', () => {
  test('max stack - test case 1', async () => {
    const stack = new MaxStack();

    stack.push(5);
    stack.push(1);
    stack.push(5);

    expect(stack.top()).toBe(5);
    expect(stack.popMax()).toBe(5);
    expect(stack.top()).toBe(1);
    expect(stack.peekMax()).toBe(5);
    expect(stack.pop()).toBe(1);
    expect(stack.top()).toBe(5);
  });
});
