import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase";
import defaultProducts from "../data/products";
import { mergeByUpdatedAt, stampRecord } from "./dataSync";

const PRODUCTS_KEY = "products";
const PRODUCTS_COLLECTION = collection(db, "products");

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const normalizeProduct = (product) => {
  const normalized = {
    ...product,
    id: Number(product.id),
    price: Number(product.price),
    rating: Number(product.rating),
    name: product.name?.trim() || "",
    category: product.category?.trim() || "General",
    image: product.image?.trim() || "",
  };

  return stampRecord(normalized, {
    price: Number(normalized.price) || 0,
    rating: Number(normalized.rating) || 0,
  });
};

const createInitialProducts = () => {
  const normalizedDefaults = defaultProducts.map(normalizeProduct);

  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(normalizedDefaults)
  );

  return normalizedDefaults;
};

export const getProducts = () => {
  const storedProducts = safeParse(
    localStorage.getItem(PRODUCTS_KEY),
    null
  );

  if (!Array.isArray(storedProducts) || storedProducts.length === 0) {
    return createInitialProducts();
  }

  return storedProducts.map(normalizeProduct);
};

export const saveProducts = (products) => {
  const normalizedProducts = products.map(normalizeProduct);

  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(normalizedProducts)
  );

  void (async () => {
    try {
      const batch = writeBatch(db);

      normalizedProducts.forEach((product) => {
        batch.set(doc(PRODUCTS_COLLECTION, String(product.id)), product);
      });

      await batch.commit();
    } catch {
      // fall back to local storage only
    }
  })();

  return normalizedProducts;
};

export const hydrateProductsFromFirestore = async () => {
  try {
    const snapshot = await getDocs(PRODUCTS_COLLECTION);
    const remoteProducts = snapshot.docs.map((productDoc) =>
      normalizeProduct({
        ...(productDoc.data() || {}),
        id: productDoc.id,
      })
    );

    const localProducts = getProducts();

    if (remoteProducts.length > 0 || localProducts.length > 0) {
      const mergedProducts = mergeByUpdatedAt(localProducts, remoteProducts, "id");
      saveProducts(mergedProducts);
      return mergedProducts;
    }
  } catch {
    // fall back to local storage
  }

  return getProducts();
};

export const addProduct = (product) => {
  const products = getProducts();
  const nextId =
    products.length === 0
      ? 1
      : Math.max(...products.map((item) => Number(item.id))) + 1;

  const nextProduct = normalizeProduct({
    ...product,
    id: nextId,
  });

  const nextProducts = [nextProduct, ...products];

  return saveProducts(nextProducts);
};

export const updateProduct = (productId, updates) => {
  const products = getProducts();

  const nextProducts = products.map((product) =>
    Number(product.id) === Number(productId)
      ? normalizeProduct({ ...product, ...updates, id: product.id })
      : product
  );

  return saveProducts(nextProducts);
};

export const deleteProduct = (productId) => {
  const products = getProducts();
  const nextProducts = products.filter(
    (product) => Number(product.id) !== Number(productId)
  );

  void deleteDoc(doc(PRODUCTS_COLLECTION, String(productId)));

  return saveProducts(nextProducts);
};

export const getProductById = (productId) =>
  getProducts().find(
    (product) => Number(product.id) === Number(productId)
  );

export const getProductCategories = () => {
  const categories = new Set(
    getProducts().map((product) => product.category)
  );

  return ["All", ...Array.from(categories).sort()];
};
