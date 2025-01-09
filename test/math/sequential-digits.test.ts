import { sequentialDigits } from '../../src/math/sequential-digits';

describe('sequential digits', () => {
  test('sequential digits - test case 1', async () => {
    expect(sequentialDigits(100, 300)).toMatchSnapshot();
  });

  test('sequential digits - test case 2', async () => {
    expect(sequentialDigits(1000, 13000)).toMatchSnapshot();
  });
});
