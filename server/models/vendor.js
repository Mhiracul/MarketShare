const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    BizName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    Category: {
      type: String,
      required: false,
    },
    Email: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: Number,
      required: false,
    },
    Country: {
      type: String,
      required: false,
    },
    City: {
      type: String,
      required: false,
    },
    Address: {
      type: String,
      required: false,
    },
    Password: {
      type: String,
      required: true,
    },
    Logo: {
      type: String,
      required: false,
    },
    Token: {
      type: String,
      required: true,
    },
    ResetToken: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
    Verified: {
      type: Boolean,
      required: true,
    },
    UserType: {
      type: String,
      required: true,
    },
    Market: {
      type: String,
      required: false,
    },
    Url: {
      type: String,
      required: false,
    },
    CarDetails: {
      type: String,
      required: false,
    },
    BankDetails: {
      type: Boolean,
      required: true,
    },
    Strike: {
      type: Number,
      required: false,
    },
    Raters: {
      type: Number,
      required: false,
    },
    Rating: {
      type: Number,
      required: false,
    },
    Active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const marketShareVendor = mongoose.model("marketshare-vendor", VendorSchema);
module.exports = marketShareVendor;
