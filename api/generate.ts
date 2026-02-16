import { GoogleGenAI, Type } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Gemini API client on the server side
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

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

    const results = JSON.parse(jsonText);
    return res.status(200).json(results);
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return 500 but with JSON error
    return res.status(500).json({ error: "Failed to generate titles." });
  }
}