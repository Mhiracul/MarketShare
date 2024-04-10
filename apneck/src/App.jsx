/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/layout";
//import Home from "./pages/home";
import Shop from "./pages/shop";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Forgotpasword from "./pages/forgotpasword";
import Cart from "./pages/cart";
import "./App.css";
import ShopContext from "./components/shopcontext";
import Newproduct from "./Admin/NewProduct";
import Products from "./Admin/Products";
import Orders from "./pages/Orders";
import SearchResultsPage from "./pages/SearchResultPage";
import ResetPassword from "./pages/ResetPassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Profile from "./pages/Profile";
import OrderTracker from "./pages/OrderTracker";
import Terms from "./pages/Terms";
import Homes from "./pages/Homes";
import Order from "./pages/Order";
import ProductsPage from "./pages/ProductPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ShopContext>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route index element={<Homes />} />
            <Route path="shop" element={<Shop />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
            <Route path="forgotpassword" element={<Forgotpasword />} />
            <Route path="resetpassword" element={<ResetPassword />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="cart" element={<Cart />} />
            <Route path="newproduct" element={<Newproduct />} />
            <Route path="product" element={<Products />} />
            <Route path="order" element={<Order />} />
            <Route path="order-tracking" element={<OrderTracker />} />
            <Route path="/results" element={<SearchResultsPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </BrowserRouter>
      </ShopContext>
    </>
  );
}

export default App;
