/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Shopitems from "../components/shopitems";
import Header from "../components/header";
import Footer from "../components/footer";

const shop = () => {
  return (
    <>
      <Header />
      <section className="shop-banner p-5">
        <div className="container-xxl">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8 col-lg-6 text-center">
              <div className="shop-details">
                <h1 className="text-black">
                  <b className="t text-[#373737]">Shop</b>
                </h1>
                <p className="text-black text-xs ">
                  Make your orders we will deliver..
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" ">
        <div className="">
          <div className="">
            <Shopitems />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default shop;
