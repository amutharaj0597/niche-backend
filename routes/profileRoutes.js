// routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const { getProfile, me, updateProfile } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/me", authMiddleware, me);
// ✅ multipart/form-data with field name "avatar"
router.put("/me", authMiddleware, upload.single("avatar"), updateProfile);
router.get("/:userId", getProfile);

module.exports = router;
