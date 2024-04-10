/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import { AiFillEye, AiOutlineShoppingCart } from "react-icons/ai";
import Swal from "sweetalert2";

const Products = () => {
  const [products, setProducts] = useState([]); // State to store fetched products

  useEffect(() => {
    // Fetch product data from your backend API
    axios
      .get(`${apiBaseUrl}/admin/products`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }) // Replace with your actual API endpoint
      .then((response) => {
        setProducts(response.data); // Set the fetched products in state
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // ...

  const updateProductStatus = (id, newStatus) => {
    console.log(`Updating product ${id} status to ${newStatus}`);

    axios
      .put(
        `${apiBaseUrl}/admin/products/${id}`,
        { status: newStatus },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        // Handle success
        console.log(`Product ${id} is now ${newStatus}`);

        // Display a success sweet alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Product ${id} is now ${newStatus}`,
        });
      })
      .catch((error) => {
        // Handle error
        console.error(`Error updating product status: ${error}`);

        // Display an error sweet alert
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while updating the product status",
        });
      });
  };

  return (
    <>
      <div className="row row-cols-1 py-10 px-20 row-cols-md-2 row-cols-lg-4 g-4">
        {products.map((product) => (
          <div className="col mb-5 " key={product.id}>
            <Link className="card h-100 m-auto p-4">
              <img
                src={product.image}
                className="card-img-top img-fluid"
                alt="..."
              />
              <div className=" flex justify-betwwen">
                <div>
                  <p className=" m uppercase">{product.brand}</p>
                  <h5 className="text-xs">{product.name} </h5>
                  <h5 className="text-xs">{product.status} </h5>

                  <div className="mb-3">
                    <p className="price mb-2">
                      <span className="red">{product.price} </span>&nbsp;
                      <strike>{product.price * 2}$</strike>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex  mt-4 justify-between">
                <button
                  onClick={() => updateProductStatus(product._id, "In Stock")}
                  className={`bg-[#008605] text-white p-1 inline-flex rounded-md shadow-md`}
                >
                  In Stock
                </button>

                <button
                  onClick={() =>
                    updateProductStatus(product._id, "Out of Stock")
                  }
                  className={`bg-[#008605] text-white p-1 inline-flex rounded-md shadow-md`}
                >
                  Out of Stock
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
