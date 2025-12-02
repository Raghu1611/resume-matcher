const express = require('express');
const { registerUser, loginUser, verifyEmail, forgotPassword, resetPassword, resendOTP, updateUserProfile } = require('../controllers/authController');
const { saveResume, getResumes } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify', verifyEmail);
router.post('/resend-otp', resendOTP);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/resume', protect, saveResume);
router.get('/history', protect, getResumes);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
