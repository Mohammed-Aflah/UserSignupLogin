function verifySignup(req, res, next) {
  if (req.session.logined) {
    next();
  } else {
    res.redirect("/login");
  }
}
module.exports = { verifySignup };
