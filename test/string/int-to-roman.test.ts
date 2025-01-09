import { intToRoman } from '../../src/string/int-to-roman';

describe('roman to integer', () => {
  test('int to roman - test case 1', async () => {
    expect(intToRoman(0)).toBe('');
  });

  test('int to roman - test case 2', async () => {
    expect(intToRoman(1)).toBe('I');
  });

  test('int to roman - test case 3', async () => {
    expect(intToRoman(5)).toBe('V');
  });

  test('int to roman - test case 4', async () => {
    expect(intToRoman(10)).toBe('X');
  });

  test('int to roman - test case 5', async () => {
    expect(intToRoman(40)).toBe('XL');
  });

  test('int to roman - test case 6', async () => {
    expect(intToRoman(50)).toBe('L');
  });

  test('int to roman - test case 7', async () => {
    expect(intToRoman(58)).toBe('LVIII');
  });

  test('int to roman - test case 8', async () => {
    expect(intToRoman(90)).toBe('XC');
  });

  test('int to roman - test case 9', async () => {
    expect(intToRoman(100)).toBe('C');
  });

  test('int to roman - test case 10', async () => {
    expect(intToRoman(1000)).toBe('M');
  });
});
