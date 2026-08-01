const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY,
});

const generateQuestions = async (req, res) => {
    try{
        const {
            interviewType,
            role,
            technology,
            difficulty,
            questionCount
        } = req.body;

        let prompt = " ";

        if (interviewType === "Technical Interview") {
                prompt = `
                You are an expert technical interviewer.

                Generate ${questionCount} UNIQUE ${difficulty} interview questions for a ${role} using ${technology}.

                Return ONLY valid JSON.

                The JSON MUST follow this schema exactly:

                [
                {
                    "question": "Explain useEffect.",
                    "topic": "Hooks"
                }
                ]

                Do not return markdown.
                Do not use \`\`\`json.
                Do not return strings.
                Every element must be an object with "question" and "topic".
                `;
        } else {
            prompt = `
            You are an expert technical interviewer.

            Generate ${questionCount} UNIQUE ${difficulty} interview questions for a ${role} using ${technology}.

            Return ONLY valid JSON.

            The JSON MUST follow this schema exactly:

            [
            {
                "question": "Explain useEffect.",
                "topic": "Hooks"
            }
            ]

            Do not return markdown.
            Do not use \`\`\`json.
            Do not return strings.
            Every element must be an object with "question" and "topic".
            `;
        }

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                temperature:1,
            },
        });

        let text = response.text;

        text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

        res.json({
            success:true,
            questions:text,
        });

    } catch(error){
        console.error("===== GEMINI ERROR =====");
        console.error(error);
        console.error("========================");

        res.status(500).json({
        success:false,
        message:"Failed to generate questions",
    });
}
};

module.exports = {
    generateQuestions,
};