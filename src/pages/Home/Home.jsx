import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
        <FeaturedProducts />
    </>
  );
};

export default Home;