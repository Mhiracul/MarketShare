const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productMiddleware = require("./middleware/productMiddleware");
const cart = require("./middleware/carts");
const track = require("./middleware/trackers");
const auth = require("./middleware/auth");
const order = require("./middleware/orders");
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));
const PORT = 5000;

app.get("/api", (req, res) => {
  res.send("server is running");
});

const mongo = process.env.MONGODB_URL;

mongoose
  .connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo connection successful"))
  .catch(() => console.log("Mongo connection failed"));

app.use("/api", productMiddleware);
app.use("/api", auth);
app.use("/api", cart);
app.use("/api", order);
app.use("/api", track);

/*const jwtSecretKey = crypto.randomBytes(32).toString("hex");

console.log(jwtSecretKey); */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
