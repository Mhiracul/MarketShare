// Example routes for adding and retrieving cart items
const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const { authenticateToken } = require("../accesstoken");
const userModel = require("../models/user");
const productModel = require("../models/product");
const marketShareBank = require("../models/bank");
const marketShareVendor = require("../models/vendor");
const products = require("../models/product");
const Iaddress = require("../models/address");

router.post("/user/post/cart", authenticateToken, async (req, res, next) => {
  try {
    console.log("Received request to add to cart:", req.body);

    const {
      ProductID,
      ProductName,
      Email,
      ProductPrice,
      ProductImage,
      Quantity,
      Status,
      VendorEmail,
      VendorName,
      VendorPhone,
      VendorMarket,
    } = req.body;

    console.log("Request Body:", req.body); // Log the request body

    const response = await marketShareVendor.findOne({ Email: VendorEmail });
    console.log("Response from database:", response); // Add this line for debugging

    if (!response) {
      return res.status(501).send("Vendor not found");
    }

    if (!response.Active) {
      return res.status(501).send("This vendor is not active at the moment");
    }

    const bankList = await marketShareBank.find({ Email: VendorEmail });

    const existingCartItem = await Cart.findOne({
      Email: Email,
      Status: "Pending",
      ProductID: ProductID,
    });

    if (existingCartItem) {
      // If the item already exists, increment its Quantity
      await Cart.findOneAndUpdate(
        { Email: Email, Status: "Pending", ProductID: ProductID },
        { $inc: { Quantity: 1 } }
      );
      console.log("Cart item saved successfully"); // Log this for debugging

      return res
        .status(200)
        .send({ status: "success", message: "Cart data saved successfully" });
    } else {
      // If the item does not exist, create a new cart item
      const cart = new Cart({
        ProductID,
        ProductName, // Use the product details
        Email,
        ProductPrice,
        ProductImage,
        Quantity,
        Status,
        VendorEmail,
        VendorName, // Use the product vendor details
        VendorMarket,
        VendorPhone,
        BankName: bankList[0].BankName,
        Bank: bankList[0].Bank,
        Account: bankList[0].Account,
        isDeleted: false,
      });

      const result = await cart.save();
      if (!result) {
        console.error("Error saving cart item to the database.");
        return res.status(500).send({ message: "Error saving cart item" });
      }

      return res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// Example of an endpoint to fetch all cart marketshare items
router.get("/cart/all", async (req, res, next) => {
  try {
    // Query the database to retrieve all cart items
    const cartItems = await Cart.find({ Status: "Pending" });

    // Return the cart items in the response
    res.status(200).json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/user/cart", authenticateToken, async (req, res, next) => {
  try {
    const { Email } = req.query;

    const cart = await Cart.find({ Email: Email, Status: "Pending" });

    return res.status(200).json(cart);
  } catch (err) {
    // Handle errors here
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/user/cart/total", authenticateToken, async (req, res, next) => {
  try {
    const { Email } = req.query;

    const cartItems = await Cart.find({ Email, Status: "Pending" });

    // Calculate the total number of products in the cart
    const totalProductsInCart = cartItems.reduce(
      (total, cartItem) => total + cartItem.Quantity,
      0
    );

    return res.status(200).json({ totalProductsInCart });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

//Delete one item from cart
router.post("/user/cart/delete", authenticateToken, async (req, res, next) => {
  try {
    let Email = req.body.Email;
    let ProductId = req.body.ProductId;

    const result = await Cart.deleteOne({ Email: Email, ProductID: ProductId });

    if (result.deletedCount > 0) {
      // The item was deleted successfully
      res.status(200).send("Item deleted");
    } else {
      // The item was not found
      res.status(404).send("Item not found");
    }
  } catch (err) {
    // Handle any errors that occurred during the delete operation
    console.error("Error deleting item from cart:", err);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE route to clear the entire cart
router.post("/user/cart/clear", authenticateToken, async (req, res, next) => {
  try {
    let Email = req.body.Email;

    const result = await Cart.deleteMany({ Email: Email });

    if (result.deletedCount > 0) {
      // Items were deleted successfully
      res.status(200).send("Cart cleared");
    } else {
      // The cart was already empty
      res.status(200).send("Cart is already empty");
    }
  } catch (err) {
    // Handle any errors that occurred during the delete operation
    console.error("Error clearing cart:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/user/cart/quantity", authenticateToken, async (req, res) => {
  try {
    const { Email, ProductId, Quantity } = req.body;

    // Find the cart document for the user
    const cart = await Cart.findOne({ Email: Email, ProductID: ProductId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const cartItem = cart; // Since you found the cart, you don't need to search in an array

    // Update the quantity for the item
    cartItem.Quantity = Quantity;

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: "Quantity updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/*router.post("/user/find/all_vendors_cat", async (req, res, next) => {
  let { Category, City } = req.body;

  let vendors = await marketShareVendor.aggregate([
    { $sample: { size: 100 } },
    {
      $match: {
        City: City,
        Category: Category,
      },
    },
  ]);

  res.status(200).send(vendors);
});
*/
router.post("/user/find/all_vendors_cat", async (req, res, next) => {
  const { Category, City } = req.body;

  try {
    // First, find vendors by category and city
    const vendors = await marketShareVendor.find({ Category, City });

    if (!vendors.length) {
      return res
        .status(404)
        .json({ message: "Vendors not found for the given category and city" });
    }

    // Extract vendor names from the result
    const vendorNames = vendors.map((vendor) => vendor.Name);

    // Then, find products associated with these vendors
    const vendorProducts = await products.find({
      "Vendor.name": { $in: vendorNames },
    });

    res.status(200).json({ vendors, products: vendorProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/user/find/products_by_vendor_name", async (req, res, next) => {
  const { vendorName } = req.body;

  try {
    // Find the vendor by name
    const vendor = await marketShareVendor.findOne({ Name: vendorName });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Find products associated with the vendor
    const vendorProducts = await products.find({ "Vendor.name": vendor.Name });

    res.status(200).json({ vendor, products: vendorProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/user/find/all_vendors_with_products", async (req, res, next) => {
  try {
    // Find all vendors
    const vendors = await marketShareVendor.find();

    // Populate products for each vendor
    const vendorsWithProducts = await Promise.all(
      vendors.map(async (vendor) => {
        const product = await products.find({ vendor: vendor._id });
        return { vendor, product };
      })
    );

    res.status(200).json(vendorsWithProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const getAllAddresses = async () => {
  try {
    // Use the find() method to retrieve all addresses
    const addresses = await Iaddress.find();
    return addresses;
  } catch (error) {
    // Handle error
    console.error("Error fetching addresses:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
router.get("/address", async (req, res) => {
  try {
    // Call the function to get all addresses
    const addresses = await getAllAddresses();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch addresses" });
  }
});
// ...

module.exports = router;
