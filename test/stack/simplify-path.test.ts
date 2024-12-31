import { simplifyPath } from '../../src/stack/simplify-path';

describe('simplify path', () => {
  test('simplify path', () => {
    expect(simplifyPath('/home/')).toEqual('/home');
  });
});
