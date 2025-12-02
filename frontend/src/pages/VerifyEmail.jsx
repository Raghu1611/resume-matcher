import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import API_URL from '../config';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId || localStorage.getItem('tempUserId');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [password, setPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);

    const handleResend = async () => {
        setResendDisabled(true);
        try {
            const res = await fetch(`${API_URL}/users/resend-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess('OTP resent successfully!');
            } else {
                setError(data.message);
                setResendDisabled(false);
            }
        } catch (err) {
            setError('Failed to resend OTP');
            setResendDisabled(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/users/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, otp })
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess('Email verified successfully! Please set your password.');
                localStorage.setItem('userInfo', JSON.stringify(data));
                setIsVerified(true);
                setError('');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    const handleSetPassword = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const res = await fetch(`${API_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({ password })
            });

            if (res.ok) {
                setSuccess('Account created successfully! Redirecting...');
                localStorage.removeItem('tempUserId');
                setTimeout(() => navigate('/'), 1500);
            } else {
                const data = await res.json();
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to set password');
        }
    };

    if (!userId || userId === 'undefined') {
        return <div className="text-center mt-20">Invalid access. Please register first.</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-20 px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isVerified ? 'Set Password' : 'Verify Your Email'}
                    </h1>
                    <p className="text-gray-600">
                        {isVerified ? 'Secure your account with a password' : 'Enter the OTP sent to your email address.'}
                    </p>
                </div>
                {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
                {success && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm">{success}</div>}

                {!isVerified ? (
                    <>
                        <form onSubmit={handleVerify} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">OTP Code</label>
                                <input
                                    type="text"
                                    className="input-field text-center text-2xl tracking-widest"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full btn-primary flex justify-center items-center">
                                <CheckCircle className="h-4 w-4 mr-2" /> Verify Email
                            </button>
                        </form>
                        <div className="mt-4 text-center">
                            <button
                                onClick={handleResend}
                                disabled={resendDisabled}
                                className="text-sm text-primary hover:underline disabled:opacity-50 disabled:no-underline"
                            >
                                {resendDisabled ? 'Resend code sent' : 'Resend Code'}
                            </button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={handleSetPassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                type="password"
                                className="input-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>
                        <button type="submit" className="w-full btn-primary flex justify-center items-center">
                            <CheckCircle className="h-4 w-4 mr-2" /> Complete Registration
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default VerifyEmail;
