const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  }],
  userAnswers: {
    type: [Number],
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  timeSpent: {
    type: Number, // En secondes
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['Blanc', 'Entraînement', 'Adaptatif'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Exam', ExamSchema);
