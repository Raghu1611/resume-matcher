require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

function log(message) {
    console.log(message);
    try {
        fs.appendFileSync('test_log.txt', message + '\n');
    } catch (e) {
        console.error("Error writing to log:", e);
    }
}

async function testAPI() {
    // Clear log file
    fs.writeFileSync('test_log.txt', '');
    log("Testing Gemini API with gemini-2.5-flash...");

    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
        log("Error: AI_API_KEY is missing");
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = "Say hello to the Resume Builder user.";
        log("Sending prompt: " + prompt);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        log("Success! API Response: " + text);
    } catch (error) {
        log("Test Failed: " + error.message);
        if (error.response) {
            log("Error details: " + JSON.stringify(error.response, null, 2));
        }
    }
}

testAPI();
