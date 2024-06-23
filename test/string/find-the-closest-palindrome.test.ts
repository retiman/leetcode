// DIFFICULTY: Hard
//
// Given a string n representing an integer, return the closest integer (not including itself), which is a palindrome.
// If there is a tie, return the smaller one.
//
// The closest is defined as the absolute difference minimized between two integers.
//
// Constraints: 1 <= n.length <= 18
//
// See https://leetcode.com/problems/find-the-closest-palindrome/
describe('find the closest palindrome', () => {
  function __findPrefix(text: string) {
    // Find the left half of the number, which we may need to mirror.  If the number has an odd number of digits, we
    // don't take the midpoint because we won't want to mirror it anyways.
    const left = text.slice(0, text.length / 2);
    const mid = text.length % 2 === 0 ? '' : text.charAt(text.length / 2);
    return { left, mid };
  }

  function __findCandidates(text: string, left: string, mid: string) {
    // Generate candidate palindromes; if the original number is already a palindrome, this won't work and we'll have
    // to increment or decrement the left side to find the nearest palindrome.  Prepare them and then find the closest.
    const set = new Set<string>();
    [-1, 0, 1].forEach(delta => {
      const u = BigInt(left);
      const v = u + BigInt(delta);
      const prefix = v.toString();
      const suffix = prefix.split('').reverse().join('');
      const candidate = prefix + mid + suffix;
      set.add(candidate);

      // To handle a case like "11911", we need to increment and decrement the mid value (the correct answer is "11811")
      // in that case.
      if (mid === '') {
        return;
      }

      // Don't add a -1 to the middle of the string.
      const dec = BigInt(mid) - BigInt(1);
      if (dec >= 0) {
        set.add(prefix + dec.toString() + suffix);
      }
    });

    // These candidates will work for the vast majority of numbers, but sometimes we'll get edge cases where simply
    // incrementing or decrementing won't work.  For example:
    //
    // "101" => "99"
    // "99"  => "101"
    //
    // In these situations, just special case them by building special numbers like all 9's or 100...001.
    [text.length - 1, text.length, text.length + 1].forEach(size => {
      const array = Array(size);

      // Add all 9s.
      set.add(array.fill(9).join(''));

      // Add 100..001.
      array.fill(0);
      array[0] = 1;
      array[array.length - 1] = 1;
      set.add(array.join(''));
    });

    // Finally prune the candidate list of numbers that don't make sense.
    return [...set].filter(candidate => {
      if (candidate.startsWith('0')) {
        return false;
      }

      if (candidate === text) {
        return false;
      }

      return true;
    });
  }

  function __findClosest(candidates: string[], n: bigint) {
    // Find the closest elements to the original number.  Since we need to find the smallest to break a tie, just map
    // deltas to their candidates.  Note that BigInt is the constructor and bigint is the type.  Don't set the type to
    // be BigInt or else you won't be able to store stuff in your map.
    type Delta = bigint;
    type Candidate = bigint;
    const map = new Map<Delta, Candidate[]>();

    // Note that BigInt(Infinity) doesn't work; we'll just set the max value to the number itself.
    let lowest = n;
    for (let i = 0; i < candidates.length; i++) {
      const candidate = BigInt(candidates[i]);

      // Math.abs() is not available for BigInt; we'll have to implement it ourselves.
      let delta = n - candidate;
      delta = delta > 0 ? delta : -delta;
      if (delta < lowest) {
        lowest = delta;
      }

      const list = map.get(delta) ?? [];
      list.push(candidate);
      map.set(delta, list);
    }

    // If there are multiple closests, then return the smallest.
    const list = map.get(lowest) ?? [];

    // BigInt sorting seems to be broken; using .sort() puts 11n in front of 9n.  Just do this explicitly instead.
    list.sort((a, b) => {
      if (a === b) {
        return 0;
      }

      return a < b ? -1 : 1;
    });
    return list[0].toString();
  }

  // To devise a strategy, first consider a few examples:
  //
  // "123"  => "121"
  // "1234" => "1221"
  // "1000" => "1001"
  // "1"    => "0"     <-- It's not "1" because we can't return the number itself.
  // "999"  => "1001"  <-- It's not "888" because "1001" is "closer" to "999" by 2.
  // "1221" => "1111"  <-- It's not "1221" because we can't return the number itself.
  //
  // Generally, we can either mirror the left side of the number (since that should result in the "closer" number) and
  // use that, or we may have to do some incrementing/decrementing to get a part of the number we can mirror.  We also
  // need to handle edge cases like "1" or "0".
  function nearestPalindromic(text: string): string {
    // Because the problem states that we could have 18 digit numbers, we may lose precision if we do not use BigInt.
    const n = BigInt(text);

    // If it's just a single digit, return that digit minus one (since we can't return the original digit).
    if (text.length === 1) {
      return String(n - BigInt(1));
    }

    // Split up the string so we have the left prefix (and middle) in case we need it.
    const { left, mid } = __findPrefix(text);

    // Find possible candidates for the closest palindrome.
    const candidates = __findCandidates(text, left, mid);

    // Find the actual closest.
    const closest = __findClosest(candidates, n);

    return closest;
  }

  test('multiple digits', async () => {
    expect(nearestPalindromic('1234')).toBe('1221');
  });

  test('test case 1', async () => {
    expect(nearestPalindromic('123')).toBe('121');
  });

  test('test case 2', async () => {
    expect(nearestPalindromic('1')).toBe('0');
  });

  test('test case 3', async () => {
    expect(nearestPalindromic('10')).toBe('9');
  });

  test('test case 4', async () => {
    expect(nearestPalindromic('11911')).toBe('11811');
  });

  test('test case 5', async () => {
    expect(nearestPalindromic('100')).toBe('99');
  });
});
