const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateAnalyticsReport = async (analyticsData) => {
  try {
    const prompt = `
You are an AI productivity coach.

You MUST analyze ONLY the data provided below.

Rules:
- Never fabricate information.
- Never assume habits that are not present in the data.
- If data is insufficient, explicitly say so.
- Base every conclusion on the provided JSON.

Return ONLY valid JSON in this format:

{
  "productivityScore": number,
  "weeklySummary": "",
  "monthlySummary": "",
  "strengths": [],
  "improvements": [],
  "suggestions": [],
  "motivation": ""
}

Analytics Data:

${JSON.stringify(analyticsData, null, 2)}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    let text = response.text();

    // Remove Markdown code fences if Gemini wraps the JSON
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);

    return {
      productivityScore: 0,
      weeklySummary: "Unable to generate report.",
      monthlySummary: "",
      strengths: [],
      improvements: [],
      suggestions: [],
      motivation: "",
    };
  }
};

module.exports = {
  generateAnalyticsReport,
};