useEffect(() => {
    const fetchHistory = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
            navigate('/login');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/users/history`, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setResumes(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    fetchHistory();
}, [navigate]);

if (loading) return <div className="text-center mt-20">Loading history...</div>;

return (
    <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Resume History</h1>
            <button onClick={() => navigate('/create')} className="btn-primary">Create New</button>
        </div>

        {resumes.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No resumes saved yet.</p>
            </div>
        ) : (
            <div className="grid gap-6">
                {resumes.map((resume) => (
                    <motion.div
                        key={resume._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card hover:shadow-md transition-shadow cursor-pointer flex justify-between items-center"
                        onClick={() => navigate('/create', { state: { analysisData: resume } })}
                    >
                        <div className="flex items-center space-x-4">
                            {resume.profilePhoto ? (
                                <img src={resume.profilePhoto} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-gray-400" />
                                </div>
                            )}
                            <div>
                                <h3 className="font-semibold text-gray-900">{resume.fullName || 'Untitled Resume'}</h3>
                                <p className="text-sm text-gray-500 flex items-center">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {new Date(resume.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                    </motion.div>
                ))}
            </div>
        )}
    </div>
);
};

export default History;
