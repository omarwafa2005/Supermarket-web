import { useParams } from "react-router-dom";
import { useContext } from "react";
import products from "../../data/products";
import { CartContext } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return (
      <h1 className="text-center text-3xl mt-20">
        Product Not Found
      </h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
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
            Category: {product.category}
          </p>

          <p className="text-green-600 text-4xl font-bold mb-8">
            ${product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;