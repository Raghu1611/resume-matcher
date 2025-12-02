const { GoogleGenerativeAI } = require('@google/generative-ai');

const analyzeResume = async (resumeText, jobDescription) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
      Act as an expert ATS (Applicant Tracking System) and Resume Analyzer.
      Compare the following Resume with the Job Description.
      
      Resume Text:
      ${resumeText}
      
      Job Description:
      ${jobDescription}
      
      Provide the output in the following JSON format ONLY (no markdown, just raw JSON):
      {
        "matchScore": <number between 0-100>,
        "missingKeywords": ["keyword1", "keyword2", ...],
        "profileSummary": "<short summary of the candidate's fit>",
        "suggestions": ["suggestion1", "suggestion2", ...],
        "structuredResume": {
            "fullName": "<extracted name>",
            "professionalTitle": "<extracted professional title or current job title>",
            "email": "<extracted email>",
            "phone": "<extracted phone>",
            "location": "<extracted location>",
            "linkedin": "<extracted linkedin url>",
            "summary": "<extracted professional summary>",
            "skills": "<extracted skills as comma separated string>",
            "languages": "<extracted languages as comma separated string>",
            "certifications": "<extracted certifications as comma separated string>",
            "experience": [
                { "title": "<job title>", "company": "<company name>", "startDate": "<start date>", "endDate": "<end date>", "description": "<job description>" }
            ],
            "education": [
                { "school": "<school name>", "degree": "<degree>", "year": "<year>" }
            ]
        }
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown if present (e.g. ```json ... ```)
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(jsonString);
    } catch (error) {
        console.error('AI Analysis Error:', error);
        // Fallback mock response if API fails or key is invalid
        return {
            matchScore: 0,
            missingKeywords: ['Error connecting to AI service'],
            profileSummary: 'Could not analyze resume due to AI service error.',
            suggestions: ['Check API Key', 'Try again later']
        };
    }
};

const generateCoverLetter = async (resumeText, jobDescription) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
            Act as a top-tier executive recruiter and resume writer. Write a highly persuasive, "get-the-interview" cover letter for this candidate.
            
            The goal is to instantly grab the recruiter's attention, highlight the exact skills matching the job description, and prove why this candidate is the perfect fit.
            Use a professional, confident, and enthusiastic tone. Avoid generic fluff. Focus on measurable achievements and specific value propositions.
            
            Resume: ${resumeText}
            Job Description: ${jobDescription}
            
            Structure:
            1. Strong opening hook connecting candidate's passion/experience to the company's mission.
            2. Body paragraphs mapping specific resume achievements to job requirements (use numbers/metrics).
            3. Confident closing call to action requesting an interview.
            
            Return ONLY the cover letter text, no other commentary.
        `;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error('Cover Letter Error:', error);
        return "Could not generate cover letter.";
    }
};

const generateInterviewQuestions = async (resumeText, jobDescription) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
            Act as a tough technical hiring manager for this specific role. Generate 5 "real-time" interview questions that you would actually ask in a final round interview.
            These questions should test the candidate's specific claims in their resume against the hard requirements of the job description.
            
            Include:
            1. One "Icebreaker" that tests their passion for the industry/role.
            2. Two "Deep Dive" technical/role-specific questions challenging a specific project or skill listed in their resume.
            3. One "Behavioral" question based on a potential weakness or gap found in the resume relative to the job.
            4. One "Situational" question about a real-world problem this company likely faces.
            
            Resume: ${resumeText}
            Job Description: ${jobDescription}
            
            Return the output as a JSON array of strings, e.g. ["Question 1", "Question 2", ...]. No markdown.
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Interview Questions Error:', error);
        return ["Could not generate questions."];
    }
};



const getInterviewFeedback = async (question, answer) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
            Act as an expert interview coach. Analyze the candidate's answer to the interview question.
            
            Question: "${question}"
            Candidate's Answer: "${answer}"
            
            Provide feedback in the following JSON format:
            {
                "rating": "Score out of 10 (e.g., 7/10)",
                "feedback": "2-3 sentences on what was good and what was missing.",
                "betterAnswer": "A brief example of a stronger answer using the STAR method."
            }
            Return ONLY the JSON.
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Feedback Error:', error);
        return {
            rating: "N/A",
            feedback: "Could not generate feedback.",
            betterAnswer: ""
        };
    }
};



const optimizeResumeForJob = async (resumeText, jobDescription) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
            Act as a professional resume writer and ATS expert. Your goal is to rewrite the candidate's resume to achieve a 95+ ATS match score for the provided job description.
            
            Instructions:
            1. Keep the candidate's actual experience truthful, but rephrase bullet points to use keywords from the job description.
            2. Optimize the "Professional Summary" to directly address the job's core requirements.
            3. Update the "Skills" section to include relevant hard and soft skills found in the job description (that the candidate likely has based on their resume).
            4. Ensure the output is a valid JSON object matching the structure below.
            
            Resume: ${resumeText}
            Job Description: ${jobDescription}
            
            Output JSON Structure:
            {
                "fullName": "Candidate Name",
                "professionalTitle": "Optimized Title",
                "email": "email@example.com",
                "phone": "phone number",
                "location": "location",
                "linkedin": "linkedin url",
                "summary": "Optimized summary...",
                "skills": "Optimized comma-separated skills...",
                "languages": "languages...",
                "certifications": "certifications...",
                "experience": [
                    { "title": "Job Title", "company": "Company", "startDate": "Date", "endDate": "Date", "description": "Optimized description with keywords..." }
                ],
                "education": [
                    { "school": "School", "degree": "Degree", "year": "Year" }
                ]
            }
            
            Return ONLY the JSON.
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Optimize Resume Error:', error);
        return null;
    }
};

module.exports = { analyzeResume, generateCoverLetter, generateInterviewQuestions, getInterviewFeedback, optimizeResumeForJob };
