const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const healthRoutes = require("./routes/healthRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const port = 4000;
const app = express();

app.set("port", port);
app.use(express.json());
app.use(cors());

connectDB();

app.use("/images", express.static("upload/images"));
app.use(healthRoutes);
app.use(uploadRoutes);
app.use(productRoutes);
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});