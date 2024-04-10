/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Featuredproducts from "../components/featuredproducts";
import blog1 from "../assets/images/blog/blog-1.jpg";
import blog2 from "../assets/images/blog/blog-2.jpg";
import blog3 from "../assets/images/blog/blog-3.jpg";
import blog4 from "../assets/images/blog/blog-4.jpg";
import Sekani from "../assets/images/products/carousel.svg";
import What from "../assets/images/products/carousel.svg";
import { FaBolt } from "react-icons/fa";
import FeaturedCategories from "../components/FeaturedCategory";
import AboutUs from "../components/AboutUs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };
  return (
    <>
      <div className=" font-poppins container-xxl outline-none  rounded-md ">
        <Slider {...settings}>
          <div
            className="mine "
            style={{
              background: `url(${Sekani})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "100vh",
            }}
          >
            {" "}
            <div className="h-full  rounded-md shadow-md px-14 py-40"></div>
          </div>

          <div
            className="joy"
            style={{
              background: `url("${What}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "100vh",
            }}
          >
            <div className="h-full  rounded-md shadow-md px-14 py-40"></div>
          </div>
        </Slider>
      </div>

      <FeaturedCategories />

      <section className="featured-products p-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 text-left">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl uppercase font-bold items-center text-black inline-flex">
                  {" "}
                  <FaBolt color="#008605" size={16} /> Featured Deals
                </h1>
                <button className="bg-[#008605] uppercase rounded-none mb-1 text-white text-xs font-medium">
                  <Link to="/shop">View all</Link>
                </button>
              </div>
              <div className="flex mt-1">
                <div className="bg-[#008605] w-full h-0.5 flex-[0,0,1px]"></div>
                <div className="bg-[#ccc] w-full h-0.5 flex-1"></div>
              </div>{" "}
            </div>

            <Featuredproducts />
          </div>
        </div>
      </section>

      <section className=" py-5 text-black container-xxl">
        <div className="">
          <div className="">
            <div className=" text-left">
              <h1 className="text-2xl uppercase font-bold items-center text-black inline-flex">
                What our customers say...
              </h1>
              <p className="mb-4">
                Our customers never miss a bit on providing feedback
              </p>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-2">
              <div className=" ">
                <div className="card">
                  <img
                    src={blog1}
                    className="card-img-top img-fluid"
                    alt="..."
                  />
                  <div className="card-body">
                    <p className="card-text">
                      I absolutely love shopping with MarketShare! Their
                      selection of groceries is amazing, and the quality is
                      top-notch. The customer service is also fantastic.
                    </p>
                    <Link to="about">
                      <button className="mt-4 text-white rounded-none text-xs">
                        Learn more
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className=" mb-4">
                <div className="card">
                  <img
                    src={blog2}
                    className="card-img-top img-fluid"
                    alt="..."
                  />
                  <div className="card-body">
                    <p className="card-text">
                      MarketShare has made my grocery shopping experience a
                      breeze. The website is easy to navigate, and I love the
                      wide variety of products.
                    </p>
                    <Link to="about">
                      <button className="mt-4 text-white rounded-none text-xs">
                        Learn more
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className=" mb-4">
                <div className="card">
                  <img
                    src={blog3}
                    className="card-img-top img-fluid"
                    alt="..."
                  />
                  <div className="card-body">
                    <p className="card-text">
                      I can{"'"}t say enough good things about MarketShare. The
                      quality of their products is top-notch, and their customer
                      service is exceptional. I{"'"}ve been a loyal customer for
                      years!
                    </p>
                    <Link to="about">
                      <button className="mt-4 text-white rounded-none text-xs">
                        Learn more
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className=" mb-4">
                <div className="card">
                  <img
                    src={blog4}
                    className="card-img-top img-fluid"
                    alt="..."
                  />
                  <div className="card-body">
                    <p className="card-text">
                      I love shopping at MarketShare! Their selection of
                      groceries is amazing, and the prices are unbeatable. Plus,
                      the delivery is always fast and reliable. Highly
                      recommended!
                    </p>
                    <Link to="about">
                      <button className="mt-4 text-white rounded-none text-xs">
                        Learn more
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutUs />
    </>
  );
};

export default home;
