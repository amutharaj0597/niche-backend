// controllers/searchController.js
const Community = require("../models/Community");
const Post = require("../models/Post");

// Search communities
exports.searchCommunities = async (req, res) => {
  try {
    const { q } = req.query;
    const communities = await Community.find({ name: { $regex: q, $options: "i" } });
    res.json(communities);
  } catch (err) {
    res.status(500).json({ message: "Failed to search communities", error: err.message });
  }
};

// Search posts
exports.searchPosts = async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await Post.find({ content: { $regex: q, $options: "i" } })
      .populate("author", "username avatar")
      .populate("community", "name slug");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to search posts", error: err.message });
  }
};
