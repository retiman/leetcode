import { romanToInt } from '../../src/string/roman-to-int';

describe('roman to int', () => {
  test('roman to int - test case 1', () => {
    expect(romanToInt('III')).toBe(3);
  });
});
