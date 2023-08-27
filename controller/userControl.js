const Db = require("../models/db");
const bcrypt = require("bcrypt");
function Signup(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      userData.password = await bcrypt.hash(userData.password, 10);
      const insert = new Db({
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      await insert.save().then((res) => resolve(res));
    } catch (err) {
      console.log("Error to insert db", err);
      reject(err);
    }
  });
}
function Login(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      let getSignupPassword = await Db.findOne({ email: userData.email });
      console.log(getSignupPassword + "___data");
      let isMatch = await bcrypt.compare(
        userData.password,
        getSignupPassword.password
      );
      resolve(isMatch);
    } catch (err) {
      reject(err);
    }
  });
}
module.exports = {
  Signup,
  Login,
};
