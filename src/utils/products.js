import defaultProducts from "../data/products";

const PRODUCTS_KEY = "products";

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const normalizeProduct = (product) => ({
  ...product,
  id: Number(product.id),
  price: Number(product.price),
  rating: Number(product.rating),
  name: product.name.trim(),
  category: product.category.trim(),
  image: product.image.trim(),
});

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

  return normalizedProducts;
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
