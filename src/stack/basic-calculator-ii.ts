// DIFFICULTY: MEDIUM
//
// Given a string s which represents an expression, evaluate this expression and return its value.
//
// The integer division should truncate toward zero.
//
// You may assume that the given expression is always valid. All intermediate results will be in the range of
// [-231, 231 - 1].
//
// Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as
// eval().
//
// See {@link https://leetcode.com/problems/basic-calculator-ii}
export { calculate };

// SOLUTION:
//
// Assumption is that we only have numbers, +, -, *, and / in the expression.  We also assume no parentheses for
// grouping expressions.
//
// To do this we iterate through the string and use a stack to store intermediate results of computation.  Because the
// '*' and '/' operators have higher precedence, we'll resolve them immediately.  Those intermediate results will be
// stored onto the stack and we'll resolve the '+' and '-' operators at the end.
//
// Take note that the '-' operator can be a unary operator.
//
// Here's an example evaluation.  Let's suppose we have '33+2*2'.  Whenever we resolve an operator, OR start the
// calculator, we'll assume the first number is 0 (no value) and the last operator is '+'.
//
// - When we see c = '3', we'll store it as the current value as '3'.
// - When we see c = '3' again, we'll set the current value as '3 *10 + 3' or '33'.
// - When we see c = '+', we'll resolve the current value '33' on the stack.  In this step, the current operator c is
//   '+' and the last operator is also '+'.  Based on the last operator being '+', we push onto the stack.  Now we set
//   the last operator to '+'.
// - When we see c = '2', we'll store it as the current value as '2'.
// - When we see c = '*', we'll resolve the current value '2'.  In this step, the current operator 'c' is '*' and the
//   last operator is '+'.  Based on the last operator being '+', we push onto the stack.  Now we set the last operator
//   to '*'.
// - When we see c = '2', we'll store it as the current value as '2'.
// - Because it is the last character, we resolve the last operator, which is '*'.  So we pop from the stack ('2'), and
//   multiply by '2', giving a result '4', which we push to the stack.
// - Finally we sum the stack.
//
// In a situation where the last operator is '-', we would push a negative value onto the stack.  For example, if we
// have '3-2', when we see '2', the last operator is '-', so we push '-2' onto the stack.
//
// Similarly, if we just have '-2', we will see the '2' and push '-2' onto the stack, since the last operator is '-'.
//
// COMPLEXITY:
//
// Time and space complexity are both O(n); we do not need to traverse the string more than once, and we also do not
// need to store more than n values (where n is the length of the string) onto the stack.
function calculate(s: string): number {
  function isDigit(c: string) {
    return c >= '0' && c <= '9';
  }

  // Keep a stack of numbers to add up; the multiply and divide operations will be applied immediately since they have
  // higher precedence.
  const stack: number[] = [];

  // Keep track of the current value as we iterate through the string.  Every time we see a digit, we can multiply the
  // number by 10 and add the digit to it.
  let value = 0;

  // Note that the action we take when we see an operator depends on the LAST operator we saw, not the current operator
  // we see.
  //
  // Before we've seen any operators, the default behavior is to add (not subtract or something), so set the last
  // operator to '+'.
  let last = '+';

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    // If we see a space, we can safely skip it.  UNLESS, it is the last character in a string.  In that case, we do
    // actually need to resolve the last operation we saw.  For example, '3 * 2 ' should resolve '3 * 2'.  Here, we'll
    // just skip spaces if they are not the last character.
    if (c === ' ' && i !== s.length - 1) {
      continue;
    }

    // If we find a digit, build up the current number by multiplying the current value by 10 and adding the digit.
    if (isDigit(c)) {
      value = value * 10 + Number.parseInt(c, 10 /* radix */);

      // Normally, we could just continue, but if the digit is the very last character, like '3 * 2', we do actually
      // need to fall through to the operation resolution section below.
      if (i !== s.length - 1) {
        continue;
      }
    }

    // Now we have a non-digit character.  If it's a space, we can ignore it, but ONLY if it's not the last character.
    // If it's the last character, we'll have to resolve the current number and operator.
    // Okay, now we have either a space or a non-digit character that could potentially be an operation.  Either way
    // we need to resolve an expression.  For example, reading up to the last character in both strings results in some
    // evaluation:
    //
    // - '3 * 2 +' -> Results in resolving '3 * 2' first, then adding the result to the stack.
    // - '3 * 2  ' -> Results in resolving '3 * 2' because we are at the last value, but it's a string and not an
    //                operator!
    //
    // Remember, the current operator tells us what to do LATER.  What we do now depends on the last operator.  If the
    // last operator was '+', we delay the summation until the end.
    if (last === '+') {
      stack.push(value);
    }
    // Similarly if the operator was '-', we delay the summation until the end.
    else if (last === '-') {
      stack.push(-value);
    }
    // If the operator was '*', we do want to resolve it immediately with the current value and the value on the stack.
    // Imagine we've hit a case like '2 * 2 +' and we've just read the '+'.  We'll want to resolve '2 * 2' first.
    else if (last === '*') {
      const left = stack.pop()!;
      const right = value;
      stack.push(left * right);
    }
    // If the last operator was '/', we similarly want to resolve it immediately.  Take care to do left / right where
    // the left value is on the stack and the right value is what number we just read.
    else if (last === '/') {
      const left = stack.pop()!;
      const right = value;
      stack.push(Math.trunc(left / right));
    }

    // Now, after resolving an operation, reset the current value and store the current operator as the last one we have
    // seen.
    last = c;
    value = 0;
  }

  const result = stack.reduce((a, b) => a + b, 0);
  return result;
}
