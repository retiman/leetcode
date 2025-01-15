import { simplifyPath } from '../../src/stack/simplify-path';

describe('simplify path', () => {
  test('simplify path - test case 1', () => {
    expect(simplifyPath('/home/')).toEqual('/home');
  });

  test('simplify path - test case 2', () => {
    expect(simplifyPath('/../')).toEqual('/home');
  });
});
