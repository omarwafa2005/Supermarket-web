import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import ProductCard from "../../components/ProductCard/ProductCard";

const Wishlist = () => {
  const { wishlist } =
    useContext(WishlistContext);

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-5xl font-bold text-center mb-10">
        Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-xl">
          No favorite products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;