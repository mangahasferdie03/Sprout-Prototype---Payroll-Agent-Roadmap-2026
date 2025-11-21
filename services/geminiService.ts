import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AgentItem, PressReleaseData } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateVisionStatement = async (agent: AgentItem): Promise<PressReleaseData> => {
  if (!apiKey) {
    return {
      headline: "API Key Missing",
      body: "Please configure your Google Gemini API Key to generate a live vision statement for this agent.",
      quote: "System Administrator"
    };
  }

  const model = "gemini-2.5-flash";
  
  const prompt = `
    You are the Chief Product Officer at Sprout Payroll, a B2B SaaS company.
    Write a short, futuristic, internal "Press Release" (Amazon style) announcing the success of the following AI Agent that we launched in 2026.
    
    Agent Name: ${agent.title}
    Context: ${agent.fullDescription}
    Goals Achieved: ${agent.goals.map(g => `${g.type}: ${g.value}`).join(', ')}
    
    The tone should be inspiring, executive-friendly, and focus on business impact.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      headline: { type: Type.STRING, description: "A catchy headline for the internal announcement" },
      body: { type: Type.STRING, description: "A 2-3 sentence paragraph describing the impact." },
      quote: { type: Type.STRING, description: "A short fictional quote from a happy customer." }
    },
    required: ["headline", "body", "quote"]
  };

  try {
    const result = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const text = result.text;
    if (!text) throw new Error("No text returned");
    
    return JSON.parse(text) as PressReleaseData;
  } catch (error) {
    console.error("Gemini generation failed:", error);
    return {
      headline: `Vision for ${agent.title}`,
      body: "We envision a future where payroll runs itself. This agent is a key step towards autonomous operations, reducing manual intervention and increasing accuracy across all sectors.",
      quote: "Future Customer"
    };
  }
};