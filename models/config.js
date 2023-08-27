const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect("mongodb://127.0.0.1:27017/signDb");
mongoose.connection.on("connected", () => console.log("Connected to Database"));
mongoose.connection.on("disconnected", () =>
  console.log("Disconnected to Database")
);
