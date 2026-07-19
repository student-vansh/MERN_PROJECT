const { buildPrompt } = require("../utils/promptBuilder.js");
const {generateGeminiResponse} = require("../services/gemini.services.js")
const User = require("../models/user.js");
const ainotes = require("../models/ainotes.js");


module.exports.generateNotes = async (req, res) => {
  try {
    
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagrams = false,
      includeCharts = false,
    } = req.body;
    
    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }
    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(400).json({message: "user is not found"})
    }
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is not configured on the server.",
      });
    }

    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode: Boolean(revisionMode),
      includeDiagrams: Boolean(includeDiagrams),
      includeCharts: Boolean(includeCharts),
    });
 
    const airesponse = await generateGeminiResponse(prompt);
    
    const notes = await ainotes.create({
      user : user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram: includeDiagrams,
      includeChart: includeCharts,
      content:airesponse
    })

   
    return res.json({
  success: true,
  notes: airesponse,
  savedNote: notes
});
     
    // const data = await response.json();
    // const notes = 
    //   data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

  } catch (error) {
    console.error("Generate notes error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate notes",
    });
  }
};
