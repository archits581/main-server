var mongoose = require("mongoose");

var designationSchema = new mongoose.Schema({
  designationName: String,
});

module.exports = mongoose.model("Designation", designationSchema);
