import express from "express";
import { analyzeContent } from "../services/geminiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { caption, hook } = req.body;

    if (!caption || !hook) {
      return res.status(400).json({
        success: false,
        message: "Caption and hook required",
      });
    }

    const result = await analyzeContent(caption, hook);

    res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {
    console.log("🔥 ROUTE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Analysis failed",
    });
  }
});

export default router;