const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  statement: {
    type: String,
    required: true,
  },
  inputFormat: {
    type: String,
  },
  outputFormat: {
    type: String,
  },
  constraints: {
    type: String,
  },
  samples: [
    {
      input: String,     
      output: String,
    },
  ],
testCases: [
    {
      input: {
        type: String,
        required: true,
      },
      expectedOutput: {
        type: String,
        required: true,
      }
    }
  ],
},{
  timestamps: true,
});

module.exports = mongoose.model('Problem', problemSchema);
