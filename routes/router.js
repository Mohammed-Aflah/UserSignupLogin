const express = require("express");
const router = express.Router();
const useHelper = require("../controller/userControl");
const { verifySignup } = require("../middlewares/middleware");
router.get("/", verifySignup, (req, res) => {
  useHelper.getUserName(req.session.email).then((userData) => {
    res.render("index", { logout: true, userData, adminLogout: false });
  });
});
router
  .route("/signup")
  .get((req, res) => {
    res.render("signup", { logout: false, adminLogout: false });
  })
  .post((req, res) => {
    console.log("reached");
    useHelper
      .Signup(req.body)
      .then((result) => {
        console.log(`data is ${result}`);
        req.session.username = result.username;
        req.session.email = result.email;
        let id = result._id;
        if (req.files && req.files.Image !== null) {
          let image = req.files.Image;
          image.mv("./public/profile-images/" + id + ".jpg", (err) => {
            if (err) {
              console.log("image upload err" + err);
            } else {
              useHelper.ImageStatus(id, true).then(() => {
                console.log("checked__________");
              });
            }
          });
        } else {
          useHelper.ImageStatus(id, false).then(() => {
            console.log("false check");
          });
        }
        req.session.logined = true;
        res.redirect("/");
        console.log("inserted");
      })
      .catch((err) => {
        console.log("Error Occured" + err);
      });
  });
router
  .route("/login")
  .get((req, res) => {
    if (req.session.logined) {
      res.redirect("/");
    } else {
      res.render("login", { logout: false, err: false, adminLogout: false });
    }
  })
  // middle.verifySignup
  .post((req, res) => {
    console.log("Login email " + req.body.email);
    console.log("Login Password " + req.body.password);
    useHelper
      .Login(req.body)
      .then((result) => {
        console.log("hashed result_______" + result.status);
        if (result.status) {
          req.session.logined = true;
          req.session.email = req.body.email;
          console.log("reach if");
          res.redirect("/");
        } else {
          console.log("reach else");
          res.render("login", {
            logout: false,
            err: "Incorrect Username or Password",
            adminLogout: false,
          });
        }
      })
      .catch((err) => {
        console.log("Error Occured in Login post" + err);
        res.render("login", {
          logout: false,
          err: "Incorrect Username or Password",
        });
      });
  });
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});
router.get("/close", (req, res) => {
  res.redirect("/login");
});
router.get("/profile/:id", (req, res) => {
  useHelper.getProfileData(req.params.id).then((userData) => {
    res.render("profile", { logout: true, adminLogout: false, userData });
  });
});
module.exports = router;
