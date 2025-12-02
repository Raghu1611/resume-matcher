const axios = require('axios');
require('dotenv').config();

async function listModels() {
    try {
        const apiKey = process.env.AI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                // Filter for models that support generateContent
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.log("Error listing models:", data);
        }

    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

listModels();
