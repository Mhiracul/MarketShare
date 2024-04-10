const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IaddressSchema = new Schema(
  {
    CreatorEmail: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Landmark: {
      type: String,
      required: false,
    },
    State: {
      type: String,
      required: true,
    },
    Country: {
      type: String,
      required: false,
    },
    Default: {
      type: Boolean,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Iaddress = mongoose.model("isabi-address", IaddressSchema);
module.exports = Iaddress;
