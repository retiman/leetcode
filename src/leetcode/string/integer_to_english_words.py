# DIFFICULTY: HARD
# ----------------
#
# Convert a non-negative integer num to its English words representation.
#
# See https://leetcode.com/problems/integer-to-english-words
class Solution:
    def numberToWords(self, num: int) -> str:
        """
        SOLUTION
        --------

        To get an idea of how to approach this problem, first start with a few examples, as there are going to be a lot
        of edges cases:

        1 => One
        10 => Ten
        11 => Eleven
        19 => Nineteen
        100 => One Hundred
        101 => One Hundred One
        1_000 => One Thousand
        1_001 => One Thousand One
        100_000 => One Hundred Thousand
        1_000_000 => One Million
        1_000_000_000 => One Billion

        A few notes:

        - 2^32 is the limit, and it is approximately 4 billion, so we don't need to describe numbers over 4 billion.
        - The word "And" isn't required between words, so "One Hundred One", not "One Hundred And One".
        - The numbers 1-20 need to be handled in a special way due to how English works.
        - It's easier to deal with numbers 3 digits at a time.

        When looking at a number XYZ_123_UWV, the 123 part will always be translated into "One Hundred Twenty Three",
        and after that, we will append "Thousand", "Million", or "Billion".  For this reason, it's best to split the
        number into segments of 3, translate that part directly, and then append the correct word afterwards.

        COMPLEXITY
        ----------

        """
        if num == 0:
            return "Zero"

        # Each index represents how to say a number in English, if it applies.
        under_20 = [
            # Zero is missing; we will never say it in a multi word number phrase.
            "",
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
            "Nine",
            "Ten",
            "Eleven",
            "Twelve",
            "Thirteen",
            "Fourteen",
            "Fifteen",
            "Sixteen",
            "Seventeen",
            "Eighteen",
            "Nineteen",
        ]
        ones = under_20

        # Each index represents how we'd say a tens digit in English.
        over_20 = [
            # We don't say Zero.
            "",
            # We don't say Ten One; we say Eleven.  This is covered by the under_20 array.
            "",
            "Twenty",
            "Thirty",
            "Forty",
            "Fifty",
            "Sixty",
            "Seventy",
            "Eighty",
            "Ninety",
        ]
        tens = over_20

        # Each index represents how we'd say increasingly larger 3 segment chunks of numbers.  For example:
        #
        # 111 => One Hundred Eleven
        # 111_000 => One Hundred Eleven Thousand
        # 111_000_000 => One Hundred Eleven Million
        # 111_000_000_000 => One Hundred Eleven Billion
        thousands = [
            # For numbers under 1000, we don't say anything.
            "",
            "Thousand",
            "Million",
            "Billion",
        ]

        # Converts a 3 digit number into a phrase.  For example, 123 => One Hundred Twenty Three.  We can then append
        # the word Million, Billion, or Thousand afterwards.
        def toWordInternal(n: int) -> str:
            nonlocal ones, tens, thousands

            # If we have a number like 100_000_001, then the middle segment of 000 does not get translated to "Zero",
            # but instead remains blank.
            if n == 0:
                return ""
            # Handle numbers under 20; English has a special way of handling these numbers.
            elif n < 20:
                return under_20[n]
            # Handle 2 digit numbers over 20.
            elif n < 100:
                first_digit = n // 10
                second_digit = n % 10
                phrase = tens[first_digit] + " " + ones[second_digit]
                return phrase.strip()
            # Finally, handle 3 digit numbers by figuring how to say the hundreds digit, then reducing the problem to
            # the 2 digit case.
            else:
                first_digit = n // 100
                last_2_digits = n % 100
                first_part = ones[first_digit] + " Hundred"
                second_part = toWordInternal(last_2_digits)
                phrase = first_part + " " + second_part
                return phrase.strip()

        result = ""

        # This will keep track of how many 3 digit segments we've seen so we can add Thousands, Millions, or Billions.
        i = 0

        # Handle the number 3 digits at a time; each 3 digit segment represents an increase to Thousands, Millions, or
        # Billions.
        while num > 0:
            # Get the last 3 digits and figure out how to say them.  Once we do that, figure out if we should append
            # nothing, Thousand, Million, or Billion.
            if num % 1000 != 0:
                last_3_digits = num % 1000
                phrase = toWordInternal(last_3_digits) + " " + thousands[i]

                # Add the created phrase to the front of the result, since we are dealing with the last 3 (least
                # significant) digits each time.
                result = phrase + " " + result

            # Now truncate the number by 3 digits and repeat.
            num //= 1000
            i += 1

        return result.strip()
