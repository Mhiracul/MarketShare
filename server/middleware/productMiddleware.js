const express = require("express");
const userModel = require("../models/user");
const { authorizeAdmin } = require("../middleware/authMiddleware");
const { authenticateToken } = require("../accesstoken");
const productModel = require("../models/product");
const products = require("../models/product");
const marketShareCat = require("../models/categories");
const router = express.Router();

router.post(
  "/admin/uploadProduct",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    console.log(req.body);
    const data = await productModel(req.body);
    const datasave = await data.save();
    console.log(datasave);

    res.send({ message: "Upload successfully" });
  }
);
router.get("/products", async (req, res) => {
  const data = await products.find({});
  res.send(JSON.stringify(data));
});

router.get("/marketshare/categories/all", async (req, res, next) => {
  const data = await marketShareCat.find({});
  res.status(200).send(data);
});

router.post("/user/product/find", async (req, res, next) => {
  try {
    const { text } = req.body;

    // Use await and Promises to execute the query and await the result
    const obj = await products
      .find({ ProductName: { $regex: new RegExp(text, "i") } })
      .limit(100)
      .sort([["updatedAt", "descending"]]);

    // Send the result as a response
    res.status(200).send(obj);
  } catch (error) {
    // Handle any errors that might occur during the query
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.get(
  "/admin/products",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const data = await productModel.find({});
    res.send(JSON.stringify(data));
  }
);

// Update product status route
router.put(
  "/admin/products/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const productId = req.params.id; // Use req.params.id to access the route parameter
    const { status } = req.body;

    try {
      console.log("Received productId:", productId); // Log the productId for debugging

      // Find the product by ID
      const product = await productModel.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update the product's status
      product.status = status;

      // Save the updated product
      await product.save();

      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

module.exports = router;
