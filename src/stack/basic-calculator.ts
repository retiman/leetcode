// DIFFICULTY: Hard
//
// Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result
// of the evaluation.
//
// Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as
// eval().
//
// See {@link https://leetcode.com/problems/basic-calculator}
export { calculate };

// SOLUTION:
//
// This is way harder than basic calculator ii, even though we don't consider multiplication and division.  Here, we
// have to consider parentheses.
function calculate(s: string): number {
  const stack = [];
  let result = 0;
  let sign = 1;
  let n = 0;

  function isDigit(c: string) {
    // Number(' ') gives you 0, but that's totally not a digit.
    if (c === ' ') {
      return false;
    }

    return !Number.isNaN(Number(c));
  }

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    if (isDigit(c)) {
      n = n * 10 + Number(c);
    } else if (c === '+') {
      // Whatever the current number is, add it to the result.  The sign will account for subtractions.
      result += sign * n;

      // Now we reset the sign to be POSITIVE and number to be 0.
      sign = 1;
      n = 0;
    } else if (c === '-') {
      // Whatever the current number is, add it to the result.  The sign will account for subtractions.
      result += sign * n;

      // Now we reset the sign to be NEGATIVE and number to be 0.
      sign = -1;
      n = 0;
    } else if (c === '(') {
      // Opening brace means we are evaluating a sub-expression.  Whatever the current result and sign are, push it
      // onto the stack.
      stack.push(result);
      stack.push(sign);

      // Now we reset the entire calculator (result, sign, current number) to evaluate the sub-expression.
      result = 0;
      sign = 1;
      n = 0;
    } else if (c === ')') {
      // Closing brace means we are finished evaluating a sub-expression.  Resolve the current operation and add it
      // to the sub-expression result.
      result += sign * n;

      // Pop off the sign.  If we had a NEGATIVE sign when opening the brace, the entire sub-expression result needs
      // to be negated.  That is, '-(1+2)' would require us to do result *= -1.
      result *= stack.pop()!;

      // Pop off the original result and add it to the sub-expression result.
      result += stack.pop()!;

      // Now reset the calculator.
      sign = 1;
      n = 0;
    }
  }

  return result + sign * n;
}
