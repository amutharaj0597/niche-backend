// controllers/postController.js
const Post = require("../models/Post");
const Community = require("../models/Community");
const Notification = require("../models/Notification");

// ✅ Create post (multipart/form-data with "media")
exports.createPost = async (req, res) => {
  try {
    const { communityId, content } = req.body;
    if (!communityId || !content) {
      return res.status(400).json({ message: "communityId and content are required" });
    }

    const community = await Community.findById(communityId);
    if (!community) return res.status(404).json({ message: "Community not found" });

    const post = await Post.create({
      community: communityId,
      author: req.user.id,
      content,
      media: req.file ? req.file.path : "",
    });

    const postPop = await Post.findById(post._id)
      .populate("author", "username avatar")
      .populate("community", "name slug")
      .populate("comments.author", "username avatar");

    // 🔔 realtime
    global.io.to(communityId.toString()).emit("newPost", postPop);

    res.status(201).json({ post: postPop });
  } catch (err) {
    res.status(500).json({ message: "Post creation failed", error: err.message });
  }
};

// (keep your existing handlers)
exports.getPostsByCommunity = async (req, res) => {
  try {
    const posts = await Post.find({ community: req.params.communityId })
      .populate("author", "username avatar")
      .populate("community", "name slug")
      .populate("comments.author", "username avatar")
      .sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts", error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username avatar")
      .populate("community", "name slug")
      .populate("comments.author", "username avatar")
      .sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all posts", error: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });
    let post = await Post.findById(req.params.postId).populate("author");
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ author: req.user.id, content });
    await post.save();

    post = await Post.findById(post._id)
      .populate("author", "username avatar")
      .populate("community", "name slug")
      .populate("comments.author", "username avatar");

    const newComment = post.comments[post.comments.length - 1];

    if (post.author._id.toString() !== req.user.id.toString()) {
      await Notification.create({
        user: post.author._id,
        fromUser: req.user.id,
        type: "comment",
        message: `${req.user.username} commented on your post`,
        relatedId: post._id,
      });
      global.io.to(post.author._id.toString()).emit("notification", {
        type: "comment",
        message: `${req.user.username} commented on your post`,
        postId: post._id,
      });
    }

    global.io.to(post.community._id.toString()).emit("newComment", {
      postId: post._id,
      comment: newComment,
    });

    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment", error: err.message });
  }
};

exports.toggleLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user.id;
    const idx = post.likes.findIndex((u) => u.toString() === userId.toString());
    if (idx === -1) post.likes.push(userId);
    else post.likes.splice(idx, 1);

    await post.save();

    const postPop = await Post.findById(post._id)
      .populate("author", "username avatar")
      .populate("community", "name slug")
      .populate("comments.author", "username avatar");

    res.json({ post: postPop });
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle like", error: err.message });
  }
};

exports.toggleLikeComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const userId = req.user.id;
    const idx = comment.likes.findIndex((u) => u.toString() === userId.toString());
    if (idx === -1) comment.likes.push(userId);
    else comment.likes.splice(idx, 1);

    await post.save();

    const postPop = await Post.findById(post._id)
      .populate("author", "username avatar")
      .populate("community", "name slug")
      .populate("comments.author", "username avatar");

    res.json({ post: postPop });
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle comment like", error: err.message });
  }
};
