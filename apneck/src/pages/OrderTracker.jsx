import { useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import TrackTop from "../components/TrackTop";

const OrderTracker = () => {
  const [orderId, setOrderId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("token");

  const handleOrderIdChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleFetchTrackingInfo = () => {
    // Make a POST request to your Express.js backend
    axios
      .post(
        `${apiBaseUrl}/user/order/tracker`,
        { OrderId: orderId }, // Corrected the curly braces here
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setTrackingInfo(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching tracking info:", error);
        setTrackingInfo(null);
        setError("Tracking information not found");
      });
  };
  return (
    <div>
      <TrackTop />
      <div className="py-10 px-20">
        <h2 className="mb-3">Order Tracking</h2>
        <div className="flex flex-col">
          <label htmlFor="orderId">Enter Order ID:</label>
          <input
            type="text"
            id="orderId"
            value={orderId}
            onChange={handleOrderIdChange}
            className="py-3 px-2"
          />
          <button onClick={handleFetchTrackingInfo}>Fetch Tracking Info</button>
        </div>
        {error && <p>Error: {error}</p>}
        {trackingInfo && (
          <div>
            <h3>Tracking Information</h3>
            <p>Order ID: {trackingInfo.OrderId}</p>
            <p>Latitude: {trackingInfo.Latitude}</p>
            <p>Longitude: {trackingInfo.Longitude}</p>
            {/* Display other tracking information as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracker;
