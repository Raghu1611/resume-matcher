import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Save, AlertCircle, CheckCircle } from 'lucide-react';
import API_URL from '../config';

const UserProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const res = await fetch(`${API_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({ name, password })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Profile updated successfully');
                localStorage.setItem('userInfo', JSON.stringify(data));
                setPassword('');
                setConfirmPassword('');
            } else {
                setError(data.message || 'Update failed');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-10 text-white">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                                <User className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">User Profile</h1>
                                <p className="text-blue-100 mt-1">Manage your account settings</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {message && (
                            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                                <CheckCircle className="h-5 w-5 mr-2" />
                                {message}
                            </div>
                        )}
                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                                <AlertCircle className="h-5 w-5 mr-2" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 border"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        disabled
                                        className="block w-full border-gray-300 rounded-lg bg-gray-50 text-gray-500 shadow-sm py-3 border px-4 cursor-not-allowed"
                                    />
                                    <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-6 mt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                    <Lock className="h-5 w-5 mr-2 text-gray-500" />
                                    Change Password
                                </h3>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 border px-4"
                                            placeholder="Leave blank to keep current"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 border px-4"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-lg disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : (
                                        <>
                                            <Save className="h-5 w-5 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default UserProfile;
