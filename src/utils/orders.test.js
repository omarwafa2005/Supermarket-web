import { beforeEach, describe, expect, it } from "vitest";
import {
  deleteOrder,
  getLastOrder,
  getOrderById,
  getOrderStats,
  getStoredOrders,
  saveOrder,
  updateOrder,
} from "./orders";

const makeOrder = (overrides = {}) => ({
  customer: { name: "Test User", phone: "01000000000", address: "Cairo" },
  paymentMethod: "cash",
  paymentLabel: "Cash on delivery",
  status: "Pending payment on delivery",
  items: [{ id: 1, name: "Milk", price: 20, quantity: 2 }],
  itemCount: 2,
  subtotal: 40,
  deliveryFee: 0,
  grandTotal: 40,
  estimatedDelivery: "Today",
  ...overrides,
});

describe("orders utilities", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("saves and retrieves a new order", () => {
    const order = saveOrder(makeOrder());

    expect(order.id).toMatch(/^ORD-/);
    expect(getLastOrder().id).toBe(order.id);
    expect(getOrderById(order.id).id).toBe(order.id);
    expect(getStoredOrders()).toHaveLength(1);
  });

  it("updates and deletes stored orders", () => {
    const order = saveOrder(makeOrder());

    updateOrder(order.id, { status: "Delivered" });
    expect(getOrderById(order.id).status).toBe("Delivered");

    deleteOrder(order.id);
    expect(getStoredOrders()).toHaveLength(0);
    expect(getLastOrder()).toBeNull();
  });

  it("calculates dashboard stats from orders", () => {
    saveOrder(
      makeOrder({
        id: "ORD-1",
        customer: { name: "Alice" },
        paymentMethod: "cash",
        status: "Pending payment on delivery",
        grandTotal: 40,
        itemCount: 2,
      })
    );
    saveOrder(
      makeOrder({
        id: "ORD-2",
        customer: { name: "Bob" },
        paymentMethod: "card",
        status: "Delivered",
        grandTotal: 60,
        itemCount: 3,
      })
    );

    const stats = getOrderStats();

    expect(stats.totalOrders).toBe(2);
    expect(stats.totalRevenue).toBe(100);
    expect(stats.totalItemsSold).toBe(5);
    expect(stats.cashOrders).toBe(1);
    expect(stats.cardOrders).toBe(1);
    expect(stats.uniqueCustomers).toBe(2);
    expect(stats.pendingOrders).toBe(1);
    expect(stats.deliveredOrders).toBe(1);
  });
});