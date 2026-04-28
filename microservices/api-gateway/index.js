const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.get("/", (req, res) => {
  res.json({ success: true, service: "api-gateway" });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    service: "api-gateway",
    routes: ["auth", "products", "cart", "media"],
  });
});

app.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/auth": "" },
  })
);

app.use(
  "/products",
  createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/products": "" },
  })
);

app.use(
  "/cart",
  createProxyMiddleware({
    target: process.env.CART_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/cart": "" },
  })
);

app.use(
  "/media",
  createProxyMiddleware({
    target: process.env.UPLOAD_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/media": "" },
  })
);

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
