const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("adminLg",{logout:false});
});
module.exports=router