const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("connected", () => console.log("Connected to Database"));
mongoose.connection.on("disconnected", () =>
  console.log("Disconnected to Database")
);
