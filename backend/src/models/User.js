const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  streak: {
    type: Number,
    default: 0
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  badges: {
    type: [String],
    default: []
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  categoryPerformance: {
    type: Map,
    of: {
      attempts: { type: Number, default: 0 },
      correct: { type: Number, default: 0 }
    },
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
