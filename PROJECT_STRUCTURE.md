# 📁 ByteForge Project Structure

```
ByteForge/
├── 📄 README.md                    # Main project documentation
├── 📄 MONGODB_SETUP.md            # MongoDB Atlas setup guide
├── 🚀 start.sh                    # Linux/macOS start script
├── 🚀 start.bat                   # Windows start script
├── ⚙️ setup-env.sh                # Environment setup script
│
├── 🔧 backend/                     # Backend API Server (Port 5000)
│   ├── 📦 package.json
│   ├── 🌐 server.js               # Main server file
│   ├── 📄 .env.template           # Environment template
│   ├── 📄 .env.example           # Environment example
│   └── 📁 src/
│       ├── 🎮 controllers/        # API route handlers
│       │   ├── ai.controller.js      # AI features (code review, hints)
│       │   ├── auth.controller.js    # Authentication (login, signup)
│       │   ├── contact.controller.js # Contact messages
│       │   ├── problem.controller.js # Problem CRUD operations
│       │   ├── submission.controller.js # Code submissions
│       │   └── user.controller.js    # User management
│       ├── 🔒 middlewares/         # Express middlewares
│       │   ├── adminOnly.middleware.js
│       │   ├── auth.middleware.js
│       │   ├── error.middleware.js
│       │   ├── optionalAuth.middleware.js
│       │   └── superadminOnly.middleware.js
│       ├── 📊 models/              # MongoDB schemas
│       │   ├── ContactMessage.js
│       │   ├── Problem.js
│       │   ├── Submission.js
│       │   └── User.js
│       ├── 🛣️ routes/              # API routes
│       │   ├── ai.routes.js
│       │   ├── auth.routes.js
│       │   ├── contact.routes.js
│       │   ├── problem.routes.js
│       │   ├── submission.routes.js
│       │   └── user.routes.js
│       └── 🔧 utils/               # Utility functions
│           ├── AppError.js         # Custom error handling
│           ├── deleteKeysByPattern.js # Redis cache management
│           ├── paginateQuery.js    # Database pagination
│           ├── rabbitmq.js         # Message queue utilities
│           ├── TryCatch.js         # Error wrapper
│           └── 📁 config/
│               ├── db.js           # MongoDB connection
│               ├── rabbitmq.js     # RabbitMQ configuration
│               └── redisClient.js  # Redis connection
│
├── ⚙️ compiler/                    # Code Execution Server (Port 5008)
│   ├── 📦 package.json
│   ├── 🌐 server.js               # Main compiler server
│   ├── 👷 worker.js               # Background job worker
│   ├── 🐳 Dockerfile              # Docker configuration
│   ├── 📄 ecosystem.config.cjs    # PM2 configuration
│   ├── 📄 .env.template           # Environment template
│   └── 📁 src/
│       ├── 📁 config/             # Configuration files
│       │   ├── db.js              # MongoDB connection
│       │   ├── rabbitmq.js        # RabbitMQ configuration
│       │   └── redisClient.js     # Redis connection
│       ├── 📊 models/             # MongoDB schemas
│       │   ├── Problem.js
│       │   ├── Submission.js
│       │   └── User.js
│       ├── 🎯 services/           # Business logic
│       │   └── judgeSubmission.js # Code execution and judging
│       └── 🔧 utils/              # Utility functions
│           ├── generateFile.js    # File generation for code execution
│           ├── rabbitmq.js        # Message queue utilities
│           ├── runAgainstTestCases.js # Test case execution
│           └── 📁 executeCode/    # Language-specific executors
│               ├── executeCpp.js
│               ├── executeJava.js
│               ├── executeJS.js
│               └── executePython.js
│
├── 🌐 frontend/                    # React Frontend (Port 5173)
│   ├── 📦 package.json
│   ├── 🏠 index.html              # Main HTML file
│   ├── ⚡ vite.config.js          # Vite configuration
│   ├── 📄 eslint.config.js        # ESLint configuration
│   ├── 📄 vercel.json             # Vercel deployment config
│   ├── 📄 .env.example            # Environment example
│   ├── 📁 public/                 # Static assets
│   │   ├── 🖼️ *.png               # Images and icons
│   │   ├── 📄 data.json           # Code templates and courses
│   │   └── 📄 home.json           # Homepage content
│   └── 📁 src/
│       ├── 🎨 App.jsx             # Main app component
│       ├── 🎨 main.jsx            # App entry point
│       ├── 💄 index.css           # Global styles
│       ├── 🧩 components/         # Reusable components
│       │   ├── AdminPagination.jsx
│       │   ├── CodeEditor.jsx     # Monaco code editor
│       │   ├── ComingSoon.jsx
│       │   ├── FloatingAIButtons.jsx # AI assistance buttons
│       │   ├── Footer.jsx
│       │   ├── Nav.jsx
│       │   ├── Output.jsx         # Code execution output
│       │   ├── PageHeader.jsx
│       │   ├── PageLoader.jsx
│       │   ├── Pagination.jsx
│       │   └── ScrollToTop.jsx
│       ├── 🎣 hooks/              # Custom React hooks
│       │   ├── useAuthUser.js
│       │   ├── useCode.js         # Code editor state management
│       │   ├── useLogin.js
│       │   ├── useLogout.js
│       │   ├── useOnboarding.js
│       │   └── useSignup.js
│       ├── 📱 pages/              # Page components
│       │   ├── Home.jsx
│       │   ├── 📁 Admin/          # Admin dashboard pages
│       │   │   ├── AdminDashboard.jsx
│       │   │   ├── ContactMessages.jsx
│       │   │   └── Users.jsx
│       │   ├── 📁 Auth/           # Authentication pages
│       │   │   ├── Login.jsx
│       │   │   ├── Onboarding.jsx
│       │   │   ├── ProfilePage.jsx
│       │   │   └── Signup.jsx
│       │   ├── 📁 Courses/        # Course pages
│       │   ├── 📁 Leaderboard/    # Leaderboard pages
│       │   ├── 📁 Problems/       # Problem solving pages
│       │   ├── 📁 Static/         # Static pages
│       │   └── 📁 Submissions/    # Submission history pages
│       ├── 🏪 redux/              # State management
│       │   ├── 📁 api/            # RTK Query API endpoints
│       │   ├── 📁 reducers/       # Redux reducers
│       │   └── 📁 store/          # Redux store configuration
│       └── 🔧 utils/              # Utility functions
│           └── codeEditorUtils.js # Code editor helper functions
│
└── 📸 screenshots/                # Project screenshots
    ├── 1.png                      # Home page
    ├── 2.png
    ├── 3.png                      # Code editor
    ├── 4.png                      # Leaderboard
    ├── 5.png                      # Profile page
    └── 6.png                      # Admin dashboard
```

## 🔗 Service Communication

```
Frontend (React)
    ↓ HTTP/HTTPS
Backend API (Express)
    ↓ HTTP/HTTPS
Compiler Server (Express)
    ↓ TCP
MongoDB Atlas (Database)
    ↓ AMQP
RabbitMQ (Message Queue)
    ↓ TCP
Redis (Cache)
```

## 🌊 Data Flow

1. **User submits code** → Frontend sends to Backend API
2. **Backend validates** → Saves submission to MongoDB
3. **Backend queues job** → Sends to RabbitMQ
4. **Compiler worker** → Picks up job from queue
5. **Code execution** → Runs in sandboxed environment
6. **Results saved** → Updates MongoDB with verdict
7. **Real-time updates** → Frontend polls for results

## 🔧 Key Technologies

- **Frontend**: React, Redux Toolkit, Vite, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Compiler**: Docker, RabbitMQ, Child Process
- **Cache**: Redis
- **AI**: Google Gemini API
- **Deployment**: Vercel (Frontend), Railway (Backend), AWS (Compiler)
