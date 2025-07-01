const express = require('express');
const router = express.Router();
const { judgeCode } = require('../controllers/judgeController');
const { protect } = require('../middlewares/authMiddleware');
router.post('/', protect,judgeCode);

module.exports = router;
