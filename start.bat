@echo off
echo 🚀 Starting ByteForge Development Environment...

REM Check if .env files exist
echo 📋 Checking environment configuration...

if not exist "backend\.env" (
    echo ❌ Backend .env file not found!
    echo 📝 Please copy backend\.env.template to backend\.env and fill in your MongoDB credentials
    echo 📖 See MONGODB_SETUP.md for detailed instructions
    pause
    exit /b 1
)

if not exist "compiler\.env" (
    echo ❌ Compiler .env file not found!
    echo 📝 Please copy compiler\.env.template to compiler\.env and fill in your MongoDB credentials
    pause
    exit /b 1
)

if not exist "frontend\.env" (
    echo ❌ Frontend .env file not found!
    echo 📝 Please copy frontend\.env.example to frontend\.env
    pause
    exit /b 1
)

echo ✅ All environment files found!

REM Install dependencies
echo 📦 Installing dependencies...

echo 📦 Installing backend dependencies...
cd backend
call npm install
cd ..

echo 📦 Installing compiler dependencies...
cd compiler
call npm install
cd ..

echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo ✅ All dependencies installed!

REM Start services
echo 🚀 Starting services...

echo 🔧 Starting Backend Server...
start "ByteForge Backend" cmd /k "cd backend && npm run dev"

echo ⚙️ Starting Compiler Server...
start "ByteForge Compiler" cmd /k "cd compiler && npm run dev"

echo 🌐 Starting Frontend...
start "ByteForge Frontend" cmd /k "cd frontend && npm run dev"

echo ✅ All services started!
echo.
echo 🎉 ByteForge is now running:
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend API: http://localhost:5000
echo ⚙️ Compiler API: http://localhost:5008
echo.
echo Close the terminal windows to stop the services
pause
