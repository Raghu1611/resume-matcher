const Resume = require('../models/Resume');
const cloudinary = require('../config/cloudinary');
const { sendResumeCreatedEmail } = require('../services/emailService');

const saveResume = async (req, res) => {
    try {
        const { profilePhoto, ...resumeData } = req.body;
        let photoUrl = profilePhoto;

        // Upload to Cloudinary if it's a base64 string
        if (profilePhoto && profilePhoto.startsWith('data:image')) {
            const uploadResponse = await cloudinary.uploader.upload(profilePhoto, {
                folder: 'resume_photos',
                resource_type: 'image'
            });
            photoUrl = uploadResponse.secure_url;
        }

        const resume = await Resume.create({
            user: req.user._id,
            profilePhoto: photoUrl,
            ...resumeData
        });

        // Send confirmation email
        await sendResumeCreatedEmail(req.user.email, req.user.name);

        res.status(201).json(resume);
    } catch (error) {
        console.error("Save Resume Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { saveResume, getResumes };
