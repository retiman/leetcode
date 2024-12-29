import { calculate } from '../../src/stack/basic-calculator';

describe('basic calculator', () => {
  test('calculate - test case 1', async () => {
    expect(calculate('1 + 1')).toStrictEqual(2);
  });

  test('calculate - test case 2', async () => {
    expect(calculate('(1+(4+5+2)-3)+(6+8)')).toStrictEqual(23);
  });
});
