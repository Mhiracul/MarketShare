/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import PropTypes from "prop-types"; // Import PropTypes

// Create a context for the shopping cart
export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  const defaultCart = {};

  for (const product of products) {
    defaultCart[product.ProductID] = 0; // Use product._id
  }

  return defaultCart;
};

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [totalCartProducts, setTotalCartProducts] = useState(0); // New state for total cart product count

  useEffect(() => {
    console.log("cartItems:", cartItems);
    console.log("products:", products);
  }, [cartItems, products]);
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = () => {
      axios
        .get(`${apiBaseUrl}/products`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log("Fetched products:", response.data);
          setProducts(response.data);

          // Set initial cart items after fetching products
          setCartItems(getDefaultCart(response.data));
          console.log("Initial cartItems:", getDefaultCart(response.data));
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    };

    fetchProducts();
  }, [accessToken]);

  const getTotalCartAmount = () => {
    // Calculate the total amount
    let total = 0;

    for (const productId in cartItems) {
      if (cartItems[productId] > 0) {
        const product = products.find((p) => p._id === productId);
        total += product.ProductPrice * cartItems[productId];
      }
    }

    // Log the total for debugging
    console.log("Total Cart Amount:", total);

    return total;
  };

  // Define functions to manipulate the cart
  const addToCart = (ProductID) => {
    setCartItems((prev) => ({
      ...prev,
      [ProductID]: prev[ProductID] + 1,
    }));
    console.log("Updated cartItems:", cartItems);
    setTotalCartProducts((prevTotal) => prevTotal + 1);
    console.log("Updated cartItems:", cartItems);
  };

  const removeToCart = (ProductID) => {
    setCartItems((prev) => ({
      ...prev,
      [ProductID]: prev[ProductID] - 1,
    }));
    setTotalCartProducts((prevTotal) => prevTotal - 1);
  };

  const updateCartItemCount = (newAmount, ProductID) => {
    setCartItems((prev) => ({
      ...prev,
      [ProductID]: newAmount,
    }));
  };

  const clearCart = () => {
    const updatedCartItems = {};
    for (const productId in cartItems) {
      updatedCartItems[productId] = 0;
    }
    setCartItems(updatedCartItems);
  };

  const resetCart = () => {
    setCartItems(getDefaultCart(products)); // Reset cart items based on the fetched products
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

  const viewProductDetails = (productId) => {
    setSelectedProduct(productId);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  // Set up the context values
  const contextValue = {
    cartItems,
    addToCart,
    removeToCart,
    updateCartItemCount,
    getTotalCartAmount,
    clearCart,
    viewProductDetails,
    closeProductDetails,
    resetCart,
    totalCartProducts,
    selectedProduct,
    products,
    // Make fetched products available through context
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

ShopProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopProvider;
