# ByteForge MongoDB Atlas Setup Guide

## Prerequisites

- MongoDB Atlas account (free tier available)
- Your MongoDB Atlas credentials

## Step 1: MongoDB Atlas Configuration

### 1.1 Create/Access Your MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in to your account
3. Navigate to your cluster or create a new one if needed

### 1.2 Get Your Connection String

1. In your MongoDB Atlas dashboard, click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" as the driver
4. Copy the connection string (it should look like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database>?retryWrites=true&w=majority
   ```

### 1.3 Create Database User (if not already done)

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password
4. Give the user "Read and write to any database" permissions

### 1.4 Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Either add your current IP or allow access from anywhere (0.0.0.0/0) for development

## Step 2: Environment Configuration

### 2.1 Backend Configuration

Create a `.env` file in the `backend` folder with your MongoDB credentials:

```bash
# MongoDB Configuration
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.xxxxx.mongodb.net/byteforge?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET_KEY=your_very_long_and_random_secret_key_here_make_it_at_least_32_characters
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173
COMPILER_URL=http://localhost:5008

# Redis Configuration (optional for caching)
REDIS_URL=redis://localhost:6379

# RabbitMQ Configuration (for job queue)
RABBITMQ_URL=amqp://localhost

# Gemini AI Configuration (for AI features)
GEMINI_API_KEY=your_gemini_api_key_here
```

### 2.2 Compiler Configuration

Create a `.env` file in the `compiler` folder:

```bash
# MongoDB Configuration (same as backend)
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.xxxxx.mongodb.net/byteforge?retryWrites=true&w=majority

# Server Configuration
PORT=5008
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# RabbitMQ Configuration
RABBITMQ_URL=amqp://localhost
```

## Step 3: Replace Placeholders

Replace the following placeholders in your `.env` files:

- `your_username`: Your MongoDB Atlas database username
- `your_password`: Your MongoDB Atlas database password
- `your_cluster.xxxxx.mongodb.net`: Your actual cluster URL
- `your_very_long_and_random_secret_key_here`: Generate a random string (at least 32 characters)
- `your_gemini_api_key_here`: Your Google Gemini API key (optional, for AI features)

## Step 4: Test the Connection

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Look for the message: `MongoDB Connected: your_cluster_url`

3. Start the compiler server:
   ```bash
   cd compiler
   npm run dev
   ```

## Database Structure

ByteForge will automatically create the following collections in your MongoDB database:

- `users` - User accounts and profiles
- `problems` - Coding problems
- `submissions` - Code submissions and results
- `contactmessages` - Contact form submissions

## Security Notes

- Never commit your `.env` files to version control
- Use strong, unique passwords for your MongoDB Atlas account
- Regularly rotate your JWT secret key
- Consider using MongoDB Atlas IP whitelisting for production

## Troubleshooting

### Common Issues:

1. **Connection refused**: Check your network access settings in MongoDB Atlas
2. **Authentication failed**: Verify your username and password
3. **Database not found**: The database will be created automatically when first accessed
4. **IP not whitelisted**: Add your IP address to the Atlas network access list

### Connection String Examples:

For MongoDB Atlas:

```
mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net/byteforge?retryWrites=true&w=majority
```

For local MongoDB (if you prefer):

```
mongodb://localhost:27017/byteforge
```

## Additional Services (Optional)

For full functionality, you may also want to set up:

- **Redis** for caching (improves performance)
- **RabbitMQ** for job queuing (required for code execution)
- **Google Gemini API** for AI features (code review, hints, boilerplate generation)
