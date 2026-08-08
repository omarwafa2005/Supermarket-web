import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase";
import { mergeByUpdatedAt, stampRecord } from "./dataSync";

const ORDERS_KEY = "orders";
const LAST_ORDER_KEY = "lastOrder";
const ORDERS_COLLECTION = collection(db, "orders");

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const getStoredOrders = () => {
  const orders = safeParse(localStorage.getItem(ORDERS_KEY), []);

  return Array.isArray(orders) ? orders : [];
};

export const saveOrders = (orders) => {
  const normalizedOrders = orders.map((order) => stampRecord(order));

  localStorage.setItem(ORDERS_KEY, JSON.stringify(normalizedOrders));

  void (async () => {
    try {
      const batch = writeBatch(db);

      normalizedOrders.forEach((order) => {
        batch.set(doc(ORDERS_COLLECTION, String(order.id)), order);
      });

      await batch.commit();
    } catch {
      // fall back to local storage only
    }
  })();

  return normalizedOrders;
};

export const hydrateOrdersFromFirestore = async () => {
  try {
    const snapshot = await getDocs(ORDERS_COLLECTION);
    const remoteOrders = snapshot.docs.map((orderDoc) => orderDoc.data());
    const localOrders = getStoredOrders();

    if (remoteOrders.length > 0 || localOrders.length > 0) {
      const mergedOrders = mergeByUpdatedAt(localOrders, remoteOrders, "id");
      saveOrders(mergedOrders);
      return mergedOrders;
    }
  } catch {
    // fall back to local storage
  }

  return getStoredOrders();
};

export const getLastOrder = () =>
  safeParse(localStorage.getItem(LAST_ORDER_KEY), null);

export const getOrderById = (orderId) =>
  getStoredOrders().find((order) => order.id === orderId) || getLastOrder();

export const clearLastOrder = () => {
  localStorage.removeItem(LAST_ORDER_KEY);
};

export const saveOrder = (order) => {
  const normalizedOrder = {
    ...order,
    id: order.id || `ORD-${Date.now()}`,
    createdAt: order.createdAt || new Date().toISOString(),
  };

  const currentOrders = getStoredOrders();
  const nextOrders = [normalizedOrder, ...currentOrders].slice(0, 25);

  localStorage.setItem(ORDERS_KEY, JSON.stringify(nextOrders));
  localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(normalizedOrder));

  void (async () => {
    try {
      const batch = writeBatch(db);
      batch.set(doc(ORDERS_COLLECTION, normalizedOrder.id), normalizedOrder);
      await batch.commit();
    } catch {
      // ignore
    }
  })();

  return normalizedOrder;
};

export const updateOrder = (orderId, updates) => {
  const currentOrders = getStoredOrders();
  const nextOrders = currentOrders.map((order) =>
    order.id === orderId ? { ...order, ...updates } : order
  );

  saveOrders(nextOrders);

  const lastOrder = getLastOrder();
  if (lastOrder && lastOrder.id === orderId) {
    localStorage.setItem(
      LAST_ORDER_KEY,
      JSON.stringify({ ...lastOrder, ...updates })
    );
  }

  return nextOrders;
};

export const deleteOrder = (orderId) => {
  const currentOrders = getStoredOrders();
  const nextOrders = currentOrders.filter((order) => order.id !== orderId);

  void deleteDoc(doc(ORDERS_COLLECTION, orderId));
  saveOrders(nextOrders);

  const lastOrder = getLastOrder();
  if (lastOrder && lastOrder.id === orderId) {
    clearLastOrder();
  }

  return nextOrders;
};

export const getOrderStats = () => {
  const orders = getStoredOrders();
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending payment on delivery" || order.status === "Pending"
  ).length;
  const confirmedOrders = orders.filter(
    (order) => order.status === "Confirmed" || order.status === "Paid"
  ).length;
  const preparingOrders = orders.filter(
    (order) => order.status === "Preparing"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.grandTotal || 0),
    0
  );
  const totalItemsSold = orders.reduce(
    (sum, order) => sum + Number(order.itemCount || 0),
    0
  );
  const cashOrders = orders.filter(
    (order) => order.paymentMethod === "cash"
  ).length;
  const cardOrders = orders.filter(
    (order) => order.paymentMethod === "card"
  ).length;
  const uniqueCustomers = new Set(
    orders.map((order) => order.customer?.name?.trim()).filter(Boolean)
  ).size;

  return {
    orders,
    totalOrders: orders.length,
    totalRevenue,
    totalItemsSold,
    cashOrders,
    cardOrders,
    uniqueCustomers,
    pendingOrders,
    confirmedOrders,
    preparingOrders,
    deliveredOrders,
  };
};
