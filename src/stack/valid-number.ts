// DIFFICULTY: HARD
//
// A valid number can be split up into these components (in order):
//
// A decimal number or an integer.
// (Optional) An 'e' or 'E', followed by an integer.
// A decimal number can be split up into these components (in order):
//
// (Optional) A sign character (either '+' or '-').
// One of the following formats:
// One or more digits, followed by a dot '.'.
// One or more digits, followed by a dot '.', followed by one or more digits.
// A dot '.', followed by one or more digits.
// An integer can be split up into these components (in order):
//
// (Optional) A sign character (either '+' or '-').
// One or more digits.
// For example, all the following are valid numbers: ["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"], while the following are not valid numbers: ["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"].
//
// Given a string s, return true if s is a valid number.
//
// See {@link https://leetcode.com/problems/valid-number/}
export { isNumber };

// SOLUTION:
//
// I don't know that this is a particularly hard problem, but it is a bit tricky to get all the edge cases right.  It
// doesn't seem like a particularly fair problem to ask in a 45m interview though.
function isNumber(text: string): boolean {
  // Defining this set will probably be faster than testing a regex over and over.
  const set = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
  const state = {
    signed: false,
    digits: false,
    decimal: false,
    exp: false
  };

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const p = i === 0 ? '' : text[i - 1].toLowerCase();

    switch (c) {
      case '+':
      case '-':
        if (state.exp) {
          // After seeing the E symbol, signs are only valid immediately after the E symbol.
          if (p !== 'e') {
            return false;
          }

          // However, signs are not valid if they are the last symbol.
          if (i === text.length - 1) {
            return false;
          }

          state.signed = true;
          break;
        }

        // Before seeing the E symbol, signs are not valid if they aren't in the first position.
        if (i !== 0) {
          return false;
        }

        // Signs are invalid after we have encountered a decimal.
        if (state.decimal) {
          return false;
        }

        // Signs are invalid if they are the last symbol, and no digits have been seen.  For example, 9. is valid, but
        // . by itself is not.
        if (i === text.length - 1 && !state.digits) {
          return false;
        }

        state.signed = true;
        break;
      case 'e':
      case 'E':
        // If the E symbol is encountered again after already seeing one, the number is automatically invalid.
        if (state.exp) {
          return false;
        }

        // The E symbol may not appear as the first symbol or the last symbol.
        if (i === 0 || i === text.length - 1) {
          return false;
        }

        // The E symbol may not appear just after the sign symbol.  For example, 46+e3 is invalid.
        if (p === '+' || p === '-') {
          return false;
        }

        // The E symbol may not appear after a decimal symbol, if no digits have been seen.  For example, 9.e3 is
        // valid, but .e3 is not valid.
        if (p === '.' && !state.digits) {
          return false;
        }

        state.exp = true;
        break;
      case '.':
        if (state.exp) {
          // The decimal symbol may not appear after the E symbol has appeared.
          return false;
        }

        // The decimal symbol may not appear after the decimal symbol has appeared.
        if (state.decimal) {
          return false;
        }

        // The decimal symbol cannot be the last symbol, unless digits have already been seen.
        if (i === text.length - 1 && !state.digits) {
          return false;
        }

        state.decimal = true;
        break;
      default:
        // Any other character that is not a digit does not constitute a number.
        if (!set.has(c)) {
          return false;
        }

        state.digits = true;
    }
  }

  return true;
}
