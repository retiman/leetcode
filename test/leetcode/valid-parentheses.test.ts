// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
//
// An input string is valid if:
//
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.
//
// See https://leetcode.com/problems/valid-parentheses/
describe('valid parentheses', () => {
  function isValid(text: string): boolean {
    const map = new Map<string, string>();
    map.set('(', ')');
    map.set('{', '}');
    map.set('[', ']');

    const stack = new Array<string>();
    for (let i = 0; i < text.length; i++) {
      const c = text[i];

      if (c === '(' || c === '{' || c === '[') {
        stack.push(c);
        continue;
      }

      if (c === ')' || c === '}' || c === ']') {
        if (stack.length === 0) {
          return false;
        }

        const open = stack.pop();
        const close = map.get(open || '');
        if (close !== c) {
          return false;
        }
      }
    }

    return stack.length === 0;
  }

  test('run', async () => {
    expect(isValid('(')).toBe(false);
    expect(isValid('()')).toBe(true);
    expect(isValid('()[]{}')).toBe(true);
    expect(isValid('(}')).toBe(false);
  });
});
