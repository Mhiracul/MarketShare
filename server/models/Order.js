const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    OrderId: {
      type: String,
      required: true,
    },
    Customer: {
      name: String,
      email: String,
      phone: String,
      city: String,
      latitude: String,
      longitude: String,
    },
    Logistics: {
      bizname: String,
      email: String,
      details: String,
      image: String,
      phone: String,
      city: String,
      BankName: String,
      Bank: String,
      Account: String,
    },
    Agent: {
      name: String,
      email: String,
      phone: String,
      city: String,
      image: String,
      BankName: String,
      Bank: String,
      Account: String,
    },
    OrderTime: {
      type: String,
      required: true,
    },
    OrderStatus: {
      type: String,
      required: true,
    },
    AddittionalInfo: {
      type: String,
      required: false,
    },
    DeliveryCharge: {
      type: Number,
      required: true,
    },
    Subtotal: {
      type: Number,
      required: true,
    },
    TotalAmount: {
      type: Number,
      required: true,
    },
    PaymentMethod: {
      type: String,
      required: true,
    },
    Rating: {
      Rating: Number,
      Comment: String,
    },
    Products: [],
    isDeleted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const marketshare_order = mongoose.model("marketshare-order", OrderSchema);
module.exports = marketshare_order;
