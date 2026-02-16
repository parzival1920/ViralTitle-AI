import { TitleResult } from "../types";

export const generateTitles = async (topic: string): Promise<TitleResult[]> => {
  if (!topic.trim()) return [];

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    return data as TitleResult[];
  } catch (error) {
    console.error("Generation Error:", error);
    throw new Error("Failed to generate titles. Please try again later.");
  }
};