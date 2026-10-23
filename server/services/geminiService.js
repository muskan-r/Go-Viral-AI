
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const PRIMARY_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL || "";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isTemporary = (error) =>
  [429, 500, 503].includes(error?.status);

async function callModel(modelName, prompt) {
  const model = genAI.getGenerativeModel({ model: modelName });

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(
      `Gemini model ${modelName} failed with status ${error?.status ?? "unknown"}`
    );
    throw error;
  }
}

export async function analyzeContent(caption, hook) {
  const prompt = `
You are a professional social media content strategist.

Analyze the hook and caption below. Be specific, useful, and concise.
Do not claim that virality can be guaranteed.

Return the report using this exact structure:

🔥 VIRALITY SCORE: (number out of 100)
🔥 HOOK STRENGTH: (number out of 100)
🔥 ENGAGEMENT POTENTIAL: (number out of 100)
🔥 TREND RELEVANCE: (number out of 100)

✅ WHAT IS GOOD

❌ WHAT IS WEAK

🚀 HOW TO IMPROVE

🎯 BETTER CTA

📈 BETTER HOOK

🏷️ HASHTAGS

Caption:
${caption}

Hook:
${hook}
`;

  try {
    return await callModel(PRIMARY_MODEL, prompt);
  } catch (error) {
    if (!isTemporary(error)) {
      throw error;
    }

    if (
      FALLBACK_MODEL &&
      FALLBACK_MODEL !== PRIMARY_MODEL
    ) {
      console.warn(`Trying fallback model: ${FALLBACK_MODEL}`);

      try {
        return await callModel(FALLBACK_MODEL, prompt);
      } catch (fallbackError) {
        console.error(
          "Fallback model also failed:",
          fallbackError?.status ?? "unknown"
        );
        throw fallbackError;
      }
    }

    // One short retry if no fallback model is configured.
    await sleep(1000);

    return await callModel(PRIMARY_MODEL, prompt);
  }
}
