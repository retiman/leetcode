import { isNumber } from '../../src/stack/valid-number';

describe('valid number', () => {
  test('valid number - test case 1', async () => {
    expect(isNumber('2')).toBe(true);
  });

  test('valid number - test case 2', async () => {
    expect(isNumber('0089')).toBe(true);
  });

  test('valid number - test case 3', async () => {
    expect(isNumber('-0.1')).toBe(true);
  });

  test('valid number - test case 4', async () => {
    expect(isNumber('+3.14')).toBe(true);
  });

  test('valid number - test case 5', async () => {
    expect(isNumber('4.')).toBe(true);
  });

  test('valid number - test case 6', async () => {
    expect(isNumber('-.9')).toBe(true);
  });

  test('valid number - test case 7', async () => {
    expect(isNumber('2e10')).toBe(true);
  });

  test('valid number - test case 8', async () => {
    expect(isNumber('-90E3')).toBe(true);
  });

  test('valid number - test case 9', async () => {
    expect(isNumber('3e+7')).toBe(true);
  });

  test('valid number - test case 10', async () => {
    expect(isNumber('+6e-1')).toBe(true);
  });

  test('valid number - test case 11', async () => {
    expect(isNumber('53.5e93')).toBe(true);
  });

  test('valid number - test case 12', async () => {
    expect(isNumber('-123.456e789')).toBe(true);
  });

  test('valid number - test case 13', async () => {
    expect(isNumber('46.e3')).toBe(true);
  });

  test('valid number - test case 14', async () => {
    expect(isNumber('1.e10')).toBe(true);
  });

  test('valid number - test case 15', async () => {
    expect(isNumber('9.e3')).toBe(true);
  });

  test('valid number - test case 16', async () => {
    expect(isNumber('abc')).toBe(false);
  });

  test('valid number - test case 17', async () => {
    expect(isNumber('1a')).toBe(false);
  });

  test('valid number - test case 18', async () => {
    expect(isNumber('1e')).toBe(false);
  });

  test('valid number - test case 19', async () => {
    expect(isNumber('e3')).toBe(false);
  });

  test('valid number - test case 20', async () => {
    expect(isNumber('99e2.5')).toBe(false);
  });

  test('valid number - test case 21', async () => {
    expect(isNumber('--6')).toBe(false);
  });

  test('valid number - test case 22', async () => {
    expect(isNumber('-+3')).toBe(false);
  });

  test('valid number - test case 23', async () => {
    expect(isNumber('95a54e53')).toBe(false);
  });

  test('valid number - test case 24', async () => {
    expect(isNumber('1ee3')).toBe(false);
  });

  test('valid number - test case 25', async () => {
    expect(isNumber('.')).toBe(false);
  });

  test('valid number - test case 26', async () => {
    expect(isNumber('1e+')).toBe(false);
  });

  test('valid number - test case 27', async () => {
    expect(isNumber('1e+.')).toBe(false);
  });

  test('valid number - test case 28', async () => {
    expect(isNumber('+.')).toBe(false);
  });

  test('valid number - test case 29', async () => {
    expect(isNumber('.+')).toBe(false);
  });

  test('valid number - test case 30', async () => {
    expect(isNumber('+e3')).toBe(false);
  });

  test('valid number - test case 31', async () => {
    expect(isNumber('46e.3')).toBe(false);
  });

  test('valid number - test case 32', async () => {
    expect(isNumber('.e3')).toBe(false);
  });
});
