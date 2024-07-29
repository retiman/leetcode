// DIFFICULTY: Hard
//
// Convert a non-negative integer num to its English words representation.
//
// See https://leetcode.com/problems/integer-to-english-words/
describe('integer to english words', () => {
  // To get an idea of how to approach this problem, first start with a few examples, as there are going to be a lot of
  // edges cases:
  //
  // 1 => One
  // 10 => Ten
  // 11 => Eleven
  // 19 => Nineteen
  // 100 => One Hundred
  // 101 => One Hundred One
  // 1_000 => One Thousand
  // 1_001 => One Thousand One
  // 100_000 => One Hundred Thousand
  // 1_000_000 => One Million
  // 1_000_000_000 => One Billion
  //
  // A few notes:
  //
  // - 2^32 is the limit, and it is approximately 4 billion, so we don't need to describe numbers over 4 billion.
  // - The word "And" isn't required between words, so "One Hundred One", not "One Hundred And One".
  // - The numbers 1-20 need to be handled in a special way due to how English works.
  // - It's easier to deal with numbers 3 digits at a time.
  //
  // When looking at a number XYZ_123_UWV, the 123 part will always be translated into "One Hundred Twenty Three", and
  // after that, we will append "Thousand", "Million", or "Billion".  For this reason, it's best to split the number
  // into segments of 3, translate that part directly, and then append the correct word afterwards.
  function numberToWords(num: number): string {
    if (num === 0) {
      return 'Zero';
    }

    // Each index represents how to say a number in English, if it applies.
    const under20 = [
      '', // Zero missing as a special case; we will never say it in a multi word number phrase.
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen'
    ];

    // Each index represents how we'd say a tens digit in English.
    const over20 = [
      '', // We don't say Zero,
      '', // We don't say Ten One; we say Eleven.  This is covered by the under20 array.
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety'
    ];

    // Each index represents how we'd say increasingly larger 3 segment chunks of numbers.  For example:
    //
    // 111 => One Hundred Eleven
    // 111_000 => One Hundred Eleven Thousand
    // 111_000_000 => One Hundred Eleven Million
    // 111_000_000_000 => One Hundred Eleven Billion
    const thousands = [
      '', // For numbers under 1000, we don't say anything.
      'Thousand',
      'Million',
      'Billion'
    ];

    // A few aliases for convenience.
    const ones = under20;
    const tens = over20;

    // Converts a 3 digit number into a phrase.  For example, 123 => One Hundred Twenty Three.  We can then append the
    // word Million, Billion, or Thousand afterwards.
    function toWordInternal(n: number): string {
      // If we have a number like 100_000_001, then the middle segment of 000 does not get translated to "Zero", but
      // instead remains blank.
      if (n === 0) {
        return '';
      }

      // The numbers under twenty need to be handled in a special way due to how English works.
      if (n < 20) {
        return under20[n];
      }

      // For a number like 11, we take the tens digit and find out how to say it, then append
      if (n < 100) {
        const firstDigit = Math.floor(n / 10);
        const secondDigit = n % 10;
        const phrase = `${tens[firstDigit]} ${ones[secondDigit]}`;
        return phrase.trim();
      }

      // Finally, for a three digit number, take the first digit and append "Hundred", then figure out how to say the
      // 2 digit number.
      const firstDigit = Math.floor(n / 100);
      const last2Digits = n % 100;
      const firstPart = `${ones[firstDigit]} Hundred`;
      const secondPart = toWordInternal(last2Digits);
      const phrase = `${firstPart} ${secondPart}`;
      return phrase.trim();
    }

    let result = '';

    // This will keep track of how many 3 digit segments we've seen so we can add Thousands, Millions, or Billions.
    let i = 0;

    // Handle the number 3 digits at a time; each 3 digit segment represents an increase to Thousands, Millions, or
    // Billions.
    while (num > 0) {
      // Get the last 3 digits and figure out how to say them.  Once we do that, figure out if we should append nothing,
      // Thousand, Million, or Billion.
      if (num % 1000 !== 0) {
        const last3 = num % 1000;
        const phrase = `${toWordInternal(last3)} ${thousands[i]}`;

        // Add the created phrase to the front of the result, since we are dealing with the last 3 (least significant)
        // digits each time.
        result = `${phrase} ${result}`;
      }

      // Now truncate the number by 3 digits and repeat.
      num = Math.floor(num / 1000);
      i++;
    }

    return result.trim();
  }

  test('integer to english words - test case 1', async () => {
    expect(numberToWords(123)).toBe('One Hundred Twenty Three');
  });

  test('integer to english words - test case 2', async () => {
    expect(numberToWords(12345)).toBe('Twelve Thousand Three Hundred Forty Five');
  });

  test('integer to english words - test case 3', async () => {
    expect(numberToWords(1234567)).toBe('One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven');
  });

  test('integer to english words - test case 4', async () => {
    expect(numberToWords(50868)).toBe('Fifty Thousand Eight Hundred Sixty Eight');
  });
});
