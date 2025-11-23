import { GoogleGenAI } from "@google/genai";
import { ProjectData } from '../types';

export const generateProjectInsight = async (data: ProjectData): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found");
    return "Gemini API Key is missing. Unable to generate insights.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Act as a senior construction project manager. Analyze the following status report for "Project Shatra".
      
      Data:
      ${JSON.stringify(data, null, 2)}
      
      Please provide a concise executive summary (max 3 sentences) and 3 bullet points containing specific actionable recommendations, particularly focusing on the "Open Trenches" risk and the gap between excavation and reinstatement. 
      Format the response in Markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No insights generated.";
  } catch (error) {
    console.error("Error generating insight:", error);
    return "Failed to generate AI insights at this time.";
  }
};