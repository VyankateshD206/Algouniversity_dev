const express = require('express');
const router = express.Router();
const { getUserSubmissions, getSubmissionsByProblem } = require('../controllers/submissionController');

router.get('/user/:userId', getUserSubmissions);
router.get('/problem/:problemId', getSubmissionsByProblem);

module.exports = router;
