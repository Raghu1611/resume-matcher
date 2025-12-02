
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Mic, RefreshCw, Send, CheckCircle, AlertCircle } from 'lucide-react';
import API_URL from '../config';

const InterviewPractice = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { questions } = location.state || { questions: [] };

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);

    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No Questions Found</h2>
                    <p className="text-gray-600 mb-6">Please generate interview questions from the Results page first.</p>
                    <button onClick={() => navigate('/')} className="btn-primary">Go Home</button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    const handleSubmitAnswer = async () => {
        if (!answer.trim()) return;
        setLoading(true);
        setFeedback(null);

        try {
            const res = await fetch(`${API_URL}/analyze/interview-feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: currentQuestion,
                    answer: answer
                })
            });
            const data = await res.json();
            if (data.success) {
                setFeedback(data.feedback);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to get feedback');
        } finally {
            setLoading(false);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setAnswer('');
            setFeedback(null);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setAnswer('');
            setFeedback(null);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-900 flex items-center">
                        <ChevronLeft className="h-5 w-5 mr-1" /> Back to Results
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">AI Mock Interview</h1>
                    <div className="text-sm font-medium text-gray-500">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Question & Input */}
                    <div className="space-y-6">
                        {/* Question Card */}
                        <motion.div
                            key={currentQuestionIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interviewer Asks:</h3>
                            <p className="text-xl text-blue-700 font-medium leading-relaxed">"{currentQuestion}"</p>
                        </motion.div>

                        {/* Answer Input */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer</label>
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Type your answer here... (Be specific and use the STAR method)"
                                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                            <div className="mt-4 flex justify-between items-center">
                                <button className="text-gray-400 hover:text-gray-600 cursor-not-allowed" title="Voice input coming soon">
                                    <Mic className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={handleSubmitAnswer}
                                    disabled={loading || !answer.trim()}
                                    className={`btn-primary flex items-center ${loading || !answer.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? (
                                        <>
                                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4 mr-2" /> Get Feedback
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between">
                            <button
                                onClick={handlePrevQuestion}
                                disabled={currentQuestionIndex === 0}
                                className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextQuestion}
                                disabled={currentQuestionIndex === questions.length - 1}
                                className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 ${currentQuestionIndex === questions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Next Question
                            </button>
                        </div>
                    </div>

                    {/* Right Column: AI Feedback */}
                    <div className="space-y-6">
                        {!feedback ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white rounded-xl border border-gray-200 border-dashed text-gray-400">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle className="h-8 w-8 text-gray-300" />
                                </div>
                                <p>Submit your answer to get instant AI feedback on:</p>
                                <ul className="mt-4 space-y-2 text-sm">
                                    <li>• Clarity & Confidence</li>
                                    <li>• Relevance to the Question</li>
                                    <li>• STAR Method Usage</li>
                                </ul>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden"
                            >
                                <div className="bg-blue-50 p-4 border-b border-blue-100 flex justify-between items-center">
                                    <h3 className="font-bold text-blue-900">AI Coach Feedback</h3>
                                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        Score: {feedback.rating}
                                    </span>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center">
                                            <AlertCircle className="h-4 w-4 mr-2 text-blue-500" /> Analysis
                                        </h4>
                                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                                            {feedback.feedback}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center">
                                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Better Answer Example
                                        </h4>
                                        <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-green-900 text-sm italic">
                                            "{feedback.betterAnswer}"
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewPractice;
