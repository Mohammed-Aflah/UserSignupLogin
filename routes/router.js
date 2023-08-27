const express = require("express");
const router = express.Router();
const useHelper = require("../controller/userControl");
const { verifySignup } = require("../middlewares/middleware");
router.get("/", verifySignup, (req, res) => {
  useHelper.getUserName(req.session.email).then((name) => {
    res.render("index", { logout: true, user: name });
  });
});
router
  .route("/signup")
  .get((req, res) => {
    res.render("signup", { logout: false });
  })
  .post((req, res) => {
    console.log("reached");
    useHelper
      .Signup(req.body)
      .then((result) => {
        console.log(`data is ${result}`);
        req.session.username = result.username;
        req.session.email = result.email;
        res.redirect("/login");
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
      res.render("login", { logout: false, err: false });
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
          });
        }
      })
      .catch((err) => {
        console.log("Error Occured in Login post" + err);
        res.render("login", {
          logout: false,
          err: "Login Failed Please Try Again",
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
module.exports = router;
