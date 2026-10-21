import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const PRIMARY_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL || ""; // optional

const MAX_RETRIES = 3;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const isTemporary = (err) => [429, 500, 503].includes(err?.status);

const callModel = async (modelName, prompt) => {
  const model = genAI.getGenerativeModel({ model: modelName });

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      if (!isTemporary(err) || attempt === MAX_RETRIES) throw err;

      const delay = 1500 * 2 ** (attempt - 1); // 1.5s, 3s, 6s
      console.warn(
        `[${modelName}] ${err.status} on attempt ${attempt}, retrying in ${delay}ms`
      );
      await sleep(delay);
    }
  }
};

export const analyzeContent = async (caption, hook) => {
  const prompt = `
You are an elite viral content strategist.

Analyze this social media content professionally.

Return response in this format:

🔥 VIRALITY SCORE: (number out of 100, like 78/100)
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
  } catch (err) {
    if (isTemporary(err) && FALLBACK_MODEL && FALLBACK_MODEL !== PRIMARY_MODEL) {
      console.warn(`Switching to fallback model: ${FALLBACK_MODEL}`);
      return await callModel(FALLBACK_MODEL, prompt);
    }
    console.error("Gemini error:", err.message);
    throw err;
  }
};