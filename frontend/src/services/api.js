import axios from 'axios';

import API_URL from '../config';

export const analyzeResume = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/analyze`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const generateCoverLetter = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/analyze/cover-letter`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const generateInterviewQuestions = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/analyze/interview-questions`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
