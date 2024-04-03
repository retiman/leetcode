describe('length of longest substring without repeated characters', () => {
  function longest(text: string): number {
    const seen = new Map<string, number>();

    // Use a sliding window approach by moving the right pointer along the string's characters, and updating the left
    // pointer any time we see a repeated character.
    let max = 0;
    for (let left = 0, right = 0; right < text.length; ) {
      const c = text[right];

      // If we've already seen this character, update the left pointer and move it just right of the last seen
      // occurrence to ensure no repeated characters.
      if (seen.has(c)) {
        const last = seen.get(c)!;
        left = Math.max(left, last + 1);
      }

      // Update our asumption about the current max.
      max = Math.max(max, right - left + 1);

      // Set the current character to be seen and advance the right pointer.
      seen.set(c, right);
      right++;
    }

    return max;
  }

  test('run', async () => {
    expect(longest('abcabcbb')).toBe(3);
    expect(longest('')).toBe(0);
  });
});
