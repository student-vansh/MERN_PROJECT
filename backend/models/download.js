const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note"
  },
  type: {
    type: String, // 🔥 notes या pyq
  },
  downloadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Download", downloadSchema);