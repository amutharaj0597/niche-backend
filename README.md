NicheCommunityPlatform/
│
├── Front/                           # React + Vite frontend
│   ├── dist/                        # Production build output
│   │   ├── assets/
│   │   ├── index.html
│   │   └── vite.svg
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── lib/
│   │   │   ├── api.js
│   │   │   ├── socket.js
│   │   │   └── upload.js
│   │   ├── pages/
│   │   │   ├── Communities.jsx
│   │   │   ├── CreateCommunity.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── Feed.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Notifications.jsx
│   │   │   ├── PostPage.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── SearchResults.jsx
│   │   │   └── Signup.jsx
│   │   ├── store/
│   │   │   └── auth.js
│   │   ├── App.jsx
│   │   ├── global.css
│   │   ├── main.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── theme.js
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/                         # Node.js + Express backend
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── commentController.js
│   │   ├── communityController.js
│   │   ├── leaderboardController.js
│   │   ├── notificationController.js
│   │   ├── postController.js
│   │   ├── profileController.js
│   │   └── searchController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── Comment.js
│   │   ├── Community.js
│   │   ├── Notification.js
│   │   ├── Post.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── communityRoutes.js
│   │   ├── leaderboardRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── postRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── searchRoutes.js
│   │   └── uploadRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   └── README.md
│
└── README.md                        # Root documentation (this file)
