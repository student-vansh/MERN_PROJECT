const Note = require("../models/note.js");
const Download = require("../models/download.js");
// upload
module.exports.uploadNote = async (req, res) => {
  try {

    // 🔍 check file
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "File not uploaded"
      });
    }

    const file = req.files[0]; // 👈 important

    const newNote = new Note({
      ...req.body,
      fileUrl: file.path,  
      uploadedBy: req.user._id
    });

    await newNote.save();

    res.json({
      success: true,
      message: "Uploaded successfully",
      note: newNote
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}


// get
module.exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find(req.query);
    res.json({ success: true, notes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// delete
module.exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// download
module.exports.saveDownloadAndRedirect = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    // 🔥 SAVE DOWNLOAD (notes + pyq both)
    if (req.user) {
      await Download.create({
        user: req.user._id,
        note: note._id,
        type: note.type   // 🔥 important
      });
    }

    // 🔁 file open
    res.redirect(`/${note.fileUrl}`);

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
};