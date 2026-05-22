const express = require('express');
const router = express.Router();
const {
  getQuestions,
  getQuestionById,
  getAdaptiveQuestions,
  toggleFavorite,
  createQuestion,
  updateQuestion,
  deleteQuestion
} = require('../controllers/questionController');
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, getQuestions);
router.get('/adaptive', protect, getAdaptiveQuestions);
router.get('/:id', protect, getQuestionById);
router.post('/:id/favorite', protect, toggleFavorite);

// Admin routes
router.post('/', protect, admin, createQuestion);
router.put('/:id', protect, admin, updateQuestion);
router.delete('/:id', protect, admin, deleteQuestion);

module.exports = router;
