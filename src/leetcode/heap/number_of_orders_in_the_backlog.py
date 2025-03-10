# DIFFICULTY: Medium
#
# You are given a 2D integer array orders, where each orders[i] = [pricei, amounti, orderTypei] denotes that amounti
# orders have been placed of type orderTypei at the price pricei. The orderTypei is:
#
# 0 if it is a batch of buy orders, or
# 1 if it is a batch of sell orders.
#
# Note that orders[i] represents a batch of amounti independent orders with the same price and order type. All orders
# represented by orders[i] will be placed before all orders represented by orders[i+1] for all valid i.
#
# There is a backlog that consists of orders that have not been executed. The backlog is initially empty. When an order
# is placed, the following happens:
#
# If the order is a buy order, you look at the sell order with the smallest price in the backlog. If that sell order's
# price is smaller than or equal to the current buy order's price, they will match and be executed, and that sell order
# will be removed from the backlog. Else, the buy order is added to the backlog.
#
# Vice versa, if the order is a sell order, you look at the buy order with the largest price in the backlog. If that
# buy order's price is larger than or equal to the current sell order's price, they will match and be executed, and
# that buy order will be removed from the backlog. Else, the sell order is added to the backlog.
#
# Return the total amount of orders in the backlog after placing all the orders from the input. Since this number can
# be large, return it modulo 10^9 + 7.
#
# See https://leetcode.com/problems/number-of-orders-in-the-backlog
from heapq import heappop, heappush


class Solution:
    def getNumberOfBacklogOrders(self, orders: list[list[int]]) -> int:
        """
        SOLUTION:

        This problem looks like it can be solved by maintaining a sorted list of buy orders and sell orders (aka heaps).
        For a sell order, you want buy orders in largest to smallest (max heap).  For a buy order, you want sell orders
        from smallest to largest (min heap).

        COMPLEXITY:

        Time complexity is O(n log n) because we are using heaps to maintain the order of the orders.

        Space complexity is O(n).
        """
        # We want to match sellers with the largest price in the buy orders, so we want a max heap.  Pro-tip: Negate the
        # values here.
        buys: list[tuple[int, int]] = []
        # We want to match buyers with the lowest price in the sell orders, so we want a min heap.
        sells: list[tuple[int, int]] = []
        MOD = 10**9 + 7

        def handle_buy(buy_price: int, buy_amount: int):
            while buy_amount > 0:
                # If we don't have any sellers, we can't match up a sale.  So we should push the order into the buys
                # backlog.
                #
                # Note that the buys backlog is a max heap, so we have to negate the price.
                if not sells:
                    heappush(buys, (-buy_price, buy_amount))
                    return

                # If we do have a seller, we can check the lowest sale price.  If the lowest sale price is still too
                # high, we can't match up a sale.  So we should push the order into the buys backlog anyways.
                #
                # Note that the buys backlog is a max heap, so we have to negate the price.
                sell_price, sell_amount = sells[0]
                if buy_price < sell_price:
                    heappush(buys, (-buy_price, buy_amount))
                    return

                # Here the buyer and seller have agreed to a sale, so let's execute the order.  We can buy only as many
                # shares as the seller is selling at that price.
                delta = min(buy_amount, sell_amount)
                buy_amount -= delta
                sell_amount -= delta
                sells[0] = (sell_price, sell_amount)

                # If the seller isn't offering any more shares, then pop their order from the sells backlog.
                if sell_amount == 0:
                    heappop(sells)

                # If the buyer doesn't want any more shares, we can stop processing the loop.
                if buy_amount == 0:
                    return

        def handle_sell(sell_price: int, sell_amount: int):
            while sell_amount > 0:
                # If we don't have any buyers, we can't match up a sale.  So we should push the order into the sells backlog.
                if not buys:
                    heappush(sells, (sell_price, sell_amount))
                    return

                # If we do have a buyer, we can check the highest buy price.  If the highest buy price is still too low,
                # we can't match up a sale.  So we should push the order into the buys backlog anyways.
                #
                # Note that this is a max heap so we need to negate the value.
                buy_price, buy_amount = buys[0]
                buy_price *= -1
                if sell_price > buy_price:
                    heappush(sells, (sell_price, sell_amount))
                    return

                # Here the buyer nad seller have agreed to a sale, so let's execute the order.  We can only buy as many shares
                # as the seller is willing to sell.
                delta = min(buy_amount, sell_amount)
                buy_amount -= delta
                sell_amount -= delta
                buys[0] = (-buy_price, buy_amount)

                # If the buyer isn't willing to buy any more shares, then pop their order from the buys backlog.
                if buy_amount == 0:
                    heappop(buys)

                # If the seller doesn't want any more shares, stop processing the loop.
                if sell_amount == 0:
                    return

        for price, amount, order_type in orders:
            if amount == 0:
                continue

            if order_type == 0:
                handle_buy(price, amount)
            else:
                handle_sell(price, amount)

        total = 0
        for _, amount in buys:
            total = (total + amount) % MOD
        for _, amount in sells:
            total = (total + amount) % MOD
        return total
