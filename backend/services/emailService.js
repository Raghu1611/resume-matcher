const axios = require('axios');

const sendEmail = async (to, subject, htmlContent) => {
    try {
        const response = await axios.post(process.env.EMAIL_API_URL, {
            to,
            subject,
            html: htmlContent
        }, {
            headers: {
                'x-api-key': process.env.EMAIL_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        console.log('Email sent successfully:', response.data);
        return true;
    } catch (error) {
        console.error('Error sending email:', error.response ? error.response.data : error.message);
        return false;
    }
};

const sendVerificationEmail = async (to, otp) => {
    const subject = 'Verify Your Account - Resume Builder';
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #2563eb; text-align: center;">Welcome to Resume Builder!</h2>
            <p style="font-size: 16px; color: #333;">Hi there,</p>
            <p style="font-size: 16px; color: #333;">Thank you for registering. Please use the OTP below to verify your email address:</p>
            <div style="text-align: center; margin: 30px 0;">
                <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 5px;">${otp}</span>
            </div>
            <p style="font-size: 16px; color: #333;">This OTP is valid for 10 minutes.</p>
            <p style="font-size: 14px; color: #666; margin-top: 20px;">If you didn't request this, please ignore this email.</p>
        </div>
    `;
    return await sendEmail(to, subject, html);
};

const sendForgotPasswordEmail = async (to, otp) => {
    const subject = 'Reset Your Password - Resume Builder';
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #dc2626; text-align: center;">Password Reset Request</h2>
            <p style="font-size: 16px; color: #333;">Hello,</p>
            <p style="font-size: 16px; color: #333;">We received a request to reset your password. Use the OTP below to proceed:</p>
            <div style="text-align: center; margin: 30px 0;">
                <span style="font-size: 32px; font-weight: bold; color: #dc2626; letter-spacing: 5px;">${otp}</span>
            </div>
            <p style="font-size: 16px; color: #333;">This OTP is valid for 10 minutes.</p>
            <p style="font-size: 14px; color: #666; margin-top: 20px;">If you didn't request this, please ignore this email.</p>
        </div>
    `;
    return await sendEmail(to, subject, html);
};

const sendResumeCreatedEmail = async (to, userName) => {
    const subject = 'Your Professional Resume is Ready! 🚀';
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #2563eb; margin: 0;">Resume Builder</h1>
            </div>
            <h2 style="color: #333;">Congratulations, ${userName}! 🎉</h2>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
                Your new professional resume has been successfully created and saved to your history.
            </p>
            <div style="background-color: #f0f9ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #1e40af; font-weight: bold;">Next Steps:</p>
                <ul style="margin: 10px 0 0 20px; color: #333;">
                    <li>Review your resume for any final tweaks.</li>
                    <li>Download it as a PDF from your dashboard.</li>
                    <li>Start applying to your dream jobs!</li>
                </ul>
            </div>
            <p style="font-size: 16px; color: #555;">
                Good luck with your job search! We're rooting for you.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="font-size: 12px; color: #999; text-align: center;">
                © 2024 Resume Builder. All rights reserved.
            </p>
        </div>
    `;
    return await sendEmail(to, subject, html);
};

module.exports = { sendEmail, sendVerificationEmail, sendForgotPasswordEmail, sendResumeCreatedEmail };
