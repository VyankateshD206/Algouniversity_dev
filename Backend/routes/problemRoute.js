const express = require('express');
const {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
  getProblemsByDifficulty,
  getProblemsByTag
} = require('../controllers/problemController');

const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getAllProblems)
  .post(protect, adminOnly, createProblem);

router.route('/:id')
  .get(getProblemById)
  .put(protect, adminOnly, updateProblem)
  .delete(protect, adminOnly, deleteProblem);

router.get('/difficulty/:level', getProblemsByDifficulty); // e.g. /difficulty/Easy
router.get('/tag/:tag', getProblemsByTag);    

module.exports = router;
