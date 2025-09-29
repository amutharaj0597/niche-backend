// controllers/communityController.js
const Community = require("../models/Community");
const slugify = require("slugify");

// Create a new community
exports.createCommunity = async (req, res) => {
  try {
    const { name, description, tags } = req.body;
    const slug = slugify(name, { lower: true });

    const community = await Community.create({
      name,
      slug,
      description,
      tags,
      members: [req.user._id],
    });

    res.status(201).json(community);
  } catch (err) {
    res.status(500).json({ message: "Failed to create community", error: err.message });
  }
};

// Get all communities
exports.getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find().populate("members", "username avatar");
    res.json(communities);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch communities", error: err.message });
  }
};

// Join community
exports.joinCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;
    const community = await Community.findById(communityId);

    if (!community) return res.status(404).json({ message: "Community not found" });

    if (!community.members.includes(req.user._id)) {
      community.members.push(req.user._id);
      await community.save();
    }

    res.json(community);
  } catch (err) {
    res.status(500).json({ message: "Failed to join community", error: err.message });
  }
};
