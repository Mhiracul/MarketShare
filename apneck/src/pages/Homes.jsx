import Banner from "../components/Banner";
import Categories from "../components/Categories";
import FeaturedCategories from "../components/FeaturedCategory";
import TopProduct from "../components/TopProduct";
import Footer from "../components/footer";
import Header from "../components/header";
import Shops from "./Shops";

const Homes = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Shops />
      <Categories />
      <TopProduct />
      <FeaturedCategories />
      <Footer />
    </div>
  );
};

export default Homes;
