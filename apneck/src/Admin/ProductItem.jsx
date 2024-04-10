/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ShopContext } from "../components/shopcontext";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import Details from "../pages/details";
import { AiFillEye, AiOutlineShoppingCart } from "react-icons/ai";
import PropTypes from "prop-types"; // Import PropTypes
import axios from "axios";
import { apiBaseUrl } from "../../config";

const ProductItem = (props) => {
  const { id, name, price, image, brand } = props.data;

  console.log("ProductItem id:", id); // Add this line to log the id

  const handleMarkInStock = () => {
    console.log("Marking in stock...");
    updateProductStatus("In Stock");
  };

  const handleMarkOutOfStock = () => {
    console.log("Marking out of stock...");
    updateProductStatus("Out of Stock");
  };

  const updateProductStatus = (newStatus) => {
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
        // Handle success (you can update the UI as needed)
        console.log(`Product ${id} is now ${newStatus}`);
      })
      .catch((error) => {
        // Handle error
        console.error(`Error updating product status: ${error}`);
      });
  };

  return (
    <>
      <div className="col mb-5">
        <Link key={id} className="card h-100 m-auto">
          <img src={image} className="card-img-top img-fluid" alt="..." />
          <div className=" flex justify-betwwen">
            <div>
              <p className=" m uppercase">{brand}</p>
              <h5 className="text-xs">{name} </h5>

              <div className="mb-3">
                <p className="price mb-2">
                  <span className="red">{price} </span>&nbsp;{" "}
                  <strike>{price * 2}$</strike>
                </p>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex justify-center">
          <button
            onClick={handleMarkInStock}
            className={`bg-[#008605] text-white p-1 inline-flex rounded-md shadow-md`}
          >
            In Stock
          </button>

          <button
            onClick={handleMarkOutOfStock}
            className={`bg-[#008605] text-white p-1 inline-flex rounded-md shadow-md`}
          >
            Out of Stock
          </button>
        </div>
      </div>
    </>
  );
};

ProductItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductItem;
