import { removeElement } from '../../src/two-pointer/remove-element';

describe('remove element', () => {
  test('remove element - test case 1', () => {
    expect(removeElement([3, 2, 2, 3], 3)).toBe(2);
  });

  test('remove element - test case 2', () => {
    expect(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)).toBe(5);
  });
});
