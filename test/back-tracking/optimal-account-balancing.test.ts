// DIFFICULTY: HARD
//
// You are given an array of transactions transactions where transactions[i] = [fromi, toi, amounti] indicates that the
// person with ID = fromi gave amounti $ to the person with ID = toi.
//
// Return the minimum number of transactions required to settle the debt.
//
// See https://leetcode.com/problems/optimal-account-balancing/
describe('optimal account balancing', () => {
  function minTransfers(transactions: number[][]): number {
    type Person = number;
    type Amount = number;
    const map = new Map<Person, Amount>();

    // First, figure out the balance that each person holds.
    for (const transaction of transactions) {
      const [from, to, amount] = transaction;
      map.set(from, (map.get(from) ?? 0) - amount);
      map.set(to, (map.get(to) ?? 0) + amount);
    }

    // Second, figure out all non-zero balances.  If we needed to know who is paying whom to achieve the minimum number
    // of transactions, we will need to have an array indexed by person.  However, we don't need to know that.
    //
    // We just need to know the number of transactions, so we can just get a list of non-zero balances and try to zero
    // them out.
    const balances: number[] = [];
    for (const value of map.values()) {
      if (value !== 0) {
        balances.push(value);
      }
    }

    // To settle debts efficiently, we should should match opposite balances together, and have them settle with each
    // other.  For example, if somebody has +5 balance, we should match then up with a -5 balance.  Matching two
    // balances with the same sign together will just result in extra transactions.
    //
    // Therefore, we should examine sequences of pairs that work towards an all zero balance sheet.  However, different
    // sequences of pairs could result in different numbers of transactions.  So we will need to examine *all* possible
    // pairs and keep track of the minimum tx's across all sequences.
    //
    // To do this effectively we need to use a recursive backtracking technique by trying to settle the ith balance
    // with i+1, i+2, i+3, etc and seeing how many tx's we incur at each step.
    function settle(left: number) {
      // Skip over the already settled balances; if we've skipped over all balances, the minimum number of tx's is 0.
      while (left < balances.length && balances[left] === 0) {
        left++;
      }

      if (left === balances.length) {
        return 0;
      }

      // Try to settle the ith balance with the first opposite signed balance.
      let min = Infinity;
      for (let right = left + 1; right < balances.length; right++) {
        // These balances were either both positive, or both negative, so do not bother executing a transaction with
        // them.
        if (balances[left] * balances[right] > 0) {
          continue;
        }

        // Attempt to settle (i, j) by adding the ith balance to the jth balance.  Technically we don't have to
        // decrement balance[i] at all, since the next call to settle will start at j (and i will be skipped).  But it
        // is included here for clarity.
        //
        // Note that we also do not have to ensure that we only add the minimum amount to balance.  For example, if
        // balances[i] = 10 and balances[j] = -5, we don't need to only add 5 to balances[j].  As we recursively move
        // down the list, balances[j] will eventually zero out (and a more efficient path may be discovered).
        //
        // Also, we are guaranteed that the balances *do* eventually zero out because there isn't any extra money in
        // the system.
        const value = balances[left];
        balances[right] += value;
        balances[left] = 0;

        // The minimum number of transactions, if we've settled the ith balance, is 1 + the minimum after settling the
        // i+1th balance.
        //
        // As a further optimization we can use dynamic programming to avoid redundant calculations.  To do so we'll
        // need to use a bit mask to keep track of balance state.
        min = Math.min(min, 1 + settle(left + 1));

        // Backtrack by restoring the balances.
        balances[right] -= value;
        balances[left] = value;
      }

      return min;
    }

    return settle(0);
  }

  test('min transfers - test case 1', async () => {
    expect(
      minTransfers([
        [0, 1, 10],
        [2, 0, 5]
      ])
    ).toBe(2);
  });

  test('min transfers - test case 2', async () => {
    expect(
      minTransfers([
        [0, 1, 10],
        [1, 0, 1],
        [1, 2, 5],
        [2, 0, 5]
      ])
    ).toBe(1);
  });

  test('min transfers - test case 3', async () => {
    expect(
      minTransfers([
        [0, 1, 1],
        [1, 2, 1],
        [2, 3, 4],
        [3, 4, 5]
      ])
    ).toBe(3);
  });
});
