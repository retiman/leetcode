// DIFFICULTY: Medium
//
// Given a string s of '(' , ')' and lowercase English characters.
//
// Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting
// parentheses string is valid and return any valid string.
//
// Formally, a parentheses string is valid if and only if:
//
// - It is the empty string, contains only lowercase characters, or
// - It can be written as AB (A concatenated with B), where A and B are valid strings, or
// - It can be written as (A), where A is a valid string.
//
// See {@link https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/}
export { minRemoveToMakeValid };

// SOLUTION:
//
// Use a stack to keep track of the parentheses.  If we find a mismatching closing parenthesis, mark it for removal.
function minRemoveToMakeValid(s: string): string {
  const stack: number[] = [];
  const remove = new Set<number>();

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    // If we encounter open paren, just push it onto the stack.
    if (c === '(') {
      stack.push(i);
      continue;
    }

    // If we encounter close paren, we need to match it with an open paren.
    if (c === ')') {
      // If we have one or more elements on the stack, we can match the close with an open paren.  If we don't, then
      // it's a mismatching paren and we need to remove it.
      if (stack.length !== 0) {
        stack.pop();
      } else {
        remove.add(i);
      }
    }
  }

  // It's possible we are left with some unmatched open parens, so mark them for removal as well.
  stack.forEach(i => remove.add(i));

  // Construct the result string by skipping marked indices.
  let result = '';
  for (let i = 0; i < s.length; i++) {
    if (remove.has(i)) {
      continue;
    }

    result += s[i];
  }

  return result;
}
