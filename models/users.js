var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  designationId: String,
});

module.exports = mongoose.model("User", userSchema);
