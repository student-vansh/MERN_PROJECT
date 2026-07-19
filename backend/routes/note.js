const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const { saveDownloadAndRedirect } = require("../controllers/note");
const { uploadNote, getNotes, deleteNote } = require("../controllers/note");
const { generateNotes } = require("../controllers/generate.controller");
const { isAdmin } = require("../controllers/user");
const { requireAuth } = require("../middleware");

// get notes (public)
router.get("/", getNotes);

// AI note generation (logged-in users)
router.post("/generate-notes", requireAuth, generateNotes);

// upload (admin only)
router.post("/", isAdmin, upload.any(), uploadNote);

// delete (admin only)
router.delete("/:id", isAdmin, deleteNote);

// downlad


router.get("/download/:id", saveDownloadAndRedirect);

module.exports = router;