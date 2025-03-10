// DIFFICULTY: MEDIUM
//
// Given a wordlist, we want to implement a spellchecker that converts a query word into a correct word.
//
// For a given query word, the spell checker handles two categories of spelling mistakes:
//
// Capitalization: If the query matches a word in the wordlist (case-insensitive), then the query word is returned with
// the same case as the case in the wordlist.
//
// - Example: wordlist = ["yellow"], query = "YellOw": correct = "yellow"
// - Example: wordlist = ["Yellow"], query = "yellow": correct = "Yellow"
// - Example: wordlist = ["yellow"], query = "yellow": correct = "yellow"
// - Vowel Errors: If after replacing the vowels ('a', 'e', 'i', 'o', 'u') of the query word with any vowel
//   individually, it matches a word in the wordlist (case-insensitive), then the query word is returned with the same
//   case as the match in the wordlist.
// - Example: wordlist = ["YellOw"], query = "yollow": correct = "YellOw"
// - Example: wordlist = ["YellOw"], query = "yeellow": correct = "" (no match)
// - Example: wordlist = ["YellOw"], query = "yllw": correct = "" (no match)
//
// In addition, the spell checker operates under the following precedence rules:
//
// - When the query exactly matches a word in the wordlist (case-sensitive), you should return the same word back.
// - When the query matches a word up to capitlization, you should return the first such match in the wordlist.
// - When the query matches a word up to vowel errors, you should return the first such match in the wordlist.
// - If the query has no matches in the wordlist, you should return the empty string.
// - Given some queries, return a list of words answer, where answer[i] is the correct word for query = queries[i].
//
// See {@link https://leetcode.com/problems/vowel-spellchecker/}
export { spellchecker };

// SOLUTION:
function spellchecker(wordlist: string[], queries: string[]): string[] {
  const set = new Set(wordlist);
  const caps = new Map<string, string>();
  const vowels = new Map<string, string>();

  // We can normalize all inputs and words to a canonical form, then check if the inputs match the canonical form.
  for (const word of wordlist) {
    const lowered = word.toLowerCase();

    // Problem says to only use the first mapping; multiple may be given.  So if we have a mapping, ignore the rest.
    if (!caps.has(lowered)) {
      caps.set(lowered, word);
    }

    // Problem is not 100% clear, but it seems we are allowed to change any number of vowels so that the input matches
    // the word (not just a single vowel).  That means we can just normalize all the vowel inputs to a canonical form
    // with vowels replaced.
    const voweled = lowered.replace(/[aeiou]/g, '#');
    if (!vowels.has(voweled)) {
      vowels.set(voweled, word);
    }
  }

  const result: string[] = [];

  // Now just canonicalize all the words and check if they match a rule.
  for (const query of queries) {
    if (set.has(query)) {
      result.push(query);
      continue;
    }

    const lowered = query.toLowerCase();
    if (caps.has(lowered)) {
      result.push(caps.get(lowered)!);
      continue;
    }

    const voweled = lowered.replace(/[aeiou]/g, '#');
    if (vowels.has(voweled)) {
      result.push(vowels.get(voweled)!);
      continue;
    }

    result.push('');
  }

  return result;
}
