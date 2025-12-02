import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

const ResultCard = ({ result }) => {
    if (!result) return null;

    const { matchScore, missingKeywords, profileSummary, suggestions } = result;

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
        if (score >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        return 'text-red-600 bg-red-50 border-red-200';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Score Section */}
            <div className="card text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Match Score</h2>
                <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-4 text-4xl font-bold ${getScoreColor(matchScore)}`}>
                    {matchScore}%
                </div>
                <p className="mt-4 text-gray-600">{profileSummary}</p>
            </div>

            {/* Missing Keywords */}
            <div className="card">
                <div className="flex items-center space-x-2 mb-4">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Missing Keywords</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {missingKeywords.length > 0 ? (
                        missingKeywords.map((keyword, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-100"
                            >
                                {keyword}
                            </span>
                        ))
                    ) : (
                        <span className="text-green-600 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" /> No missing keywords!
                        </span>
                    )}
                </div>
            </div>

            {/* Suggestions */}
            <div className="card">
                <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900">Suggestions</h3>
                </div>
                <ul className="space-y-3">
                    {suggestions?.map((suggestion, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                            <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

export default ResultCard;
