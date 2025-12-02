import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, FileText, Upload, Star, Shield, Zap, Target, Award, MousePointer } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setUser(userInfo);
        }
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const features = [
        {
            icon: <Zap className="h-8 w-8 text-yellow-500" />,
            title: "AI-Powered Analysis",
            desc: "Our advanced Gemini AI scans your resume against job descriptions to identify gaps and opportunities instantly."
        },
        {
            icon: <Target className="h-8 w-8 text-red-500" />,
            title: "ATS Optimization",
            desc: "Get a precise ATS match score and keyword recommendations to ensure your resume passes automated filters."
        },
        {
            icon: <FileText className="h-8 w-8 text-blue-500" />,
            title: "Smart Resume Builder",
            desc: "Create professional, formatted resumes from scratch or optimize existing ones with a single click."
        },
        {
            icon: <Award className="h-8 w-8 text-purple-500" />,
            title: "Interview Prep",
            desc: "Practice with AI-generated interview questions tailored specifically to your resume and target job."
        }
    ];

    const steps = [
        { num: "01", title: "Upload or Create", desc: "Upload your existing PDF resume or start fresh with our builder." },
        { num: "02", title: "Paste Job Description", desc: "Tell us about the job you're applying for to get tailored advice." },
        { num: "03", title: "AI Analysis", desc: "Our AI analyzes keywords, skills, and formatting in seconds." },
        { num: "04", title: "Optimize & Apply", desc: "Apply suggestions, boost your score, and land the interview." }
    ];

    if (user) {
        return (
            <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-between items-center mb-12"
                    >
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">Welcome back, <span className="text-primary">{user.name || 'User'}</span>! 👋</h1>
                            <p className="text-gray-600 mt-2 text-lg">Your career journey continues here.</p>
                        </div>
                        <Link to="/history" className="px-6 py-3 bg-white text-primary border border-primary/20 rounded-xl hover:bg-primary/5 font-medium transition-all shadow-sm">
                            View History
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <Link to="/create" className="group">
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white rounded-3xl p-12 shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center h-96 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                                <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors z-10">
                                    <FileText className="h-12 w-12 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 z-10">Create New Resume</h2>
                                <p className="text-gray-500 text-lg z-10 max-w-xs">Start from scratch with our professional, ATS-friendly templates.</p>
                            </motion.div>
                        </Link>

                        <Link to="/analyze" className="group">
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white rounded-3xl p-12 shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center h-96 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full -mr-32 -mt-32 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                                <div className="w-24 h-24 bg-purple-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 transition-colors z-10">
                                    <Upload className="h-12 w-12 text-purple-600 group-hover:text-white transition-colors" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 z-10">Analyze Existing</h2>
                                <p className="text-gray-500 text-lg z-10 max-w-xs">Upload your current resume to get an instant AI score and feedback.</p>
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-b from-blue-50/50 via-white to-white pt-20 pb-32">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 right-[10%] w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -top-20 left-[10%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">


                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight"
                        >
                            Craft the Perfect <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Resume with AI</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto"
                        >
                            Stop guessing what recruiters want. Our AI analyzes your resume against job descriptions to help you land more interviews.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row justify-center gap-4"
                        >
                            <Link to="/signup" className="btn-primary text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center">
                                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link to="/login" className="px-10 py-4 rounded-full text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 font-semibold transition-all flex items-center justify-center">
                                Login to Account
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* How It Works */}
            <div className="py-24 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold mb-6">How It Works</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Optimize your resume in four simple steps and get ready for your dream job.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative"
                            >
                                <div className="text-6xl font-bold text-blue-500 mb-6 opacity-80">{step.num}</div>
                                <h3 className="text-2xl font-bold mb-4 text-blue-400">{step.title}</h3>
                                <p className="text-gray-400">{step.desc}</p>
                                {index < 3 && (
                                    <div className="hidden md:block absolute top-10 right-0 w-full h-0.5 bg-gradient-to-r from-gray-800 to-transparent transform translate-x-1/2"></div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-16 text-white shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10">Ready to boost your career?</h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">Join thousands of job seekers who have successfully optimized their resumes with our AI tools.</p>
                        <Link to="/signup" className="inline-block bg-white text-blue-600 font-bold text-lg px-12 py-4 rounded-full shadow-lg hover:bg-gray-50 hover:scale-105 transition-all relative z-10">
                            Start Building Now
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Home;
