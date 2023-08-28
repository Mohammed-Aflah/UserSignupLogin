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
  res.redirect("/admin/");
});
router.get("/viewuser", (req, res) => {
  if (req.session.adminAuth) {
    adminHelper.getAllusers().then((users) => {
      res.render("viewuser", { logout: true, adminLogout: true, users });
    });
  } else {
    res.redirect("/admin/");
  }
});
router
  .route("/adduser")
  .get((req, res) => {
    res.render("adduser", { logout: true, adminLogout: true });
  })
  .post((req, res) => {
    adminHelper.Adduser(req.body).then(() => {
      res.redirect("/admin/viewuser");
    });
  });
router.get("/delete/:id", (req, res) => {
  adminHelper.DeleteUser(req.params.id).then(() => {
    res.redirect("/admin/viewuser");
  });
});
router
  .route("/edit/:id")
  .get((req, res) => {
    adminHelper.getEditData(req.params.id).then((data) => {
      console.log("edit data_________" + data);
      let user = data.username;
      res.render("edituser", { logout: true, adminLogout: true, data });
    });
  })
  .post((req, res) => {
    adminHelper.updateUser(req.params.id, req.body).then(() => {
      res.redirect("/admin/viewuser");
    });
  });
router.route("/search").post((req, res) => {
  adminHelper.searchUser(req.body).then((data) => {
    res.render("search", { logout: true, adminLogout: true, data });
  });
});
module.exports = router;
