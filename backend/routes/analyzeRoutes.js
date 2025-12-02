const express = require('express');
const multer = require('multer');
const { analyzeResumeController, coverLetterController, interviewQuestionsController, interviewFeedbackController, optimizeResumeController } = require('../controllers/analyzeController');

const router = express.Router();

// Configure Multer for memory storage (we process file in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('resume'), analyzeResumeController);
router.post('/cover-letter', upload.single('resume'), coverLetterController);
router.post('/interview-questions', upload.single('resume'), interviewQuestionsController);
router.post('/interview-feedback', upload.none(), interviewFeedbackController);
router.post('/optimize', upload.single('resume'), optimizeResumeController);

module.exports = router;
