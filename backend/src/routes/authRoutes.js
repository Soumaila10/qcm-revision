const express = require('express');
const router = express.Router();
const { register, login, getMe, googleAuth, googleCallback, githubAuth, githubCallback } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

// OAuth Routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);
router.get('/github', githubAuth);
router.get('/github/callback', githubCallback);

module.exports = router;
