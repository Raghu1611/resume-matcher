require('dotenv').config();
console.log("Script started");
console.log("API Key loaded:", process.env.AI_API_KEY ? "Yes" : "No");

const axios = require('axios');

async function test() {
    try {
        console.log("Sending request...");
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.AI_API_KEY}`;
        const res = await axios.get(url);
        console.log("Response received");
        console.log(JSON.stringify(res.data, null, 2));
    } catch (e) {
        console.error("Error occurred:");
        console.error(e.response ? JSON.stringify(e.response.data, null, 2) : e.message);
    }
}

test();
