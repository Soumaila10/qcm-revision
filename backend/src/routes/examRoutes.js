const express = require('express');
const router = express.Router();
const {
  generateExam,
  submitExam,
  getExamHistory,
  getStats
} = require('../controllers/examController');
const { protect } = require('../middleware/auth');

router.post('/generate', protect, generateExam);
router.post('/submit', protect, submitExam);
router.get('/history', protect, getExamHistory);
router.get('/stats', protect, getStats);

module.exports = router;
