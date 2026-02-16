import { GoogleGenAI, Type } from "@google/genai";
import { TitleResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTitles = async (topic: string): Promise<TitleResult[]> => {
  if (!topic.trim()) return [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 5 high-converting, viral YouTube titles for the topic: "${topic}".
      
      CRITICAL SEO RULES:
      1. Brackets/Parentheses: MUST include [Year], (Must Watch), [Step-by-Step], or similar in at least 3 titles.
      2. Power Words: Use words like "Insane", "Secret", "Mistake", "Finally", "Exposed".
      3. CTR Hooks: Front-load keywords. Use odd numbers (e.g., "7 Tips").
      4. Make them distinct from each other.
      
      Output JSON format only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "The generated YouTube title",
              },
              ctrScore: {
                type: Type.INTEGER,
                description: "Estimated CTR potential score between 85 and 99",
              },
            },
            required: ["title", "ctrScore"],
          },
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No data returned from AI");
    }

    return JSON.parse(jsonText) as TitleResult[];
  } catch (error) {
    console.error("Generation Error:", error);
    throw new Error("Failed to generate titles. Please try again later.");
  }
};