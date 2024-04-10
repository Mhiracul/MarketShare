/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import SubTotal from "../components/SubTotal";
import { useNavigate } from "react-router-dom";
import shop from "../assets/images/products/shopping-bag.png";
import { ShopContext } from "../components/shopcontext";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/header";

const Cart = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("token");

  const {
    // Define setCartItems
    cartItems,
    getTotalCartProducts,

    removeToCart,
    updateCartItemCount,
  } = useContext(ShopContext);
  const [cart, setCart] = useState([]);

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((cartItem) => {
      total += cartItem.ProductPrice * cartItem.Quantity;
    });
    return total;
  };

  // Use the calculated total amount
  const totalAmount = calculateTotalAmount();

  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const handleResize = () => {
    if (window.innerWidth < 576) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCheckoutClick = () => {
    // Check if the user is logged in (you should replace this with your actual login logic)
    const isLoggedIn = true; // Simulated here; replace with actual logic
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    // Check if user and accessToken are available
    if (user && accessToken) {
      // Log the Email parameter before making the API request
      console.log("Fetching cart data for Email:", user.Email);

      // Make the API request to fetch cart data
      axios
        .get(`${apiBaseUrl}/user/cart`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            Email: user.Email,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const cartData = response.data;
            console.log("Fetched Cart Data:", cartData); // Log the fetched data

            // Check if cartData is an array with items
            if (Array.isArray(cartData) && cartData.length > 0) {
              setCart(cartData);
            } else {
              // Handle the case where cartData is empty or not an array
              console.error("Cart data is empty or not an array:", cartData);
            }
          } else {
            // Handle unexpected response status
            console.error("Unexpected response status:", response.status);
            // Set cart to an empty array to prevent 'map of undefined' error
            setCart([]);
          }
        })
        .catch((error) => {
          // Handle API request errors
          console.error("API Request Error:", error);
          // Set cart to an empty array to prevent 'map of undefined' error
          setCart([]);
        });
    }
  }, [user, accessToken]);
  // ...

  // ...

  const handleDeleteCartItem = (productId) => {
    // Update the local cart state to remove the item
    const updatedCart = cart.filter(
      (cartItem) => cartItem.ProductID !== productId
    );
    setCart(updatedCart);

    // Send a DELETE request to remove the item from the cart
    axios
      .post(
        `${apiBaseUrl}/user/cart/delete`,
        {
          Email: user.Email,
          ProductId: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // The DELETE request was successful
        console.log("Item deleted from cart:", response.data);
        toast.success("Item deleted from cart", {
          position: "top-right",
          autoClose: 2000, // Close the notification after 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        // An error occurred while deleting the item
        console.error("Error deleting item from cart:", error);
      });
  };

  const handleClearCart = () => {
    setCart([]);

    // Prepare the request headers with the authorization token
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json", // Set the content type if needed
    };

    // Send a POST request to clear the entire cart
    axios
      .post(
        `${apiBaseUrl}/user/cart/clear`,
        {
          Email: user.Email,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        // Update the cart state or perform any necessary actions
        console.log("Cart cleared:", response.data);
        toast.success("Cart cleared", {
          position: "top-right",
          autoClose: 2000, // Close the notification after 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        console.error("Error clearing cart:", error);
        // Handle the error here, e.g., show an error message to the user
        toast.error("Error clearing cart", {
          position: "top-right",
          autoClose: 2000, // Close the notification after 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  const handleIncreaseQuantity = (productId) => {
    // Find the cart item that needs to be updated
    const updatedCart = [...cart]; // Create a copy of the cart array
    const cartItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.ProductID === productId
    );

    if (cartItemIndex !== -1) {
      // Increment the quantity locally
      updatedCart[cartItemIndex].Quantity++;

      // Send a PUT request to update the quantity
      axios
        .put(
          `${apiBaseUrl}/user/cart/quantity`,
          {
            Quantity: updatedCart[cartItemIndex].Quantity,
            Email: user.Email,
            ProductId: productId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          // The PUT request was successful
          console.log("Quantity updated:", response.data);

          // Update the local state with the updated cart
          setCart(updatedCart);

          // You may want to add a success toast here if needed
          toast.success("Quantity updated", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating quantity:", error);
        });
    }
  };

  const handleDecreaseQuantity = (productId) => {
    // Find the cart item that needs to be updated
    const updatedCart = [...cart]; // Create a copy of the cart array
    const cartItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.ProductID === productId
    );

    if (cartItemIndex !== -1) {
      // Increment the quantity locally
      if (updatedCart[cartItemIndex].Quantity > 1) {
        updatedCart[cartItemIndex].Quantity--;
        // Send a PUT request to update the quantity
        axios
          .put(
            `${apiBaseUrl}/user/cart/quantity`,
            {
              Quantity: updatedCart[cartItemIndex].Quantity,
              Email: user.Email,
              ProductId: productId,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            // The PUT request was successful
            console.log("Quantity updated:", response.data);

            // Update the local state with the updated cart
            setCart(updatedCart);

            // You may want to add a success toast here if needed
            toast.success("Quantity updated", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          })
          .catch((error) => {
            // Handle error
            console.error("Error updating quantity:", error);
          });
      }
    }
  };

  const [currency, setCurrency] = useState("Naira"); // Default to Naira

  useEffect(() => {
    // Use the Geolocation API to get the user's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // Use latitude and longitude to determine the user's location
        // You can implement your logic to determine if the user is in Ghana
        // For this example, I'll assume a simple check if the latitude is within a certain range
        const isInGhana = latitude >= 7.0 && latitude <= -1;

        // Set the currency based on the user's location
        if (isInGhana) {
          setCurrency("₵");
        } else {
          setCurrency("₦");
        }
      });
    }
  }, []);
  return (
    <>
      <Header />
      <ToastContainer />

      <section className="  w-full">
        <div className="container mx-auto px-10">
          <div className="">
            <div className=" text-left">
              <div className="">
                <h1 className="text-black mt-2">
                  <b className="text-2xl text-[#373737]">Cart</b>
                </h1>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 py-2 md:mt-6 md:gap-6 2xl:mt-[1.875rem] 2xl:gap-[1.875rem] mx-auto md:px-20 px-2 ">
            <section className="cart bg-[#FFFFFF]  col-span-12 xl:col-span-8 ">
              <div className="container-xxl p-5">
                {cart && cart.length > 0 ? (
                  <div className="row border ">
                    <div className="table-responsive">
                      <table className="table ">
                        <thead>
                          <tr className="uppercase text-sm">
                            <th></th>
                            <th className="text-left shadow-md uppercase  px-4 py-2">
                              Product
                            </th>
                            <th className="text-left shadow-md uppercase  px-4 py-2">
                              Price
                            </th>
                            <th className="text-left shadow-md uppercase  px-4 py-2">
                              Quantity
                            </th>
                            <th className="text-left shadow-md uppercase  px-4 py-2">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="horizontal-row">
                          {cart.map((cartItem) => (
                            <tr key={cartItem.ProductID}>
                              <td>
                                <div className="container ">
                                  <div className="">
                                    <div className="">
                                      <div className="p-3">
                                        <div className="cart-item-image m-auto">
                                          <img
                                            src={cartItem.ProductImage}
                                            className="card-img-top img-fluid"
                                            alt="..."
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="md:font-bold font-medium md:text-xs text-xs px-4 py-2 align-middle text-[#008605]">
                                {cartItem.ProductName}
                              </td>
                              <td className="md:font-bold font-medium md:text-sm text-xs px-4 py-2 align-middle text-[#008605]">
                                {currency}
                                {cartItem.ProductPrice}
                              </td>
                              <td className="md:font-light font-light md:text-sm text-xs px-4 py-2 align-middle text-[#008605]">
                                <div className="count-handler">
                                  <button
                                    className="rounded-full shadow-sm shadow-[#ccc] border-none"
                                    onClick={() =>
                                      handleIncreaseQuantity(cartItem.ProductID)
                                    }
                                  >
                                    +
                                  </button>
                                  <input
                                    className="form-control rounded-none text-xs"
                                    value={cartItem.Quantity}
                                    onChange={(e) =>
                                      updateCartItemCount(
                                        Number(e.target.value),
                                        cartItem.ProductID
                                      )
                                    }
                                  />
                                  <button
                                    className="rounded-full shadow-sm shadow-[#ccc]"
                                    onClick={() =>
                                      handleDecreaseQuantity(cartItem.ProductID)
                                    }
                                  >
                                    -
                                  </button>
                                </div>
                              </td>
                              <td
                                className="font-bold px-4 py-2 align-middle text-[#008605]"
                                onClick={() =>
                                  handleDeleteCartItem(cartItem.ProductID)
                                }
                              >
                                <AiOutlineDelete size={20} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <div className=" text-sm">
                        <button
                          onClick={() => navigate("/shop")}
                          className="text-xs px-2 py-1 rounded-none"
                        >
                          {isMobile ? "Continue" : "Continue Shopping"}
                        </button>
                      </div>
                      <div>
                        {" "}
                        <b>
                          {currency}
                          {totalAmount.toFixed(2)}
                        </b>
                      </div>
                      <div className=" text-white text-end">
                        <button
                          onClick={() => handleClearCart()}
                          id="clear-cart"
                          className="px-2 py-1 rounded-none"
                        >
                          {" "}
                          Clear Cart{" "}
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-12 col-md-6 total m-auto d-flex flex-column p-5">
                        <div className="col-12"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="container-xxl">
                    <div className="row">
                      <div className="flex items-center justify-center">
                        <img src={shop} alt="" />
                      </div>
                      <div className="text-center p-1 mb-4">
                        <h2 className="text-black text-sm">
                          No item in your cart
                        </h2>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
            <SubTotal
              totalAmount={parseFloat(totalAmount)}
              currency={currency} // Pass the currency as a prop
              onCheckout={handleCheckoutClick}
            />
          </div>
          {/* Pass totalAmount as a prop */}
        </div>
      </section>
    </>
  );
};

export default Cart;
