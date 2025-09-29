// controllers/leaderboardController.js
const User = require("../models/User");
const Post = require("../models/Post");

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().select("username avatar");

    const leaderboard = await Promise.all(
      users.map(async (u) => {
        const posts = await Post.countDocuments({ author: u._id });

        const comments = await Post.aggregate([
          { $unwind: "$comments" },
          { $match: { "comments.author": u._id } },
          { $count: "total" },
        ]);
        const commentCount = comments[0]?.total || 0;

        const likes = await Post.aggregate([
          { $match: { likes: u._id } },
          { $count: "total" },
        ]);
        const likeCount = likes[0]?.total || 0;

        return {
          user: u,
          posts,
          comments: commentCount,
          likes: likeCount,
          score: posts * 3 + commentCount * 2 + likeCount, // weighted
        };
      })
    );

    leaderboard.sort((a, b) => b.score - a.score);

    res.json({ leaderboard });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch leaderboard", error: err.message });
  }
};
