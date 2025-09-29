// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" }, // ✅ URL or base64 string
    bio: { type: String, default: "" },
    interests: [{ type: String }], // ✅ new field
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
