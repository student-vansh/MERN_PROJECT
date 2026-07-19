const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,

  type: {
    type: String,
    enum: ["notes", "pyq"],
    default: "notes"
  },

  course: String,
  branch: String,
  semester: String,
  subject: String,
  year: String,

  fileUrl: String,

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Note", noteSchema);