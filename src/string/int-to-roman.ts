// DIFFICULTY: MEDIUM
//
// Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
//
// Symbol       Value
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is
// simply X + II. The number 27 is written as XXVII, which is XX + V + II.
//
// Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII.
// Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same
// principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:
//
// I can be placed before V (5) and X (10) to make 4 and 9.
// X can be placed before L (50) and C (100) to make 40 and 90.
// C can be placed before D (500) and M (1000) to make 400 and 900.
// Given an integer, convert it to a roman numeral.
//
// See {@link https://leetcode.com/problems/integer-to-roman/}
export { intToRoman };

// SOLUTION:
function intToRoman(n: number): string {
  function convert(digit: number, ones: string, fives: string, tens: string) {
    switch (digit) {
      case 1:
      case 2:
      case 3:
        return ones.repeat(digit);
      case 4:
        return `${ones}${fives}`;
      case 5:
        return fives;
      case 6:
      case 7:
      case 8:
        return `${fives}${ones.repeat(digit - 5)}`;
      case 9:
        return `${ones}${tens}`;
      case 0:
        return '';
      default:
        throw new Error('not a digit');
    }
  }

  let cs = n.toString();
  // If we have a number like 1, we don't know how many digits remain.  We could run two pointers through the array,
  // converting the least significant digits first, or we could just pad the number so that the hundreds and thousands
  // logic will skip over the few digits with zeroes.  Choosing the latter here.
  if (cs.length < 4) {
    cs = '0'.repeat(4 - cs.length) + cs;
  }

  const result = [];
  for (let i = 0; i < cs.length; i++) {
    const digit = Number.parseInt(cs[i], 10 /* radix */);
    if (i === 0) {
      // We can't have any numbers over 3999, so we don't need to specify any numerals for fives or tens.
      const roman = convert(digit, 'M', '', '');
      result.push(roman);
      continue;
    }

    if (i === 1) {
      const roman = convert(digit, 'C', 'D', 'M');
      result.push(roman);
      continue;
    }

    if (i === 2) {
      const roman = convert(digit, 'X', 'L', 'C');
      result.push(roman);
      continue;
    }

    if (i === 3) {
      const roman = convert(digit, 'I', 'V', 'X');
      result.push(roman);
      continue;
    }

    throw new Error('too many digits');
  }

  return result.join('');
}
