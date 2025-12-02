import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            ResumeMatcher
                        </span>
                    </Link>

                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-primary font-medium transition-colors">
                            Home
                        </Link>


                        {userInfo ? (
                            <div className="flex items-center space-x-6">
                                <Link to="/create" className="text-gray-600 hover:text-primary font-medium transition-colors">
                                    Create Resume
                                </Link>
                                <Link to="/analyze" className="text-gray-600 hover:text-primary font-medium transition-colors">
                                    Analyze
                                </Link>
                                <div className="h-6 w-px bg-gray-200"></div>
                                <div className="flex items-center space-x-4">
                                    <Link to="/profile" className="text-sm font-medium text-gray-700 flex items-center hover:text-primary transition-colors">
                                        <User className="h-4 w-4 mr-2" />
                                        {userInfo.name}
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center text-red-600 hover:text-red-700 font-medium transition-colors text-sm"
                                    >
                                        <LogOut className="h-4 w-4 mr-1" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors">
                                    Login
                                </Link>
                                <Link to="/signup" className="btn-primary px-4 py-2 rounded-lg text-sm">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
