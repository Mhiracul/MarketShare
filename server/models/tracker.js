const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackerSchema = new Schema(
  {
    OrderId: {
      type: String,
      required: true,
    },
    Latitude: {
      type: String,
      required: true,
    },
    Longitude: {
      type: String,
      required: true,
    },
    TrackerId: {
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

const tracker = mongoose.model("marketshare-tracker", TrackerSchema);
module.exports = tracker;
