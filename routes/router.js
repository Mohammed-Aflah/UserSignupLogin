const express = require("express");
const router = express.Router();
const useHelper = require("../controller/userControl");
const middle = require("../middlewares/middleware");
router.get("/", (req, res) => {
  res.render("index");
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
        req.session.signIn = true;
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
    res.render("login", { logout: false });
  })
  // middle.verifySignup
  .post((req, res) => {
    console.log("Login email "+req.body.email);
    console.log("Login Password "+req.body.password);
    useHelper.Login(req.body).then((result)=>{
      if(result){
        res.redirect('/')
      }else{
        res.redirect('/login')
      }
    }).catch(err=>{
      console.log('Error Occured in Login post'+err);
    })
  });
module.exports = router;
