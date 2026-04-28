const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Cart = require("./models/Cart");
const fetchUser = require("./middleware/fetchUser");

dotenv.config();

const app = express();
const port = process.env.PORT || 4003;
let isDbConnected = false;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    isDbConnected = true;
    console.log("Cart DB connected");
  })
  .catch((error) => {
    isDbConnected = false;
    console.error("Cart DB connection failed", error.message);
  });

const buildEmptyCart = () => {
  const cart = {};
  for (let i = 0; i < 300; i += 1) {
    cart[i] = 0;
  }
  return cart;
};

app.get("/", (req, res) => {
  res.json({ success: true, service: "cart-service" });
});

app.get("/health", (req, res) => {
  res.status(isDbConnected ? 200 : 503).json({
    success: isDbConnected,
    service: "cart-service",
    db: isDbConnected ? "connected" : "disconnected",
  });
});

app.post("/init-cart", async (req, res) => {
  if ((req.header("x-internal-key") || "") !== (process.env.INTERNAL_SERVICE_KEY || "")) {
    return res.status(403).json({ success: false, errors: "forbidden" });
  }

  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ success: false, errors: "userId is required" });
  }

  const existing = await Cart.findOne({ userId });
  if (!existing) {
    await Cart.create({ userId, cartData: buildEmptyCart() });
  }

  res.json({ success: true });
});

app.post("/addtocart", fetchUser, async (req, res) => {
  let userCart = await Cart.findOne({ userId: req.user.id });
  if (!userCart) {
    userCart = await Cart.create({ userId: req.user.id, cartData: buildEmptyCart() });
  }
  userCart.cartData[req.body.itemId] += 1;
  await Cart.findOneAndUpdate({ userId: req.user.id }, { cartData: userCart.cartData });
  res.send("Added");
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  const userCart = await Cart.findOne({ userId: req.user.id });
  if (!userCart) {
    return res.send("Removed");
  }
  if (userCart.cartData[req.body.itemId] > 0) {
    userCart.cartData[req.body.itemId] -= 1;
  }
  await Cart.findOneAndUpdate({ userId: req.user.id }, { cartData: userCart.cartData });
  res.send("Removed");
});

app.post("/getcart", fetchUser, async (req, res) => {
  const userCart = await Cart.findOne({ userId: req.user.id });
  res.json(userCart ? userCart.cartData : buildEmptyCart());
});

app.listen(port, () => {
  console.log(`Cart service running on port ${port}`);
});
