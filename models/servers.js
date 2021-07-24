var mongoose = require("mongoose");

var serverSchema = new mongoose.Schema({
  serverName: String,
  processIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "processes" }],
  ipAddress: String,
  port: Number,
});

module.exports = mongoose.model("Server", serverSchema);
