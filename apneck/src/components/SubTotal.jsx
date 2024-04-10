import PropTypes from "prop-types";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import logo from "../assets/images/products/marketsare.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const SubTotal = ({ totalAmount, currency, onCheckout }) => {
  const shippingCost = 0; // Define the shipping cost
  const totalAmountWithShipping = totalAmount + shippingCost;
  const [cart, setCart] = useState([]);
  const accessToken = localStorage.getItem("token");
  const user = useSelector((state) => state.user);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const config = {
    public_key: "FLWPUBK-ee61e60d4533ac80a770e176b9dc5360-X",
    tx_ref: Date.now().toString(),
    amount: totalAmountWithShipping,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user.Email,
      phone_number: user.PhoneNumber,
      name: user.Name,
    },
    customizations: {
      title: "MarketShare",
      description: "Payment for items in cart",
      logo: logo,
    },
  };

  useEffect(() => {
    // Check if geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          // Handle geolocation error, display an error message, etc.
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
      // Handle the case where geolocation is not supported.
    }
  }, []);

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
  const handleFlutterPayment = useFlutterwave(config);
  const handlePayment = () => {
    console.log("Handling payment...");

    const orderID = generateRandomOrderID();
    const paymentMethod = "Flutterwave"; // Set a default payment method

    const orderData = {
      orderID,
      Products: cart,
      OrderId: orderID,
      PaymentMethod: paymentMethod,
      TotalAmount: totalAmountWithShipping,
      Subtotal: totalAmount,
      DeliveryCharge: shippingCost,
      OrderStatus: "Pending",
      OrderTime: new Date().toISOString(),
      Customer: {
        email: user.Email,
        phone: user.PhoneNumber,
        name: user.Name,
        city: user.City,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
    };

    // Save the order to the database immediately
    saveOrderToDatabase(orderData);

    handleFlutterPayment({
      callback: (response) => {
        console.log("Payment response:", response);

        console.log(response);
        closePaymentModal();

        if (response.status === "completed") {
          // Payment was successful
        }
        clearCartOnBackend();

        if (onCheckout) {
          onCheckout();
        }
      },
      onClose: () => {},
    });
  };

  const saveOrderToDatabase = (orderData) => {
    console.log("Saving order to the database...");
    console.log("Order Data", orderData);

    axios
      .post(`${apiBaseUrl}/user/create_orders`, orderData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Handle the response from the backend
        console.log("Order saved to the database:", response.data);
        // You can also notify the user that the order was successfully placed
        console.log("Order Data:", orderData);
      })
      .catch((error) => {
        console.error("Error saving order to the database:", error);
        // Handle any errors that occur during the save process
      });
  };

  const generateRandomOrderID = () => {
    // Generate a random order ID as an 8-digit number
    const orderID = Math.floor(10000000 + Math.random() * 90000000);
    return orderID.toString(); // Convert it to a string
  };

  const clearCartOnBackend = () => {
    // Send a DELETE request to clear the entire cart
    axios
      .post(`${apiBaseUrl}/user/cart/clear`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
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
      });
  };
  return (
    <div className="bg-white col-span-12 xl:col-span-4 lg:h-1/2 md:h-full h-full mb-3">
      <div className="p-1 bg-white">
        <h1 className="text-2xl font-bold text-black uppercase">Checkout</h1>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-bold text-black">Subtotal</p>
            <span className="text-[#008605] text-[17px] font-semibold">
              {currency}
              {totalAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[16px] font-bold text-black">Shipping Fees</p>
            <span className="text-[#008605] text-[17px] font-semibold">
              {currency}
              {shippingCost.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col gap-1 py-2">
            {" "}
            <h1 className="text-sm uppercase">Delivery Address</h1>
            <p className="text-[#B50000] text-xs">
              Please select a delivery address
            </p>
          </div>

          <p className="text-[#B50000] text-xs">
            We encourage you to review our refund policy , be reminded that by
            placing an order with us , you acknowledge an accept our policy.
          </p>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="agreeCheckbox" />
            <label htmlFor="agreeCheckbox" className="text-[#000] text-xs">
              I agree to Marketshare’s{" "}
              <span className="text-[#B50000]">Terms</span> and{" "}
              <span className="text-[#B50000]">return policy</span>.
            </label>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[16px] font-bold text-black">Total (Inc. VAT)</p>
            <span className="text-[#008605] text-[17px] font-semibold">
              {currency}
              {totalAmountWithShipping.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <button
        className="text-white rounded-none w-full"
        onClick={handlePayment}
      >
        Checkout
      </button>
    </div>
  );
};

SubTotal.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  onCheckout: PropTypes.func,
};

export default SubTotal;
