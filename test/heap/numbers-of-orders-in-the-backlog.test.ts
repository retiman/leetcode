import { getNumberOfBacklogOrders } from '../../src/heap/numbers-of-orders-in-the-backlog';

describe('number of orders in the backlog', () => {
  test.skip('number of backlog orders - test case 1', async () => {
    const orders = [
      [10, 5, 0],
      [15, 2, 1],
      [25, 1, 1],
      [30, 4, 0]
    ];

    expect(getNumberOfBacklogOrders(orders)).toBe(6);
  });

  test.skip('number of backlog orders - test case 2', async () => {
    const orders = [
      [7, 1000000000, 1],
      [15, 3, 0],
      [5, 999999995, 0],
      [5, 1, 1]
    ];

    expect(getNumberOfBacklogOrders(orders)).toBe(999999984);
  });

  test.skip('number of backlog orders - test case 3', async () => {
    const orders = [
      [19, 28, 0],
      [9, 4, 1],
      [25, 15, 1]
    ];

    expect(getNumberOfBacklogOrders(orders)).toBe(39);
  });

  test.skip('number of backlog orders - test case 4', async () => {
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

  test.skip('number of backlog orders - test case 5', async () => {
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
