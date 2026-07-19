// In this Gemini Ai Setup 
const { buildPrompt } = require("../utils/promptBuilder");

const Gemini_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";



  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const generateGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(
      `${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      },
    );
   if (!response.ok) {
  const err = await response.json();

  if (response.status === 429) {
    throw new Error(
      "Gemini API quota exceeded. Please try again later."
    );
  }

  throw new Error(err.error?.message || "Something went wrong");
}

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    if (!text) {
      throw new Error("No text found in Gemini response");
    }
    const clearText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(clearText);


  } catch (error) {
    console.error("Error generating Gemini response:", error.message);
    throw new Error(`Error generating Gemini response: ${error.message}`);
  }
};
module.exports = { generateGeminiResponse };