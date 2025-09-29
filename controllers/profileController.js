const User = require("../models/User");
const Community = require("../models/Community");

// Get logged-in user's profile
const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error: err.message,
    });
  }
};

// Update profile (username, bio, avatar, interests)
const updateProfile = async (req, res) => {
  try {
    const { username, bio, avatar, interests } = req.body;

    const updates = {};
    if (username !== undefined) updates.username = username;
    if (bio !== undefined) updates.bio = bio;
    if (avatar !== undefined) updates.avatar = avatar;
    if (interests !== undefined) {
      updates.interests = Array.isArray(interests)
        ? interests
        : String(interests)
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean);
    }

    const updated = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    if (!updated) return res.status(404).json({ message: "User not found" });

    res.json({ user: updated });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update profile",
      error: err.message,
    });
  }
};

// Get another user's profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // fetch joined communities
    const joined = await Community.find({ members: user._id })
      .limit(10)
      .select("name slug");

    res.json({ user, joinedCommunities: joined });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error: err.message,
    });
  }
};

module.exports = { me, updateProfile, getProfile };
