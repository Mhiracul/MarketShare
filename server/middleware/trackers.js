const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../accesstoken");
const tracker = require("../models/tracker");

router.post(
  "/user/order/tracker",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { OrderId } = req.body;
      const response = await tracker.findOne({ OrderId: OrderId }).exec();

      if (!response) {
        console.error(`Tracking information not found for OrderId: ${OrderId}`);
        return res.status(404).send("Tracking information not found");
      }

      return res.status(200).send(response);
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
