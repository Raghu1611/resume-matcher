import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import API_URL from '../config';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const [unverifiedUser, setUnverifiedUser] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setUnverifiedUser(null);
        try {
            const res = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/');
            } else {
                setError(data.message);
                if (data.requiresVerification) {
                    setUnverifiedUser(data.userId);
                }
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to access your history</p>
                </div>
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm flex justify-between items-center">
                        <span>{error}</span>
                        {unverifiedUser && (
                            <button
                                onClick={() => navigate('/verify', { state: { userId: unverifiedUser } })}
                                className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded font-medium ml-2"
                            >
                                Verify Now
                            </button>
                        )}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="input-field"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full btn-primary flex justify-center items-center">
                        <LogIn className="h-4 w-4 mr-2" /> Sign In
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
