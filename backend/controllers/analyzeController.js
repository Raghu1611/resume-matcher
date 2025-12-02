const Analysis = require('../models/Analysis');
const { extractTextFromPDF } = require('../services/fileService');
const { analyzeResume, generateCoverLetter, generateInterviewQuestions, getInterviewFeedback, optimizeResumeForJob } = require('../services/aiService');
const { sendEmail } = require('../services/emailService');

const analyzeResumeController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a resume PDF' });
        }

        const { jobDescription, userEmail } = req.body;

        if (!jobDescription) {
            return res.status(400).json({ message: 'Please provide a job description' });
        }

        // 1. Extract Text from PDF
        const resumeText = await extractTextFromPDF(req.file.buffer);

        // 2. Analyze with AI
        const analysisResult = await analyzeResume(resumeText, jobDescription);

        // 3. Save to Database (Optional: if we had user auth, we'd link it to user)
        // For now, just logging it or saving anonymous history
        const newAnalysis = await Analysis.create({
            jobTitle: 'Analyzed Job', // Could extract this too if needed
            matchScore: analysisResult.matchScore,
            missingKeywords: analysisResult.missingKeywords,
            summary: analysisResult.profileSummary,
        });

        // 4. Send Email Notification
        if (userEmail) {
            const emailContent = `
        <h1>Resume Analysis Result</h1>
        <p><strong>Match Score:</strong> ${analysisResult.matchScore}%</p>
        <p><strong>Summary:</strong> ${analysisResult.profileSummary}</p>
        <p><strong>Missing Keywords:</strong> ${analysisResult.missingKeywords.join(', ')}</p>
      `;
            await sendEmail(userEmail, 'Your Resume Analysis Results', emailContent);
        }

        res.status(200).json({
            success: true,
            data: analysisResult,
            resumeText: resumeText,
            historyId: newAnalysis._id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const coverLetterController = async (req, res) => {
    try {
        const { jobDescription, resumeText: providedResumeText } = req.body;
        if (!jobDescription) return res.status(400).json({ message: 'Job description required' });

        let resumeText = providedResumeText;
        if (!resumeText && req.file) {
            resumeText = await extractTextFromPDF(req.file.buffer);
        }

        if (!resumeText) return res.status(400).json({ message: 'Resume required (file or text)' });

        const coverLetter = await generateCoverLetter(resumeText, jobDescription);

        res.status(200).json({ success: true, coverLetter });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const interviewQuestionsController = async (req, res) => {
    try {
        const { jobDescription, resumeText: providedResumeText } = req.body;
        if (!jobDescription) return res.status(400).json({ message: 'Job description required' });

        let resumeText = providedResumeText;
        if (!resumeText && req.file) {
            resumeText = await extractTextFromPDF(req.file.buffer);
        }

        if (!resumeText) return res.status(400).json({ message: 'Resume required (file or text)' });

        const questions = await generateInterviewQuestions(resumeText, jobDescription);

        res.status(200).json({ success: true, questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const interviewFeedbackController = async (req, res) => {
    try {
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ message: 'Question and answer are required' });
        }

        const feedback = await getInterviewFeedback(question, answer);
        res.status(200).json({ success: true, feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const optimizeResumeController = async (req, res) => {
    try {
        const { jobDescription, resumeText: providedResumeText } = req.body;
        if (!jobDescription) return res.status(400).json({ message: 'Job description required' });

        let resumeText = providedResumeText;
        if (!resumeText && req.file) {
            resumeText = await extractTextFromPDF(req.file.buffer);
        }

        if (!resumeText) return res.status(400).json({ message: 'Resume required (file or text)' });

        const optimizedData = await optimizeResumeForJob(resumeText, jobDescription);

        res.status(200).json({ success: true, optimizedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { analyzeResumeController, coverLetterController, interviewQuestionsController, interviewFeedbackController, optimizeResumeController };
