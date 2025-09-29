// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    // issue token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        id: user._id,           // keep both for safety
        username: user.username,
        email: user.email,
        avatar: user.avatar || "",
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    console.log("👉 Login attempt for:", email);
    console.log("👉 Plain password:", password);
    console.log("👉 Stored hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("👉 bcrypt compare result:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: {
        _id: user._id,
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar || "",
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
