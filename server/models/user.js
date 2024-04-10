const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
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
    Latitude: {
      type: String,
      required: false,
    },
    Longitude: {
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
    Active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const marketShareUser = mongoose.model("marketshare-user", UserSchema);
module.exports = marketShareUser;
