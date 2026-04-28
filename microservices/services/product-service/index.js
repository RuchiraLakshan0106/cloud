const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Product = require("./models/Product");

dotenv.config();

const app = express();
const port = process.env.PORT || 4002;
let isDbConnected = false;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    isDbConnected = true;
    console.log("Product DB connected");
  })
  .catch((error) => {
    isDbConnected = false;
    console.error("Product DB connection failed", error.message);
  });

app.get("/", (req, res) => {
  res.json({ success: true, service: "product-service" });
});

app.get("/health", (req, res) => {
  res.status(isDbConnected ? 200 : 503).json({
    success: isDbConnected,
    service: "product-service",
    db: isDbConnected ? "connected" : "disconnected",
  });
});

app.post("/addproduct", async (req, res) => {
  const products = await Product.find({});
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    description: req.body.description || "",
    image: req.body.image,
    category: req.body.category,
    new_Price: req.body.new_price,
    old_Price: req.body.old_price,
  });

  await product.save();
  res.json({ success: true, name: req.body.name });
});

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
});

app.get("/allproduct", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.get("/newcollection", async (req, res) => {
  const products = await Product.find({});
  const newCollection = products.slice(1).slice(-4);
  res.send(newCollection);
});

app.get("/popularinwoman", async (req, res) => {
  const products = await Product.find({ category: "women" });
  const popularInWoman = products.slice(0, 4);
  res.send(popularInWoman);
});

app.listen(port, () => {
  console.log(`Product service running on port ${port}`);
});
