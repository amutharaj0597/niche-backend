// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getNotifications, markRead, markAllRead } = require("../controllers/notificationController");

router.get("/", authMiddleware, getNotifications);
router.patch("/mark-read/:id", authMiddleware, markRead);
router.patch("/mark-read-all", authMiddleware, markAllRead);

module.exports = router;
