const adminCredential = {
  adminusername: "admin@gmail.com",
  adminpasssword: "786786",
};
function ValidateAdmin(adminData) {
  try {
    console.log(
      "admin data ______-" + adminData.email + "  " + adminData.password
    );
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
module.exports = {
  ValidateAdmin,
};
