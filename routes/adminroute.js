const express = require("express");
const router = express.Router();
const adminHelper = require("../controller/adminControl");
router
  .route("/")
  .get((req, res) => {
    if (req.session.adminAuth) {
      res.redirect("/admin/home");
    } else {
      res.render("adminLg", { logout: false, err: false });
    }
  })
  .post((req, res) => {
    adminHelper.ValidateAdmin(req.body).then((result) => {
      if (result) {
        req.session.adminAuth = true;
        res.redirect("/admin/home");
      } else {
        res.render("adminLg", {
          logout: false,
          err: "Incorrect Username or Password",
        });
      }
    });
  });
router.get("/home", (req, res) => {
  if (req.session.adminAuth) {
    res.render("adminHome", { logout: true, adminLogout: true });
  } else {
    res.redirect("/admin/");
  }
});
router.get("/close", (req, res) => {
  res.redirect("/admin/");
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect('/admin/')
});
module.exports = router;
