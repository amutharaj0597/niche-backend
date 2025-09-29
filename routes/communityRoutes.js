// routes/commmunityRoutes.js
const express = require("express");
const { createCommunity, getAllCommunities, joinCommunity } = require("../controllers/communityController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllCommunities);
router.post("/", authMiddleware, createCommunity);
router.post("/join/:communityId", authMiddleware, joinCommunity);

module.exports = router;
