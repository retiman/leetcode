import { calculate } from '../../src/stack/basic-calculator-ii';

describe('basic calculator ii', () => {
  test('calculate - test case 1', async () => {
    expect(calculate('3+2*2')).toStrictEqual(7);
  });

  test('calculate - test case 2', async () => {
    expect(calculate(' 3/2 ')).toStrictEqual(1);
  });
});
