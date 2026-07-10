import {
  useParams,
} from "react-router-dom";
import {
  useContext,
  useEffect,
} from "react";
import { CartContext } from "../../context/CartContext";
import { ThemeContext } from "../../context/ThemeContext";
import { RecentContext } from "../../context/RecentContext";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import RecentlyViewed from "../../components/RecentlyViewed/RecentlyViewed";

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } =
    useContext(CartContext);

  const { darkMode } =
    useContext(ThemeContext);

  const {
    addRecentProduct,
  } = useContext(
    RecentContext
  );

  const product =
    products.find(
      (p) =>
        p.id === Number(id)
    );

  useEffect(() => {
    if (product) {
      addRecentProduct(
        product
      );
    }
  }, [product]);

  if (!product) {
    return (
      <h1 className="text-center text-3xl mt-20">
        Product Not Found
      </h1>
    );
  }

  const relatedProducts =
    products
      .filter(
        (item) =>
          item.category ===
            product.category &&
          item.id !== product.id
      )
      .slice(0, 4);

  return (
    <>
      <section
        className={`max-w-6xl mx-auto py-16 px-6 transition-colors duration-300 ${
          darkMode
            ? "text-white"
            : "text-black"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl shadow-lg"
          />

          <div>
            <h1 className="text-5xl font-bold mb-6">
              {product.name}
            </h1>

            <p className="text-gray-500 text-xl mb-4">
              Category:{" "}
              {
                product.category
              }
            </p>

            <p className="text-green-600 text-4xl font-bold mb-4">
              $
              {product.price}
            </p>

            <p className="text-2xl mb-8">
              ⭐{" "}
              {product.rating}
            </p>

            <button
              onClick={() =>
                addToCart(
                  product
                )
              }
              className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition"
            >
              Add To Cart
            </button>
          </div>
        </div>

        {relatedProducts.length >
          0 && (
          <div className="mt-24">
            <h2 className="text-4xl font-bold text-center mb-10">
              Related Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(
                (
                  relatedProduct
                ) => (
                  <ProductCard
                    key={
                      relatedProduct.id
                    }
                    product={
                      relatedProduct
                    }
                  />
                )
              )}
            </div>
          </div>
        )}
      </section>

      <RecentlyViewed />
    </>
  );
};

export default ProductDetails;