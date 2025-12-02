import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Sparkles, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import ResultCard from '../components/ResultCard';
import EmailPopup from '../components/EmailPopup';
import { generateCoverLetter, generateInterviewQuestions } from '../services/api';
import API_URL from '../config';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result;
    const resumeText = location.state?.resumeText;
    const jobDescription = location.state?.jobDescription;

    const [showEmailPopup, setShowEmailPopup] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loadingExtras, setLoadingExtras] = useState({ coverLetter: false, questions: false });

    useEffect(() => {
        if (!result) {
            navigate('/analyze');
        } else {
            const timer = setTimeout(() => {
                setShowEmailPopup(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [result, navigate]);

    const generateAICoverLetter = async () => {
        if (!resumeText || !jobDescription) {
            // Fallback to local generation
            const { fullName, skills, experience } = result.structuredResume || {};
            const letter = `Dear Hiring Manager,\n\nI am writing to express my interest in the open position. With my experience in ${experience?.[0]?.title || 'the field'} and skills in ${skills || 'relevant technologies'}, I am confident in my ability to contribute to your team.\n\nSincerely,\n${fullName || 'Candidate'}`;
            setCoverLetter(letter);
            return;
        }

        setLoadingExtras(prev => ({ ...prev, coverLetter: true }));
        try {
            const formData = new FormData();
            formData.append('resumeText', resumeText);
            formData.append('jobDescription', jobDescription);

            const response = await generateCoverLetter(formData);
            setCoverLetter(response.coverLetter);
        } catch (error) {
            console.error('Cover letter generation failed:', error);
            // Fallback
            const { fullName, skills, experience } = result.structuredResume || {};
            const letter = `Dear Hiring Manager,\n\nI am writing to express my interest in the open position. With my experience in ${experience?.[0]?.title || 'the field'} and skills in ${skills || 'relevant technologies'}, I am confident in my ability to contribute to your team.\n\nSincerely,\n${fullName || 'Candidate'}`;
            setCoverLetter(letter);
        } finally {
            setLoadingExtras(prev => ({ ...prev, coverLetter: false }));
        }
    };

    const generateAIQuestions = async () => {
        if (!resumeText || !jobDescription) return;

        setLoadingExtras(prev => ({ ...prev, questions: true }));
        try {
            const formData = new FormData();
            formData.append('resumeText', resumeText);
            formData.append('jobDescription', jobDescription);

            const response = await generateInterviewQuestions(formData);
            setQuestions(response.questions);
        } catch (error) {
            console.error('Interview questions generation failed:', error);
        } finally {
            setLoadingExtras(prev => ({ ...prev, questions: false }));
        }
    };

    const [optimizing, setOptimizing] = useState(false);

    const handleOptimizeResume = async () => {
        if (!resumeText || !jobDescription) return;
        setOptimizing(true);
        try {
            const formData = new FormData();
            formData.append('resumeText', resumeText);
            formData.append('jobDescription', jobDescription);

            const res = await fetch(`${API_URL}/analyze/optimize`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                navigate('/create', { state: { analysisData: data.optimizedData } });
            } else {
                alert('Optimization failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Error optimizing resume.');
        } finally {
            setOptimizing(false);
        }
    };

    if (!result) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
            >
                <button
                    onClick={() => navigate('/analyze')}
                    className="flex items-center text-gray-600 hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Analysis
                </button>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Analysis Results</h1>
                    <p className="text-gray-600">Here is how your resume matches the job description.</p>
                </div>

                <ResultCard result={result} />

                {/* New Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-blue-600" /> Cover Letter
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">AI-powered cover letter based on your resume.</p>
                        {coverLetter ? (
                            <div>
                                <textarea
                                    className="w-full h-40 p-3 border rounded-lg text-sm mb-2"
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                />
                                <button
                                    onClick={() => setCoverLetter('')}
                                    className="text-xs text-gray-500 hover:text-gray-700"
                                >
                                    Clear
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={generateAICoverLetter}
                                disabled={loadingExtras.coverLetter}
                                className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium disabled:opacity-50 flex items-center justify-center"
                            >
                                {loadingExtras.coverLetter ? (
                                    <>Generating...</>
                                ) : (
                                    <>
                                        <Sparkles className="h-4 w-4 mr-2" />
                                        Generate with AI
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    <div className="card">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-purple-600" /> Interview Prep
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm">AI-generated interview questions.</p>
                        {questions.length > 0 ? (
                            <ul className="space-y-2">
                                {questions.map((q, i) => (
                                    <li key={i} className="text-sm text-gray-700 bg-purple-50 p-2 rounded">
                                        {i + 1}. {q}
                                    </li>
                                ))}
                                <button
                                    onClick={() => navigate('/interview-practice', { state: { questions } })}
                                    className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center justify-center"
                                >
                                    <Mic className="h-4 w-4 mr-2" /> Start Mock Interview
                                </button>
                            </ul>

                        ) : (
                            <button
                                onClick={generateAIQuestions}
                                disabled={loadingExtras.questions || !resumeText}
                                className="w-full py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 font-medium disabled:opacity-50 flex items-center justify-center"
                            >
                                {loadingExtras.questions ? (
                                    <>Generating...</>
                                ) : (
                                    <>
                                        <Sparkles className="h-4 w-4 mr-2" />
                                        Generate Questions
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex justify-center mt-8 space-x-4">
                    <button
                        onClick={() => navigate('/create', { state: { analysisData: result.structuredResume } })}
                        className="flex items-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 font-bold text-lg shadow-sm"
                    >
                        <FileText className="h-5 w-5 mr-2" />
                        Edit Original
                    </button>
                    <button
                        onClick={handleOptimizeResume}
                        disabled={optimizing}
                        className="flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all font-bold text-lg"
                    >
                        {optimizing ? (
                            <>Generating...</>
                        ) : (
                            <>
                                <Sparkles className="h-5 w-5 mr-2" />
                                Auto-Optimize for 95+ Score
                            </>
                        )}
                    </button>
                </div>
            </motion.div >

            <EmailPopup isOpen={showEmailPopup} onClose={() => setShowEmailPopup(false)} />
        </div >
    );
};

export default Results;
