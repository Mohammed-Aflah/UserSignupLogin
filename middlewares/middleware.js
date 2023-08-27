function verifySignup(req, res, next) {
  if (req.session.signIn) {
    next();
  } else {
    res.redirect("/signup");
  }
}
module.exports = {verifySignup};
