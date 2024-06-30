// DIFFICULTY: Medium
//
// You are given a 2D integer array orders, where each orders[i] = [pricei, amounti, orderTypei] denotes that amounti
// orders have been placed of type orderTypei at the price pricei. The orderTypei is:
//
// 0 if it is a batch of buy orders, or
// 1 if it is a batch of sell orders.
//
// Note that orders[i] represents a batch of amounti independent orders with the same price and order type. All orders
// represented by orders[i] will be placed before all orders represented by orders[i+1] for all valid i.
//
// There is a backlog that consists of orders that have not been executed. The backlog is initially empty. When an order
// is placed, the following happens:
//
// If the order is a buy order, you look at the sell order with the smallest price in the backlog. If that sell order's
// price is smaller than or equal to the current buy order's price, they will match and be executed, and that sell order
// will be removed from the backlog. Else, the buy order is added to the backlog.
//
// Vice versa, if the order is a sell order, you look at the buy order with the largest price in the backlog. If that
// buy order's price is larger than or equal to the current sell order's price, they will match and be executed, and
// that buy order will be removed from the backlog. Else, the sell order is added to the backlog.
//
// Return the total amount of orders in the backlog after placing all the orders from the input. Since this number can
// be large, return it modulo 10^9 + 7.
//

// See https://leetcode.com/problems/number-of-orders-in-the-backlog/
describe('number of orders in the backlog', () => {
  // This problem looks like it can be solved by maintaining a sorted list of buy orders and sell orders (aka heaps).
  // For a sell order, you want buy orders in largest to smallest (max heap).  For a buy order, you want sell orders
  // from smallest to largest (min heap).
  //
  // TypeScript does not implement min or max heaps for us; we'll have to do it ourselves.
  function getNumberOfBacklogOrders(orders: number[][]): number {
    const buys = new MaxHeap();
    const sells = new MinHeap();

    function handleBuy(price: number, amount: number) {
      while (amount > 0) {
        // No more sellers, push buy order to the backlog.
        if (sells.size() === 0) {
          buys.push([price, amount]);
          return;
        }

        const order = sells.peek()!;

        // If the buy price is lower than the minimum selling price, we cannot find a match, so let's just put the buy
        // order on the backlog.
        if (price < order[0]) {
          buys.push([price, amount]);
          return;
        }

        // Otherwise, we have found a match, so let's execute the order.
        const a = Math.min(amount, order[1]);
        amount -= a;
        order[1] -= a;

        // If the sell order has been exhausted, pop it from the heap.
        if (order[1] === 0) {
          sells.pop();
        }

        // If the buy order has been exhausted, we've processed the buy order, so return.
        if (amount === 0) {
          return;
        }
      }
    }

    function handleSell(price: number, amount: number) {
      while (amount > 0) {
        // No more buyers, push sell order to the backlog.
        if (buys.size() === 0) {
          sells.push([price, amount]);
          return;
        }

        const order = buys.peek()!;

        // If the sell price is higher than the maximum buy price, we cannot find a buyer, so push onto the backlog.
        if (price > order[0]) {
          sells.push([price, amount]);
          return;
        }

        // Otherwise, we have found a match, so let's execute the order.
        const a = Math.min(amount, order[1]);
        amount -= a;
        order[1] -= a;

        // If the buy order has been exhausted, pop it from the heap.
        if (order[1] === 0) {
          buys.pop();
        }

        // If the buy order has been exhausted, we've processed the buy order, so return.
        if (amount === 0) {
          return;
        }
      }
    }

    for (const order of orders) {
      const [price, amount, orderType] = order;

      // Nothing to buy or sell here.
      if (amount === 0) {
        continue;
      }

      // Buy order; match with the cheapest seller.
      if (orderType === 0) {
        handleBuy(price, amount);
        continue;
      }

      // Sell order; match with the highest buyer.
      if (orderType === 1) {
        handleSell(price, amount);
        continue;
      }
    }

    // Calculate *amount* of total orders remaining in the backlog.
    const modulus = 1e9 + 7;
    let total = 0;

    for (const [_, amount] of buys.all()) {
      total = (total + amount) % modulus;
    }

    for (const [_, amount] of sells.all()) {
      total = (total + amount) % modulus;
    }

    return total;
  }

  class MinHeap {
    private readonly items: Array<[price: number, amount: number]> = [];

    public push(item: [price: number, amount: number]) {
      const [price, amount] = item;
      if (amount === 0) {
        return;
      }

      // Do an insert via binary search.
      let left = 0;
      let right = this.items.length;
      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const [p, _] = this.items[mid];
        if (price > p) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      // Add after the left element.
      this.items.splice(left, 0, item);
    }

    public pop() {
      return this.items.shift();
    }

    public peek() {
      return this.items.length === 0 ? undefined : this.items[0];
    }

    public size() {
      return this.items.length;
    }

    public all() {
      return this.items;
    }
  }

  class MaxHeap {
    private readonly items: Array<[price: number, amount: number]> = [];

    public push(item: [price: number, amount: number]) {
      const [price, amount] = item;
      if (amount === 0) {
        return;
      }

      // Do an insert via binary search.
      let left = 0;
      let right = this.items.length;
      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const [p, _] = this.items[mid];
        if (price > p) {
          right = mid;
        } else {
          left = mid + 1;
        }
      }

      // Add after the left element.
      this.items.splice(left, 0, item);
    }

    public pop() {
      return this.items.shift();
    }

    public peek() {
      return this.items.length === 0 ? undefined : this.items[0];
    }

    public size() {
      return this.items.length;
    }

    public all() {
      return this.items;
    }
  }

  test('test case 1', async () => {
    const orders = [
      [10, 5, 0],
      [15, 2, 1],
      [25, 1, 1],
      [30, 4, 0]
    ];

    expect(getNumberOfBacklogOrders(orders)).toBe(6);
  });

  test('test case 2', async () => {
    const orders = [
      [7, 1000000000, 1],
      [15, 3, 0],
      [5, 999999995, 0],
      [5, 1, 1]
    ];

    expect(getNumberOfBacklogOrders(orders)).toBe(999999984);
  });

  test('test case 3', async () => {
    const orders = [
      [19, 28, 0],
      [9, 4, 1],
      [25, 15, 1]
    ];

    expect(getNumberOfBacklogOrders(orders)).toBe(39);
  });

  test('test case 4', async () => {
    const orders = [
      [26, 7, 0],
      [16, 1, 1],
      [14, 20, 0],
      [23, 15, 1],
      [24, 26, 0],
      [19, 4, 1],
      [1, 1, 0]
    ];

    expect(getNumberOfBacklogOrders(orders)).toBe(34);
  });

  test('test case 5', async () => {
    const orders = [
      [1, 29, 1],
      [22, 7, 1],
      [24, 1, 0],
      [25, 15, 1],
      [18, 8, 1],
      [8, 22, 0],
      [25, 15, 1],
      [30, 1, 1],
      [27, 30, 0]
    ];

    expect(getNumberOfBacklogOrders(orders)).toBe(22);
  });
});
