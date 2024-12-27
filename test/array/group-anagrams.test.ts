import { groupAnagrams } from "../../src/array/group-anagrams";

describe('group anagrams', () => {
  test('group anagrams - test case 1', async () => {
    expect(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])).toMatchSnapshot();
  });
});
