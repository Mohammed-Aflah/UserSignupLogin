const adminCredential = {
  adminusername: "admin@gmail.com",
  adminpasssword: "786786",
};
const { ObjectId } = require("mongodb");

const Database = require("../models/db");
const bcrypt = require("bcrypt");
function ValidateAdmin(adminData) {
  try {
    const { email, password } = adminData;
    const { adminusername, adminpasssword } = adminCredential;
    return new Promise((resolve, reject) => {
      let response = { status: false };
      if (email == adminusername && password == adminpasssword) {
        response.status = true;
      }
      resolve(response.status);
    });
  } catch (err) {
    console.log("Errors Occured on validate Admin Error is :" + err);
    reject("err");
  }
}
function getAllusers() {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await Database.find();
      resolve(users);
    } catch (err) {
      console.log("Error Occured on Fetching users");
    }
  });
}
function Adduser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      userData.password = await bcrypt.hash(userData.password, 10);
      let insert = await new Database({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        Date: Date.now(),
      })
        .save()
        .then((response) => {
          resolve(response);
        });
    } catch (err) {
      console.log("Error Occured on Adduser in Admin");
      reject(err);
    }
  });
}
function DeleteUser(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      let deleted = await Database.deleteOne({ _id: new ObjectId(userId) });
      resolve(deleted);
    } catch (err) {
      console.log("Error occured on Delete User");
      reject(err);
    }
  });
}
function getEditData(userId) {
  return new Promise(async (resolve, reject) => {
    let data = await Database.findOne({ _id: new ObjectId(userId) });
    resolve(data);
  });
}
function updateUser(userId, userData) {
  return new Promise(async (resolve, reject) => {
    await Database.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { username: userData.username, email: userData.email } }
    );
    resolve();
  });
}
function searchUser(userName) {
  return new Promise(async (resolve, reject) => {
    // let regextPattern = new RegExp(userName);
    let search = userName.search || "";
    let serachData = await Database.find({
      username: { $regex: "^" + search, $options: "i" },
    }).lean();
    resolve(serachData);
  });
}
module.exports = {
  ValidateAdmin,
  getAllusers,
  Adduser,
  DeleteUser,
  getEditData,
  updateUser,
  searchUser,
};
