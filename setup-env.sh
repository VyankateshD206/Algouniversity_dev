#!/bin/bash

# ByteForge Environment Setup Script
echo "🔧 ByteForge Environment Setup"
echo "==============================="
echo

# Function to prompt for input with default value
prompt_with_default() {
    local prompt="$1"
    local default="$2"
    read -p "$prompt [$default]: " input
    echo "${input:-$default}"
}

echo "📋 This script will help you set up your environment files."
echo "You'll need your MongoDB Atlas credentials."
echo

# Get MongoDB credentials
echo "🍃 MongoDB Atlas Configuration"
echo "------------------------------"
MONGO_USERNAME=$(prompt_with_default "MongoDB Atlas Username" "")
MONGO_PASSWORD=$(prompt_with_default "MongoDB Atlas Password" "")
MONGO_CLUSTER=$(prompt_with_default "MongoDB Atlas Cluster URL (e.g., cluster0.xxxxx.mongodb.net)" "")
MONGO_DATABASE=$(prompt_with_default "Database Name" "byteforge")

# Generate JWT secret
JWT_SECRET=$(openssl rand -base64 48 2>/dev/null || echo "your_very_long_and_random_secret_key_here_make_it_at_least_32_characters")

# Get optional configurations
echo
echo "🔑 Optional Configuration (press Enter to skip)"
echo "----------------------------------------------"
GEMINI_API_KEY=$(prompt_with_default "Google Gemini API Key (for AI features)" "")

# Create backend .env
echo
echo "📝 Creating backend/.env..."
cat > backend/.env << EOF
# MongoDB Configuration
MONGO_URI=mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DATABASE}?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET_KEY=${JWT_SECRET}
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173
COMPILER_URL=http://localhost:5008

# Redis Configuration
REDIS_URL=redis://localhost:6379

# RabbitMQ Configuration
RABBITMQ_URL=amqp://localhost

# Gemini AI Configuration
GEMINI_API_KEY=${GEMINI_API_KEY}
EOF

# Create compiler .env
echo "📝 Creating compiler/.env..."
cat > compiler/.env << EOF
# MongoDB Configuration
MONGO_URI=mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DATABASE}?retryWrites=true&w=majority

# Server Configuration
PORT=5008
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# RabbitMQ Configuration
RABBITMQ_URL=amqp://localhost
EOF

# Create frontend .env
echo "📝 Creating frontend/.env..."
cat > frontend/.env << EOF
# Frontend Environment Configuration
VITE_API_URL=http://localhost:5000/api
VITE_COMPILER_URL=http://localhost:5008
EOF

echo
echo "✅ Environment files created successfully!"
echo
echo "🚀 Next steps:"
echo "1. Verify your MongoDB Atlas credentials are correct"
echo "2. Ensure your IP is whitelisted in MongoDB Atlas"
echo "3. Run 'start.sh' or 'start.bat' to start all services"
echo
echo "📖 For detailed MongoDB setup instructions, see MONGODB_SETUP.md"
