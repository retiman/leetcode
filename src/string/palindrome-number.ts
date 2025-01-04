export { isPalindrome}
function isPalindrome(x: number): boolean {
    // Negative numbers and numbers ending in 0 (except 0 itself) can't be palindromes
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }

    // Convert to string and check if reversed string matches
    const str = x.toString();
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}