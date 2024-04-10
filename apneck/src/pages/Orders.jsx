import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { apiBaseUrl } from "../../config";
import OrderTop from "../components/OrderTop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import logo from "../assets/images/products/marketsare.png";
//import { useSelector } from "react-redux";
//import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

const formatAsNaira = (amount) => {
  return `₦${amount.toFixed(2)}`;
};

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("token");
  //const user = useSelector((state) => state.user);

  /* const config = {
    public_key: "FLWPUBK-ee61e60d4533ac80a770e176b9dc5360-X",
    tx_ref: "", // This will be set later
    amount: 0, // This will be set later
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

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    tx_ref: "", // Set this to your order ID or a unique reference
    amount: 0, // Set this to the total amount of the order
    callback: (response) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
      if (response.status === "completed") {
        // Payment was successful, you can implement further logic here
      } else {
        // Payment was not successful, handle accordingly
      }
    },
    onClose: () => {},
  }; */

  useEffect(() => {
    // Make an HTTP GET request to fetch user orders
    axios
      .get(`${apiBaseUrl}/user/orders`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const formattedOrders = response.data.map((order) => ({
          ...order,
          OrderTime: new Date(order.OrderTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        }));
        setOrders(formattedOrders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, [accessToken]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "OrderId",
      key: "OrderId",
    },
    {
      title: "Order Time",
      dataIndex: "OrderTime",
      key: "OrderTime",
    },
    {
      title: "Payment Method",
      dataIndex: "PaymentMethod",
      key: "PaymentMethod",
    },
    {
      title: "Total Amount",
      dataIndex: "TotalAmount",
      key: "TotalAmount",
      render: (amount) => formatAsNaira(amount), // Format as Naira
    },
    {
      title: "Order Status",
      dataIndex: "OrderStatus",
      key: "OrderStatus",
    },
    {
      title: "Actions",
      key: "Actions",
      render: (text, record) => (
        <div className="flex gap-2">
          <button
            type="danger"
            onClick={() => handleDeleteOrder(record.OrderId, record.Email)}
            className="text-white ml-3 text-xs md:text-sm"
          >
            Delete
          </button>
          {/* <FlutterWaveButton
  className="text-white ml-3 text-xs md:text-sm"
  {...fwConfig}
  tx_ref={record.OrderId} // Set the order ID here
  amount={record.TotalAmount}
>
  Pay
</FlutterWaveButton> */}
        </div>
      ),
    },
    // Add more columns as needed
  ];

  const handleDeleteOrder = (orderId, email) => {
    // Send an HTTP POST request to delete the order
    axios
      .post(
        `${apiBaseUrl}/user/order/delete`,
        { Email: email, OrderId: orderId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // Order was deleted successfully, remove it from the local state
          toast.success("Order Deleted Successfully");
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order.OrderId !== orderId)
          );
        } else {
          console.error("Failed to delete order.");
        }
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ToastContainer />
      <OrderTop />
      <div className="px-4 md:px-20 py-8">
        <div className="bg-white p-4 md:p-8 overflow-x-auto w-full">
          <h3 className="mb-4 text-2xl md:text-3xl font-bold">My Orders</h3>
          <p className="text-[#555555]">
            Your recent orders are displayed in the table below.
          </p>

          <Table
            columns={columns}
            dataSource={orders}
            className="bg-white uppercase overflow-x-auto w-full rounded-sm py-2"
          />
        </div>
      </div>
    </>
  );
};

export default UserOrders;
