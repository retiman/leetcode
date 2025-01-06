// DIFFICULTY: EASY
//
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
//
// An input string is valid if:
//
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.
//
// See {@link https://leetcode.com/problems/valid-parentheses/}
export { isValid };

// SOLUTION:
function isValid(text: string) {
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
