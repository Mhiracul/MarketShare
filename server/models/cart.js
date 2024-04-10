const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    ProductID: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    ProductName: {
      type: String,
      required: true,
    },
    ProductPrice: {
      type: Schema.Types.Number,
      required: true,
    },
    ProductImage: {
      type: String,
      required: true,
    },
    Quantity: {
      type: Schema.Types.Number,
      required: true,
    },
    Status: {
      type: String,
      required: true,
    },
    VendorEmail: {
      type: String,
      required: true,
    },
    VendorName: {
      type: String,
      required: true,
    },
    VendorPhone: {
      type: String,
      required: true,
    },
    VendorMarket: {
      type: String,
      required: true,
    },
    BankName: {
      type: String,
      required: true,
    },
    Bank: {
      type: String,
      required: true,
    },
    Account: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("marketshare-cart", CartSchema);
module.exports = Cart;
