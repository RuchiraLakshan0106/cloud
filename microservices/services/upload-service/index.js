const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

dotenv.config();

const app = express();
const port = process.env.PORT || 4004;
const publicBaseUrl = process.env.PUBLIC_BASE_URL || `http://localhost:${port}`;

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.json({ success: true, service: "upload-service" });
});

app.get("/health", (req, res) => {
  res.json({ success: true, service: "upload-service" });
});

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `${publicBaseUrl}/images/${req.file.filename}`,
  });
});

app.listen(port, () => {
  console.log(`Upload service running on port ${port}`);
});
