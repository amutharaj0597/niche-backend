// routes/searchRoutes.js
const express = require("express");
const router = express.Router();
const { searchCommunities, searchPosts } = require("../controllers/searchController");

router.get("/communities", searchCommunities);
router.get("/posts", searchPosts);

module.exports = router;
