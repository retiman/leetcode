// DIFFICULTY: EASY
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
//
// For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is
// simply X + II. The number 27 is written as XXVII, which is XX + V + II.
//
// Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII.
// Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same
// principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:
//
// - I can be placed before V (5) and X (10) to make 4 and 9.
// - X can be placed before L (50) and C (100) to make 40 and 90.
// - C can be placed before D (500) and M (1000) to make 400 and 900.
//
// Given a roman numeral, convert it to an integer.
//
// See {@link https://leetcode.com/problems/roman-to-integer/}
export { romanToInt };

// SOLUTION:
function romanToInt(s: string): number {
  const map = new Map([
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000]
  ]);

  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const current = map.get(s[i])!;
    const next = i + 1 < s.length ? map.get(s[i + 1]) : undefined;

    // In this case, we have a situation like IV (4) or IX (9), where the current number is less than the next number.
    // That means we want to do a subtraction.
    if (next !== undefined && current < next) {
      total -= current;
    }
    // Other cases like VI (6) or XI (11), we just want to add.
    else {
      total += current;
    }
  }

  return total;
}
