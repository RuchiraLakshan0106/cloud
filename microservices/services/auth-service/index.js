const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserAuth = require("./models/UserAuth");

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;
let isDbConnected = false;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    isDbConnected = true;
    console.log("Auth DB connected");
  })
  .catch((error) => {
    isDbConnected = false;
    console.error("Auth DB connection failed", error.message);
  });

app.get("/", (req, res) => {
  res.json({ success: true, service: "auth-service" });
});

app.get("/health", (req, res) => {
  res.status(isDbConnected ? 200 : 503).json({
    success: isDbConnected,
    service: "auth-service",
    db: isDbConnected ? "connected" : "disconnected",
  });
});

app.post("/signup", async (req, res) => {
  try {
    const check = await UserAuth.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: false, errors: "existing user found with same email address" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new UserAuth({
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();

    if (process.env.CART_SERVICE_URL) {
      await fetch(`${process.env.CART_SERVICE_URL}/init-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-key": process.env.INTERNAL_SERVICE_KEY || "",
        },
        body: JSON.stringify({ userId: user.id }),
      }).catch(() => null);
    }

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, token, userId: user.id });
  } catch (error) {
    res.status(500).json({ success: false, errors: "signup failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await UserAuth.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ success: false, errors: "Wrong Email Id" });
    }

    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (!passCompare) {
      return res.json({ success: false, errors: "wrong Password" });
    }

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, token, userId: user.id });
  } catch (error) {
    res.status(500).json({ success: false, errors: "login failed" });
  }
});

app.post("/verify-token", async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).json({ valid: false });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, user: data.user });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
});

app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});
