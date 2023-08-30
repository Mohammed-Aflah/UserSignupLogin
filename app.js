const express = require("express");
const app = express();
require("dotenv").config(); // Configuration of Dotenv File
const port = process.env.PORT;
const session = require("express-session");
const router = require("./routes/router");
const admiRoute = require("./routes/adminroute");
const filUpload=require('express-fileupload')
// const nocache=require('nocache')
app.use(filUpload())
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Accessing Request Body value in Readable format
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
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
