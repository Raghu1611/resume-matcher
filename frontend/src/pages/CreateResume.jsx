import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ResumeDocument from '../components/ResumeDocument';
import { Save, Download, Plus, Trash2, Wand2, Layout, Palette, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import API_URL from '../config';

const CreateResume = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('content'); // content, template, accent
    const [selectedTemplate, setSelectedTemplate] = useState('Classic');
    const [accentColor, setAccentColor] = useState('#2563eb');

    const [resumeData, setResumeData] = useState({
        fullName: '',
        professionalTitle: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        profilePhoto: '',
        summary: '',
        experience: [],
        education: [],
        skills: '',
        languages: '',
        certifications: ''
    });

    // Pre-fill from analysis if available
    useEffect(() => {
        if (location.state?.analysisData) {
            const data = location.state.analysisData;
            setResumeData(prev => ({
                ...prev,
                fullName: data.fullName || '',
                professionalTitle: data.professionalTitle || '',
                email: data.email || '',
                phone: data.phone || '',
                location: data.location || '',
                linkedin: data.linkedin || '',
                summary: data.summary || '',
                skills: data.skills || '',
                languages: data.languages || '',
                certifications: data.certifications || '',
                experience: data.experience || [],
                education: data.education || []
            }));
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResumeData(prev => ({ ...prev, [name]: value }));
    };

    // ... (Experience and Education handlers same as before)
    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const newExperience = [...resumeData.experience];
        newExperience[index][name] = value;
        setResumeData(prev => ({ ...prev, experience: newExperience }));
    };

    const addExperience = () => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, { title: '', company: '', startDate: '', endDate: '', description: '' }]
        }));
    };

    const removeExperience = (index) => {
        const newExperience = [...resumeData.experience];
        newExperience.splice(index, 1);
        setResumeData(prev => ({ ...prev, experience: newExperience }));
    };

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const newEducation = [...resumeData.education];
        newEducation[index][name] = value;
        setResumeData(prev => ({ ...prev, education: newEducation }));
    };

    const addEducation = () => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, { school: '', degree: '', year: '' }]
        }));
    };

    const removeEducation = (index) => {
        const newEducation = [...resumeData.education];
        newEducation.splice(index, 1);
        setResumeData(prev => ({ ...prev, education: newEducation }));
    };

    const handleSave = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
            alert('Please login to save your resume history.');
            navigate('/login');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/users/resume`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({
                    ...resumeData,
                    template: selectedTemplate,
                    accentColor
                })
            });
            if (res.ok) {
                alert('Resume saved to history!');
            } else {
                alert('Failed to save resume.');
            }
        } catch (error) {
            console.error(error);
            alert('Error saving resume.');
        }
    };

    const templates = [
        {
            id: 'Classic',
            name: 'Classic',
            desc: 'Traditional professional layout. Perfect for corporate roles and conservative industries.',
            best: 'Finance, Law, Healthcare'
        },
        {
            id: 'Modern',
            name: 'Modern',
            desc: 'Clean contemporary design with slightly larger fonts. Ideal for tech and creative sectors.',
            best: 'Tech, Marketing, Design'
        },
        {
            id: 'Professional',
            name: 'Professional',
            desc: 'Compact, efficient layout maximizing content space. Great for experienced candidates.',
            best: 'Consulting, Management'
        },
        {
            id: 'Executive',
            name: 'Executive',
            desc: 'Bold, authoritative style with generous spacing. Best for senior leadership positions.',
            best: 'C-Suite, Director, VP'
        },
        {
            id: 'Minimal',
            name: 'Minimal',
            desc: 'Ultra-clean with maximum breathing room. Excellent for early career professionals.',
            best: 'Entry Level, Internships'
        },
        {
            id: 'ATS',
            name: 'ATS Black & White',
            desc: 'Pure black and white only. Maximum ATS compatibility with zero color elements.',
            best: 'Conservative Industries'
        },
    ];

    const colors = [
        { name: 'Blue', value: '#2563eb' },
        { name: 'Purple', value: '#9333ea' },
        { name: 'Green', value: '#16a34a' },
        { name: 'Red', value: '#dc2626' },
        { name: 'Black', value: '#000000' },
        { name: 'Orange', value: '#ea580c' },
    ];

    return (
        <div className="flex h-[calc(100vh-64px)] bg-gray-50 overflow-hidden">
            {/* Left Sidebar - Controls */}
            <div className="w-1/2 lg:w-5/12 flex flex-col border-r border-gray-200 bg-white h-full">

                {/* Header / Tabs */}
                <div className="border-b border-gray-200">
                    <div className="p-4 flex items-center justify-between">
                        <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-900 flex items-center text-sm">
                            <ChevronLeft className="h-4 w-4 mr-1" /> Dashboard
                        </button>
                        <h1 className="font-bold text-gray-800">Resume Builder</h1>
                        <button onClick={handleSave} className="text-primary hover:text-primary-dark flex items-center text-sm font-medium">
                            <Save className="h-4 w-4 mr-1" /> Save
                        </button>
                    </div>
                    <div className="flex px-4 space-x-6">
                        <button
                            onClick={() => setActiveTab('content')}
                            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'content' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            <FileText className="h-4 w-4 mr-2" /> Content
                        </button>
                        <button
                            onClick={() => setActiveTab('template')}
                            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'template' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            <Layout className="h-4 w-4 mr-2" /> Template
                        </button>
                        <button
                            onClick={() => setActiveTab('accent')}
                            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'accent' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            <Palette className="h-4 w-4 mr-2" /> Accent
                        </button>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

                    {activeTab === 'content' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            {/* Personal Info */}
                            <section>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2">1</span>
                                    Personal Information
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <input type="text" name="fullName" value={resumeData.fullName} onChange={handleChange} className="input-field" placeholder="Full Name" />
                                    <input type="text" name="professionalTitle" value={resumeData.professionalTitle} onChange={handleChange} className="input-field" placeholder="Professional Title (e.g., Software Engineer)" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="email" name="email" value={resumeData.email} onChange={handleChange} className="input-field" placeholder="Email Address" />
                                        <input type="text" name="phone" value={resumeData.phone} onChange={handleChange} className="input-field" placeholder="Phone Number" />
                                    </div>
                                    <input type="text" name="location" value={resumeData.location} onChange={handleChange} className="input-field" placeholder="Location (City, State)" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" name="linkedin" value={resumeData.linkedin} onChange={handleChange} className="input-field" placeholder="LinkedIn URL" />
                                        <input type="text" name="github" value={resumeData.github} onChange={handleChange} className="input-field" placeholder="GitHub URL" />
                                    </div>

                                    {/* Profile Photo Upload */}
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setResumeData(prev => ({ ...prev, profilePhoto: reader.result }));
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            {resumeData.profilePhoto ? (
                                                <>
                                                    <img src={resumeData.profilePhoto} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
                                                    <span className="text-sm text-primary font-medium">Click or drag to change photo</span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                        <Plus className="h-6 w-6" />
                                                    </div>
                                                    <span className="text-sm text-gray-500">Drag & drop or click to upload photo</span>
                                                    <span className="text-xs text-gray-400">(Supported in Classic & Modern templates only)</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Summary */}
                            <section>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2">2</span>
                                    Professional Summary
                                </h2>
                                <textarea name="summary" value={resumeData.summary} onChange={handleChange} rows="4" className="input-field" placeholder="Briefly describe your professional background..." />
                            </section>

                            {/* Experience */}
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2">3</span>
                                        Experience
                                    </h2>
                                    <button onClick={addExperience} className="text-primary text-sm font-medium hover:underline flex items-center">
                                        <Plus className="h-3 w-3 mr-1" /> Add
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {resumeData.experience.map((exp, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative group">
                                            <button onClick={() => removeExperience(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                            <div className="grid grid-cols-2 gap-3 mb-3">
                                                <input type="text" name="title" value={exp.title} onChange={(e) => handleExperienceChange(index, e)} placeholder="Job Title" className="input-field text-sm" />
                                                <input type="text" name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} placeholder="Company" className="input-field text-sm" />
                                                <input type="text" name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} placeholder="Start Date" className="input-field text-sm" />
                                                <input type="text" name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} placeholder="End Date" className="input-field text-sm" />
                                            </div>
                                            <textarea name="description" value={exp.description} onChange={(e) => handleExperienceChange(index, e)} rows="3" placeholder="Description..." className="input-field text-sm" />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2">4</span>
                                        Education
                                    </h2>
                                    <button onClick={addEducation} className="text-primary text-sm font-medium hover:underline flex items-center">
                                        <Plus className="h-3 w-3 mr-1" /> Add
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {resumeData.education.map((edu, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative group">
                                            <button onClick={() => removeEducation(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                            <div className="grid grid-cols-1 gap-3">
                                                <input type="text" name="school" value={edu.school} onChange={(e) => handleEducationChange(index, e)} placeholder="School / University" className="input-field text-sm" />
                                                <div className="grid grid-cols-2 gap-3">
                                                    <input type="text" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} placeholder="Degree" className="input-field text-sm" />
                                                    <input type="text" name="year" value={edu.year} onChange={(e) => handleEducationChange(index, e)} placeholder="Year" className="input-field text-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Skills */}
                            <section>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2">5</span>
                                    Skills
                                </h2>
                                <textarea name="skills" value={resumeData.skills} onChange={handleChange} rows="3" className="input-field" placeholder="Java, Python, React, Leadership, Communication..." />
                            </section>

                            {/* Languages */}
                            <section>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2">6</span>
                                    Languages
                                </h2>
                                <textarea name="languages" value={resumeData.languages} onChange={handleChange} rows="2" className="input-field" placeholder="English (Native), Spanish (Fluent), French (Basic)..." />
                            </section>

                            {/* Certifications */}
                            <section>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2">7</span>
                                    Certifications
                                </h2>
                                <textarea name="certifications" value={resumeData.certifications} onChange={handleChange} rows="3" className="input-field" placeholder="AWS Certified Solutions Architect, PMP..." />
                            </section>
                        </motion.div>
                    )}

                    {activeTab === 'template' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose a Template</h2>
                            <p className="text-sm text-gray-600 mb-6">All templates are 100% ATS-friendly with optimized spacing</p>
                            <div className="grid grid-cols-1 gap-4">
                                {templates.map((template) => (
                                    <div
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedTemplate === template.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className={`font-bold ${selectedTemplate === template.id ? 'text-primary' : 'text-gray-900'}`}>{template.name}</h3>
                                            {selectedTemplate === template.id && <div className="h-4 w-4 bg-primary rounded-full" />}
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">{template.desc}</p>
                                        <div className="flex items-center mt-2">
                                            <span className="text-xs font-medium text-gray-400 mr-2">Best for:</span>
                                            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">{template.best}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'accent' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Accent Color</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {colors.map((color) => (
                                    <div
                                        key={color.name}
                                        onClick={() => setAccentColor(color.value)}
                                        className={`cursor-pointer rounded-xl p-4 border-2 flex flex-col items-center justify-center transition-all ${accentColor === color.value ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
                                    >
                                        <div className="w-10 h-10 rounded-full mb-2 shadow-sm" style={{ backgroundColor: color.value }}></div>
                                        <span className="text-sm font-medium text-gray-700">{color.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-gray-200 bg-white">
                    <PDFDownloadLink
                        document={<ResumeDocument data={resumeData} template={selectedTemplate} accentColor={accentColor} />}
                        fileName="resume.pdf"
                        className="flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-lg hover:shadow-xl font-semibold"
                    >
                        {({ blob, url, loading, error }) =>
                            loading ? 'Preparing...' : (
                                <>
                                    <Download className="h-5 w-5 mr-2" /> Download PDF
                                </>
                            )
                        }
                    </PDFDownloadLink>
                </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="w-1/2 lg:w-7/12 bg-gray-100 flex items-center justify-center p-8 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

                <div className="relative w-full h-full max-w-[600px] shadow-2xl rounded-sm overflow-hidden bg-white">
                    <PDFViewer width="100%" height="100%" showToolbar={false} className="w-full h-full">
                        <ResumeDocument data={resumeData} template={selectedTemplate} accentColor={accentColor} />
                    </PDFViewer>
                </div>
            </div>
        </div>
    );
};

export default CreateResume;
