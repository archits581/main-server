const mongoose = require("mongoose");

const instanceSchema = new mongoose.Schema({
  osId: Number,
  processId: { type: mongoose.Schema.Types.ObjectId, ref: "processes" },
  serverId: { type: mongoose.Schema.Types.ObjectId, ref: "Server" },
  startTime: { type: Date, default: Date.now() },
  endTime: { type: Date, default: "" },
  processName: String,
  status: String,
});

module.exports = mongoose.model("Instance", instanceSchema);
