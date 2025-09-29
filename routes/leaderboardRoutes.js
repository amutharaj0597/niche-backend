// routes/leaderboardRoutes.js
const express = require("express");
const { getLeaderboard } = require("../controllers/leaderboardController");
const router = express.Router();

// Public route – leaderboard is visible to everyone
router.get("/", getLeaderboard);

module.exports = router;
