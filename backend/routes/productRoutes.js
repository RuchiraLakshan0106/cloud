const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.post("/addproduct", async (req, res) => {
  const products = await Product.find({});
  let id;
  if (products.length > 0) {
    const lastProductArray = products.slice(-1);
    const lastProduct = lastProductArray[0];
    id = lastProduct.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_Price: req.body.new_price,
    old_Price: req.body.old_price,
  });

  await product.save();
  res.json({
    success: true,
    name: req.body.name,
  });
});

router.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({
    success: true,
    name: req.body.name,
  });
});

router.get("/allproduct", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.get("/newcollection", async (req, res) => {
  const products = await Product.find({});
  const newCollection = products.slice(1).slice(-4);
  res.send(newCollection);
});

router.get("/popularinwoman", async (req, res) => {
  const products = await Product.find({ category: "women" });
  const popularInWoman = products.slice(0, 4);
  res.send(popularInWoman);
});

module.exports = router;
