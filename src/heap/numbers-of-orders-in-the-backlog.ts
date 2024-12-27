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
// See {@link https://leetcode.com/problems/number-of-orders-in-the-backlog/}
import { MaxPriorityQueue, MinPriorityQueue } from '@datastructures-js/priority-queue';
export { getNumberOfBacklogOrders };

// SOLUTION:
//
// This problem looks like it can be solved by maintaining a sorted list of buy orders and sell orders (aka heaps).
// For a sell order, you want buy orders in largest to smallest (max heap).  For a buy order, you want sell orders
// from smallest to largest (min heap).
//
// COMPLEXITY:
//
// The time complexity is O(n * log(n)) because we are using heaps to maintain the order of the orders.
function getNumberOfBacklogOrders(orders: number[][]): number {
  // Order = [price, amount].
  type Order = [number, number];

  // Order by [price, _] for buys and sells.
  const buys = new MaxPriorityQueue<Order>(order => order[0]);
  const sells = new MinPriorityQueue<Order>(order => order[0]);

  function handleBuy(price: number, amount: number) {
    while (amount > 0) {
      // No more sellers, push buy order to the backlog.
      if (sells.size() === 0) {
        buys.enqueue([price, amount]);
        return;
      }

      const order = sells.front();

      // If the buy price is lower than the minimum selling price, we cannot find a match, so let's just put the buy
      // order on the backlog.
      if (price < order[0]) {
        buys.enqueue([price, amount]);
        return;
      }

      // Otherwise, we have found a match, so let's execute the order.
      const a = Math.min(amount, order[1]);
      amount -= a;
      order[1] -= a;

      // If the sell order has been exhausted, pop it from the heap.
      if (order[1] === 0) {
        sells.dequeue();
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
        sells.enqueue([price, amount]);
        return;
      }

      const order = buys.front();

      // If the sell price is higher than the maximum buy price, we cannot find a buyer, so push onto the backlog.
      if (price > order[0]) {
        sells.enqueue([price, amount]);
        return;
      }

      // Otherwise, we have found a match, so let's execute the order.
      const a = Math.min(amount, order[1]);
      amount -= a;
      order[1] -= a;

      // If the buy order has been exhausted, pop it from the heap.
      if (order[1] === 0) {
        buys.dequeue();
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

  for (const item of buys.toArray()) {
    const [_, amount] = item;
    total = (total + amount) % modulus;
  }

  for (const item of sells.toArray()) {
    const [_, amount] = item;
    total = (total + amount) % modulus;
  }

  return total;
}
