var mongoose = require("mongoose");

var processSchema = new mongoose.Schema({
  processName: String,
  designationIds: Array,
});

module.exports = mongoose.model("Process", processSchema);
