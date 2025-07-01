const Problem = require('../models/problemModel');

const createProblem = async (req, res) => {
  try {
    const problem = new Problem(req.body);
    await problem.save();
    res.status(201).json(problem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateProblem = async (req, res) => {
  try {
    const updated = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Problem not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteProblem = async (req, res) => {
  try {
    const deleted = await Problem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Problem not found' });
    res.json({ message: 'Problem deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET by difficulty
const getProblemsByDifficulty = async (req, res) => {
  try {
    const { level } = req.params; // e.g., 'Easy'
    const problems = await Problem.find({ difficulty: level });
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET by tag
const getProblemsByTag = async (req, res) => {
  try {
    const { tag } = req.params; // e.g., 'dp'
    const problems = await Problem.find({ tags: tag });
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
  getProblemsByDifficulty,
  getProblemsByTag
};
