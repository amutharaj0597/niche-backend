const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const communityRoutes = require("./routes/communityRoutes");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const searchRoutes = require("./routes/searchRoutes");
const commentRoutes = require("./routes/commentRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const uploadRoutes = require("./routes/uploadRoutes"); // ✅ new

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/upload", uploadRoutes); // ✅ new

// Test root
app.get("/", (req, res) => {
  res.send("🚀 Niche Community Platform API Running...");
});

const PORT = process.env.PORT || 5000;

// HTTP + Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // later replace with frontend URL
    methods: ["GET", "POST"],
  },
});

// 🔌 Socket.IO handlers
io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  socket.on("registerUser", (userId) => {
    socket.join(userId);
    console.log(`🔔 User ${userId} joined personal room`);
  });

  socket.on("joinCommunity", (communityId) => {
    socket.join(communityId);
    console.log(`👥 User joined community room: ${communityId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Make io available globally
global.io = io;

server.listen(PORT, () =>
  console.log(`🚀 Server running on Port :${PORT}`)
);
