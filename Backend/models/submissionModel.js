const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  code: { type: String, required: true },
  language: { type: String, required: true },
  verdict: { type: String, enum: ['Accepted', 'Failed', 'Error'], required: true },
  testResults: [{
    input: String,
    expected: String,
    actual: String,
    status: String
  }],
  submittedAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Submission', submissionSchema);
