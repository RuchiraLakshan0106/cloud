const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ruchiralakshan1403:R.l.20010314@cluster23.vvznlaw.mongodb.net/bride?retryWrites=true&w=majority&appName=Cluster23"
  );
};

module.exports = connectDB;
