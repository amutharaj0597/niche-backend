// routes/postRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  createPost,
  getPostsByCommunity,
  addComment,
  toggleLikePost,
  toggleLikeComment,
  getAllPosts,
} = require("../controllers/postController");

router.get("/all", authMiddleware, getAllPosts);
router.get("/:communityId", authMiddleware, getPostsByCommunity);

// ✅ multipart/form-data with field name "media"
router.post("/", authMiddleware, upload.single("media"), createPost);

router.post("/:postId/comment", authMiddleware, addComment);
router.post("/:postId/like", authMiddleware, toggleLikePost);
router.post("/:postId/comment/:commentId/like", authMiddleware, toggleLikeComment);

module.exports = router;
