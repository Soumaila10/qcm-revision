const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Management de Projet', 'IT & Cybersécurité', 'Annales']
  },
  subcategory: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Facile', 'Moyen', 'Difficile']
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: [array => array.length === 4, 'La question doit avoir exactement 4 options.']
  },
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  },
  explanation: {
    type: String,
    required: true
  },
  tags: [String],
  year: {
    type: Number,
    default: null
  },
  source: {
    type: String,
    default: 'FEDE Master'
  },
  isRecurrent: {
    type: Boolean,
    default: false
  },
  reoccurrenceProbability: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Question', QuestionSchema);
