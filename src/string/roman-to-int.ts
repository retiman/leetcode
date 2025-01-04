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
