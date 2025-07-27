#!/bin/bash

# ByteForge Quick Start Script
echo "🚀 Starting ByteForge Development Environment..."

# Check if .env files exist
echo "📋 Checking environment configuration..."

if [ ! -f backend/.env ]; then
    echo "❌ Backend .env file not found!"
    echo "📝 Please copy backend/.env.template to backend/.env and fill in your MongoDB credentials"
    echo "📖 See MONGODB_SETUP.md for detailed instructions"
    exit 1
fi

if [ ! -f compiler/.env ]; then
    echo "❌ Compiler .env file not found!"
    echo "📝 Please copy compiler/.env.template to compiler/.env and fill in your MongoDB credentials"
    exit 1
fi

if [ ! -f frontend/.env ]; then
    echo "❌ Frontend .env file not found!"
    echo "📝 Please copy frontend/.env.example to frontend/.env"
    exit 1
fi

echo "✅ All environment files found!"

# Install dependencies
echo "📦 Installing dependencies..."

echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..

echo "📦 Installing compiler dependencies..."
cd compiler && npm install && cd ..

echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo "✅ All dependencies installed!"

# Start services
echo "🚀 Starting services..."

echo "🔧 Starting Backend Server..."
cd backend && npm run dev &
BACKEND_PID=$!

echo "⚙️ Starting Compiler Server..."
cd compiler && npm run dev &
COMPILER_PID=$!

echo "🌐 Starting Frontend..."
cd frontend && npm run dev &
FRONTEND_PID=$!

echo "✅ All services started!"
echo ""
echo "🎉 ByteForge is now running:"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:5000"
echo "⚙️ Compiler API: http://localhost:5008"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for Ctrl+C
trap 'echo "🛑 Stopping all services..."; kill $BACKEND_PID $COMPILER_PID $FRONTEND_PID; exit' INT
wait
