import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { apiBaseUrl } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/header";

const formatAsNaira = (amount) => {
  return `₦${amount.toFixed(2)}`;
};
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("token");

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
    /* {
      title: "Order Status",
      dataIndex: "OrderStatus",
      key: "OrderStatus",
    }, */
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
      <Header />
      <ToastContainer />
      <div className="h-full bg-white w-full">
        <div className="py-10 container mx-auto px-10 text-black">
          <h1 className="text-xl font-bold  mb-8 text-wrap text-black uppercase">
            Orders
          </h1>{" "}
          <div>
            <Tab.Group>
              <Tab.List className="flex space-x-4 text-black">
                <Tab
                  className={({ selected }) =>
                    `py-2   outline-none font-bold flex items-center ${
                      selected
                        ? "border-b-4 rounded-sm text-[#008605] outline-none border-[#008605]"
                        : "border-b-4 rounded-sm text-[#CACACA]  border-[#CACACA] "
                    }`
                  }
                >
                  All Orders
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `py-2 px-4 font-bold outline-none flex items-center ${
                      selected
                        ? "border-b-4 rounded-sm text-[#008605] outline-none border-[#008605]"
                        : "border-b-4 rounded-sm text-[#CACACA]  border-[#CACACA] "
                    }`
                  }
                >
                  Pending
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `py-2 px-4 font-bold outline-none flex items-center ${
                      selected
                        ? "border-b-4 rounded-sm text-[#008605] outline-none border-[#008605]"
                        : "border-b-4 rounded-sm text-[#CACACA]  border-[#CACACA] "
                    }`
                  }
                >
                  In Progress
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `py-2 px-4 font-bold outline-none flex items-center ${
                      selected
                        ? "border-b-4 rounded-sm text-[#008605] outline-none border-[#008605]"
                        : "border-b-4 rounded-sm text-[#CACACA]  border-[#CACACA] "
                    }`
                  }
                >
                  Completed
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `py-2 px-4 font-bold outline-none flex items-center ${
                      selected
                        ? "border-b-4 rounded-sm text-[#008605] outline-none border-[#008605]"
                        : "border-b-4 rounded-sm text-[#CACACA]  border-[#CACACA] "
                    }`
                  }
                >
                  Cancelled
                </Tab>
              </Tab.List>

              <div className="mt-4">
                <Tab.Panel>
                  <Table
                    columns={columns}
                    dataSource={orders}
                    className="bg-white uppercase overflow-x-auto w-full rounded-sm py-2"
                  />
                </Tab.Panel>
                <Tab.Panel>
                  <Table
                    columns={columns}
                    dataSource={orders.filter(
                      (order) => order.OrderStatus === "Pending"
                    )}
                    className="bg-white uppercase overflow-x-auto w-full rounded-sm py-2"
                  />
                </Tab.Panel>
                <Tab.Panel>
                  <Table
                    columns={columns}
                    dataSource={orders.filter(
                      (order) => order.OrderStatus === "In Progress"
                    )}
                    className="bg-white uppercase overflow-x-auto w-full rounded-sm py-2"
                  />{" "}
                </Tab.Panel>
                <Tab.Panel>
                  <Table
                    columns={columns}
                    dataSource={orders.filter(
                      (order) => order.OrderStatus === "Delivered"
                    )}
                    className="bg-white uppercase overflow-x-auto w-full rounded-sm py-2"
                  />{" "}
                </Tab.Panel>
                <Tab.Panel>
                  <Table
                    columns={columns}
                    dataSource={orders.filter(
                      (order) => order.OrderStatus === "Cancelled"
                    )}
                    className="bg-white uppercase overflow-x-auto w-full rounded-sm py-2"
                  />{" "}
                </Tab.Panel>
              </div>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
