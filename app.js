const express = require("express");
const app = express();
require("dotenv").config(); // Configuration of Dotenv File
const port = process.env.PORT;
const session = require("express-session");
const router = require("./routes/router");
const admiRoute = require("./routes/adminroute");
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Accessing Request Body value in Readable format
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/", router);
app.use("/admin", admiRoute);
app.set("view engine", "ejs");
app.use(express.static("public"));

// Setting Port
app.listen(port, () =>
  console.log(`Server Started on http://127.0.0.1:${port}`)
);
