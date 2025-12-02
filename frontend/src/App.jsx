import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Results from './pages/Results';
import CreateResume from './pages/CreateResume';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import History from './pages/History';
import InterviewPractice from './pages/InterviewPractice';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkSession = () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo && userInfo.token) {
                try {
                    const payload = JSON.parse(atob(userInfo.token.split('.')[1]));
                    const expirationTime = payload.exp * 1000; // Convert to milliseconds

                    if (Date.now() >= expirationTime) {
                        localStorage.removeItem('userInfo');
                        navigate('/login');
                    }
                } catch (error) {
                    console.error("Invalid token:", error);
                    localStorage.removeItem('userInfo');
                    navigate('/login');
                }
            }
        };

        checkSession();
        const interval = setInterval(checkSession, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [navigate, location]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/analyze"
                        element={
                            <ProtectedRoute>
                                <Analyze />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/results"
                        element={
                            <ProtectedRoute>
                                <Results />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/create"
                        element={
                            <ProtectedRoute>
                                <CreateResume />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/verify" element={<VerifyEmail />} />
                    <Route
                        path="/history"
                        element={
                            <ProtectedRoute>
                                <History />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/interview-practice"
                        element={
                            <ProtectedRoute>
                                <InterviewPractice />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <UserProfile />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
