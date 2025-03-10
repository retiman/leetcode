import { generateParenthesis } from '../../src/recursion/generate-parentheses';

describe('generate parentheses', () => {
  test('generate parenthesis - test case 3', async () => {
    const set = new Set(generateParenthesis(2));

    expect(set).toStrictEqual(new Set(['()()', '(())']));
  });

  test('generate parenthesis - test case 4', async () => {
    const set = new Set(generateParenthesis(3));

    expect(set).toMatchSnapshot();
  });

  test('generate parenthesis - test case 5', async () => {
    const set = new Set(generateParenthesis(4));

    expect(set).toMatchSnapshot();
  });
});
