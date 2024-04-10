/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"; // Import useState
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { apiBaseUrl } from "../../config";

const FeaturedProducts = () => {
  // Capitalize the component name
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/products`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 container-xxl bg-white shadow-md rounded-md mt-3">
        {products.map(
          (
            product // Change vendorData.products to products
          ) => (
            <div className="col " key={product.id}>
              <div className="card h-100 m-auto rounded-md ">
                <div className="rate-overlay">
                  <p className="price text-xs">
                    <span className="red"></span>{" "}
                    <strike className="bg-[#008605] rounded-full px-2">
                      {product.ProductRating}
                    </strike>
                  </p>
                </div>
                <img
                  src={product.ProductImage}
                  className="card-img-top img-fluid"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="mb-0.5 text-sm">{product.ProductName}</h5>
                  <p className="text-xs">{product.ProductDesc}</p>
                  <div className="m-auto text-center">
                    <ReactStars
                      count={5}
                      edit={false}
                      value={4}
                      size={15}
                      activeColor="#EA9D5A"
                    />
                  </div>
                  <div className="card-footer d-md-none">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="shop" className="m-auto">
                        View products
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default FeaturedProducts; // Capitalize the component name
