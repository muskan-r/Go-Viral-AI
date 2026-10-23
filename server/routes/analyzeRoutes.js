
import express from "express";
import { analyzeContent } from "../services/geminiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { caption, hook } = req.body ?? {};

    if (
      typeof caption !== "string" ||
      !caption.trim() ||
      typeof hook !== "string" ||
      !hook.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter both a hook and a caption.",
      });
    }

    const result = await analyzeContent(
      caption.trim(),
      hook.trim()
    );

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(
      "Analysis route failed:",
      error?.status ?? "unknown",
      error?.message ?? "Unknown error"
    );

    if ([429, 500, 503].includes(error?.status)) {
      return res.status(503).json({
        success: false,
        message:
          "AI analysis is temporarily busy. Please try again shortly.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "We couldn't generate your report. Please try again.",
    });
  }
});

export default router;
