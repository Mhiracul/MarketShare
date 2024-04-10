const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    BankName: {
      type: String,
      required: true,
    },
    Email: {
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

const marketShareBank = mongoose.model("marketshare-bank", UserSchema);
module.exports = marketShareBank;
