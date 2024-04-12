import Banner from "../components/Banner";
import ByCategories from "../components/ByCategories";
import Categories from "../components/Categories";
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
      <ByCategories />
      <Footer />
    </div>
  );
};

export default Homes;
