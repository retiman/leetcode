// CATEGORY: Backtracking
//
// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
//
// See https://leetcode.com/problems/generate-parentheses/
describe('generate parentheses', () => {
  // A naive way to do this would be to do something like generate all the parentheses for n-1, then add more
  // parentheses to each of the elements generated.  For example, by transforming each element of the n-1 solution to
  // `${e}()`, `()${e}`, and `($e)`.
  //
  // This doesn't work for values like n=4, because you will miss solutions like `(())(())`.  Instead, we'll construct
  // the string as we go along, keeping track of how many open and close parentheses we have used.  In total, the
  // resulting strings will each have length n*2.
  function generateParenthesis(n: number): string[] {
    if (n === 0) {
      return [];
    }

    const result: string[] = [];
    const max = n * 2;

    function generate(text: string, opens: number, closes: number) {
      // The max length of the string is n * 2 because each open paren requires a close paren.  We can't get fewer than
      // n * 2 characters in a string either, because we have to generate all possible combinations.
      if (text.length === max) {
        result.push(text);
        return;
      }

      // The total string length is n * 2, but we can only open a max of n parens; the rest have to be closed.  If we
      // still have opens remaining, we can open more, or we can close.
      if (opens < n) {
        generate(`${text}(`, opens + 1, closes);
        // Additionally, we can open to close some more parens if there are any open.
        if (opens > closes) {
          generate(`${text})`, opens, closes + 1);
        }
      }
      // Here we have exceeded our budget of opening parens, so we have to only close.
      else {
        generate(`${text})`, opens, closes + 1);
      }
    }

    generate('', 0, 0);
    return result;
  }

  test('run', async () => {
    function generate(n: number): Set<string> {
      return new Set(generateParenthesis(n));
    }

    expect(generate(0)).toStrictEqual(new Set());
    expect(generate(1)).toStrictEqual(new Set(['()']));
    expect(generate(2)).toStrictEqual(new Set(['()()', '(())']));
    expect(generate(3)).toMatchSnapshot();
    expect(generate(4)).toMatchSnapshot();
  });
});
