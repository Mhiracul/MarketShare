const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    ProductID: {
      type: String,
      required: true,
    },
    ProductName: {
      type: String,
      required: true,
    },
    ProductDesc: {
      type: String,
      required: true,
    },
    ProductRating: {
      type: Schema.Types.Number,
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
    Stock: {
      type: Schema.Types.Number,
      required: true,
    },
    StockKG: {
      type: Schema.Types.Number,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "marketshare-vendor", // Reference to Vendor Model
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const products = mongoose.model("marketshare-product", ProductSchema);
module.exports = products;
