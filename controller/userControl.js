const Db = require("../models/db");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
function Signup(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      userData.password = await bcrypt.hash(userData.password, 10);
      const insert = new Db({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        Date: Date.now(),
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
    let response = { status: false };
    try {
      let getSignupPassword = await Db.findOne({ email: userData.email });
      console.log(getSignupPassword + "___data");
      let isMatch = await bcrypt.compare(
        userData.password,
        getSignupPassword.password
      );
      if (isMatch) {
        response.status = true;
      } else {
        response.status = false;
      }
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}
function getUserName(mail) {
  return new Promise(async (resolve, reject) => {
    let data = await Db.findOne({ email: mail });
    resolve(data);
  });
}
function ImageStatus(id, status) {
  return new Promise(async (resolve, reject) => {
    await Db.updateOne({ _id: new ObjectId(id) }, { $set: { hasImg: status } });
  });
}
function getProfileData(id) {
  return new Promise(async (resolve, reject) => {
    let data = await Db.findOne({ _id: new ObjectId(id) });
    resolve(data);
  });
}
module.exports = {
  Signup,
  Login,
  getUserName,
  ImageStatus,
  getProfileData,
};
