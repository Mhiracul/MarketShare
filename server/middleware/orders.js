const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../accesstoken");
const marketshare_order = require("../models/Order");
const products = require("../models/product");
const Cart = require("../models/cart");

router.post(
  "/user/create_orders",
  authenticateToken,
  async (req, res, next) => {
    const {
      Products,
      OrderId,
      PaymentMethod,
      TotalAmount,
      Subtotal,
      DeliveryCharge,
      OrderStatus,
      OrderTime,
      Customer,
    } = req.body;

    console.log("Request Body boy");
    console.log(OrderStatus);
    console.log(DeliveryCharge);
    console.log(OrderTime);

    const customers = Customer;
    console.log(customers);
    var products = Products;
    console.log(products);
    console.log(customers.email);

    products.forEach(myFunction);

    console.log("printed in orders now..");
    const orders = new marketshare_order({
      OrderId,
      Products: products,
      PaymentMethod,
      TotalAmount,
      Subtotal,
      DeliveryCharge,
      OrderStatus,
      OrderTime,
      Customer: customers,
      isDeleted: false,
    });

    orders
      .save()
      .then(async (result) => {
        const filter = { Email: customers.email };
        const update = { Status: "Bought" };
        await Cart.updateMany(filter, update);
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }
);

myFunction = async (item, index, arr) => {
  console.log(item.ProductID);

  const update = {
    $inc: { ProductRating: 1 },
    $inc: { Stock: -1 },
  };

  const filter = { ProductID: item.ProductID };
  await products.findOneAndUpdate(filter, update);
};

router.get("/user/orders", authenticateToken, async (req, res, next) => {
  const Email = req.user.Email;

  try {
    const orders = await marketshare_order.find({ "Customer.email": Email });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/user/order", async (req, res, next) => {
  try {
    // Retrieve all orders from the database
    const orders = await marketshare_order.find();

    // Return the orders as JSON
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/user/order/delete", authenticateToken, async (req, res, next) => {
  try {
    let Email = req.body.Email;
    let OrderId = req.body.OrderId;

    const result = await marketshare_order.deleteOne({
      Email: Email,
      OrderId: OrderId,
    });

    if (result.deletedCount > 0) {
      // The item was deleted successfully
      res.status(200).send("Item deleted");
    } else {
      // The item was not found
      res.status(404).send("Item not found");
    }
  } catch (err) {
    // Handle any errors that occurred during the delete operation
    console.error("Error deleting item from order:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
