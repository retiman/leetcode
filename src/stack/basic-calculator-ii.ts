// DIFFICULTY: Medium
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
// The * and / operators have higher precedence and are evaluated immediately in the order we see them.
//
// Note that the - operator can be a unary operator.
function calculate(s: string): number {
  function isDigit(c: string) {
    // Number(' ') gives you 0, but that's totally not a digit.
    if (c === ' ') {
      return false;
    }

    return !Number.isNaN(Number(c));
  }

  // Keep a stack of numbers to add up; the multiply and divide operations will be applied immediately since they have
  // higher precedence.
  const stack: number[] = [];

  // Save the last seen operator and any intermediate text that is part of a number.  Once we build up a complete number
  // we'll resolve the operation.
  //
  // Set the initial operator to '+' since the default operation is to add.
  let op = '+';
  let text = '';

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    // If we find a number, we should and it to the `text` value to continue building up the number.
    //
    // Do not continue to the next character just yet, since we may be at the end of the string and will need to resolve
    // this number immediately.
    if (isDigit(c)) {
      text += c;
    }

    // So if we are at the end of the string, or if we find an operator, we should resolve the number we've built up.
    if (!isDigit(c) || i === s.length - 1) {
      // Convert the number string we've built up to an actual number.
      const num = Number.parseInt(text, 10 /* radix */);

      // At this point we've seen an operator, 'c'.  The operator 'c' will not tell us what to do NOW, but what to do in
      // the future, after we've resolved the current operator.
      //
      // There is a bit of a gotcha here; if the last character is a ' ', there is no "next operator", that is, if we
      // have "3/2 ", the next operator ends up being ' '.  That said, it doesn't affect the calculation since the
      // iteration ends anyways.
      const nextOperator = c;

      // If the last operator was '+', we'll resolve them all at the end, so just push it onto the stack.
      if (op === '+') {
        stack.push(num);
      }
      // If the last operator was '-' (even if it was unary minus), we'll push the negative value onto the stack and
      // resolve the additions at the end.
      else if (op === '-') {
        stack.push(-num);
      }
      // If the last operator was '*' or '/', we'll want to resolve it immediately, since these operations take
      // precedence.  The last number on the stack will be the left operand and the current number will be the right
      // operand.
      //
      // After resolving the '*' operation, push the result onto the stack and resolve the additions at the end.  If we
      // had a '-' operator, this will result in a negative value pushed onto the stack, which is what we want.
      else if (op === '*') {
        const left = stack.pop()!;
        const right = num;
        const value = left * right;
        stack.push(value);
      }
      // If the last operator was '/', just keep in mind that the stack value is the left operand and the current number
      // is the right operand.  The instructions say to truncate towards zero.
      else if (op === '/') {
        const left = stack.pop()!;
        const right = num;
        const value = Math.trunc(left / right);
        stack.push(value);
      }

      // After resolving an operation, reset the text value, and set the next operator.
      op = nextOperator;
      text = '';
    }
  }

  const result = stack.reduce((a, b) => a + b, 0);
  return result;
}
