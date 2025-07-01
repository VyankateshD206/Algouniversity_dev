const express = require('express');
const router = express.Router();
const { registerUser, loginUser,getUser } = require('../controllers/userController');
const {authenticateToken} = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
// server.js
router.get('/me', authenticateToken, getUser);

module.exports = router;
