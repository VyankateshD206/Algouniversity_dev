require('dotenv').config(); // loads environment variable from the file .env
const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const userRoutes = require('./routes/userRoutes');
const problemRoutes = require('./routes/problemRoute.js');
const judgeRoute = require('./routes/judgeRoute');
const submissionRoute = require('./routes/submissionRoute');

const { DBconnection } = require('./config/db');

const app = express(); 

app.use(cors({
  origin: process.env.FRONTEND_URL, // Enable CORS with frontend URL from .env // CORS enable the frontend and backend talk , like if house A wants some data from House B // House B only allows if it says that yes House A is not a thief
  credentials: true
}));

app.use(express.json()); //It’s a middleware in Express that tells your app: “📦 Hey, if the incoming request has JSON data, automatically parse it and make it available in req.body.” like { name: "Sidrah", age: 20 } accepts with this middleware
app.use(express.urlencoded({ extended: true }));
// Read cert paths from .env
const options = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH)
};

DBconnection();
app.use('/api', userRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/judge',judgeRoute);
 app.use('/api/submissions', submissionRoute);

const PORT = process.env.PORT || 5000;
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server running at https://localhost:${PORT}`);
});
