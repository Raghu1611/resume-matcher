import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import JobInput from '../components/JobInput';
import { analyzeResume } from '../services/api';

const Analyze = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        if (!file) {
            setError('Please upload a resume.');
            return;
        }

        if (!jobDescription || jobDescription.length < 100) {
            setError('Please provide a job description of at least 100 characters.');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobDescription', jobDescription);
        // Placeholder email for now, in a real app this would come from auth or input
        formData.append('userEmail', 'user@example.com');

        try {
            const result = await analyzeResume(formData);
            navigate('/results', {
                state: {
                    result: result.data,
                    resumeText: result.resumeText,
                    jobDescription: jobDescription
                }
            });
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Start Analysis</h1>
                    <p className="text-gray-600">Upload your resume and paste the job description to get started.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 space-y-8">
                    <FileUpload file={file} setFile={setFile} />

                    <JobInput value={jobDescription} onChange={setJobDescription} />

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className={`w-full btn-primary flex items-center justify-center ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                                Analyzing...
                            </>
                        ) : (
                            'Analyze Resume'
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Analyze;
