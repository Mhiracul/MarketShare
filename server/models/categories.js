const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Image: {
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

const marketShareCat = mongoose.model("marketshare-categories", CatSchema);
module.exports = marketShareCat;
