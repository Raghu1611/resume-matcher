const mongoose = require('mongoose');

const analysisSchema = mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: true,
        },
        matchScore: {
            type: Number,
            required: true,
        },
        missingKeywords: {
            type: [String],
            default: [],
        },
        summary: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Analysis = mongoose.model('Analysis', analysisSchema);

module.exports = Analysis;
