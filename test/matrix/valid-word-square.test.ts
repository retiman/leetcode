import { validWordSquare } from '../../src/matrix/valid-word-square';

describe('valid word square', () => {
  test('valid word square - test case 1', async () => {
    const words = ['abcd', 'bnrt', 'crmy', 'dtye'];

    expect(validWordSquare(words)).toBe(true);
  });

  test('valid word square - test case 2', async () => {
    const words = ['abcd', 'bnrt', 'crm', 'dt'];

    expect(validWordSquare(words)).toBe(true);
  });
});
