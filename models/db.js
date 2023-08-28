const mongoose = require("mongoose");
require("./config");
const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("SignupData", schema);
