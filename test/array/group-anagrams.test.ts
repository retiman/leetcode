// DIFFICULTY: Medium
//
// Given an array of strings strs, group the anagrams together. You can return the answer in any order.
//
// An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all
// the original letters exactly once.
//
// See https://leetcode.com/problems/group-anagrams/
describe('group anagrams', () => {
  function groupAnagrams(texts: string[]): string[][] {
    type Canonical = string;
    type Anagram = string;
    const map = new Map<Canonical, Anagram[]>();

    // Group all the anagrams together by their "canonical" form (aka a sorted version of the string).
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      const canonical = text.split('').sort().join('');
      const anagrams = map.get(canonical) ?? [];

      anagrams.push(text);
      map.set(canonical, anagrams);
    }

    // The map.values() function gives you an iterable of string[], so we need to convert it to an array of string[]
    // instead.
    return Array.from(map.values());
  }

  test('group anagrams - test case 1', async () => {
    expect(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])).toMatchSnapshot();
  });
});
