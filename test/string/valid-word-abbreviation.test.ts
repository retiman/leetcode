import { validWordAbbreviation } from '../../src/string/valid-word-abbreviation';

describe('valid word abbreviation', () => {
  test('valid word abbreviation - test case 1', async () => {
    expect(validWordAbbreviation('substitition', 's10n')).toBe(true);
  });
});
