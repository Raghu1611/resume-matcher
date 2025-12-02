const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    professionalTitle: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    profilePhoto: String, // Cloudinary URL
    summary: String,
    experience: Array,
    education: Array,
    skills: String,
    languages: String,
    certifications: String,
    template: String,
    accentColor: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);
