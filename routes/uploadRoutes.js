const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Upload single image (for avatars, posts, banners, etc.)
router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({
      url: req.file.path, // Cloudinary URL
      public_id: req.file.filename,
    });
  } catch (err) {
    console.error("❌ Upload failed:", err.message);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

module.exports = router;
