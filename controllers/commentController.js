// controllers/commentController.js
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Add comment to post (standalone comment model)
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    const comment = await Comment.create({
      post: postId,
      author: req.user._id,
      text,
    });

    // Also push into embedded comments inside Post
    const post = await Post.findById(postId);
    post.comments.push({ author: req.user._id, content: text });
    await post.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment", error: err.message });
  }
};
