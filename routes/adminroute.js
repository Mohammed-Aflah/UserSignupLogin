const express = require("express");
const router = express.Router();
const adminHelper = require("../controller/adminControl");
const userHelper = require("../controller/userControl");
const fs = require("fs");
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
    res.render("adminHome", {
      logout: true,
      adminLogout: true,
      userData: false,
    });
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
      res.render("viewuser", {
        logout: true,
        adminLogout: true,
        users,
        userData: false,
      });
    });
  } else {
    res.redirect("/admin/");
  }
});
router
  .route("/adduser")
  .get((req, res) => {
    res.render("adduser", { logout: true, adminLogout: true, userData: false });
  })
  .post((req, res) => {
    adminHelper
      .Adduser(req.body)
      .then((data) => {
        let id = data._id;
        if (req.files && req.files.Image !== null) {
          let image = req.files.Image;
          image.mv("./public/profile-images/" + id + ".jpg", (err) => {
            if (err) {
              console.log("image upload err" + err);
            } else {
              userHelper.ImageStatus(id, true).then(() => {
                console.log("checked__________");
              });
            }
          });
        } else {
          userHelper.ImageStatus(id, false).then(() => {
            console.log("false check");
          });
        }
        res.redirect("/admin/viewuser");
      })
      .catch((err) => {
        console.log(err + "in /adduser");
      });
  });
router.get("/delete/:id", (req, res) => {
  adminHelper
    .DeleteUser(req.params.id)
    .then(() => {
      let id = req.params.id;
      let filestatus = fs.existsSync("./public/profile-images/" + id + ".jpg");
      if (filestatus) {
        fs.unlinkSync("./public/profile-images/" + id + ".jpg");
      }
      res.redirect("/admin/viewuser");
    })
    .catch((err) => {
      console.log(err + "in /delete");
    });
});
router
  .route("/edit/:id")
  .get((req, res) => {
    adminHelper
      .getEditData(req.params.id)
      .then((data) => {
        console.log("edit data_________" + data);
        res.render("edituser", {
          logout: true,
          adminLogout: true,
          data,
          userData: false,
        });
      })
      .catch((err) => {
        console.log(err + "in /edit");
      });
  })
  .post((req, res) => {
    adminHelper.updateUser(req.params.id, req.body).then(() => {
      res.redirect("/admin/viewuser");
      let id = req.params.id;
      if (req.files && req.files.Image) {
        let image = req.files.Image;
        image.mv("./public/profile-images/" + id + ".jpg");
        userHelper.ImageStatus(id, true).then(() => {
          console.log("edited");
        });
      } else {
        userHelper.ImageStatus(id, false).then(() => {
          console.log("false edit");
        });
      }
    });
  });
router.route("/search").post((req, res) => {
  adminHelper.searchUser(req.body).then((data) => {
    res.render("search", {
      logout: true,
      adminLogout: true,
      data,
      userData: false,
    });
  });
});
router.get("/profileforadmin/:id", (req, res) => {
  adminHelper.getProfileData(req.params.id).then((userData) => {
    res.render("profilforadmin", { logout: true, adminLogout: true, userData });
  });
});
module.exports = router;
