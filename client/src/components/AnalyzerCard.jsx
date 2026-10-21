import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { saveReport } from "../utils/reportStore";

export default function AnalyzerCard() {
  const [caption, setCaption] = useState("");
  const [hook, setHook] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!caption.trim() || !hook.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

      const res = await axios.post(`${API_URL}/v1/analyze`, {
        caption,
        hook,
      });

      const saved = saveReport({ caption, hook, result: res.data.result });
      navigate(`/report/${saved.id}`);
    } catch (error) {
      console.error(error);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full rounded-2xl border border-white/10 bg-black/40 p-5 text-white
    placeholder:text-gray-500 focus:outline-none focus:ring-2
    focus:ring-yellow-400 transition
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        relative max-w-5xl mx-auto overflow-hidden rounded-[32px]
        border border-white/10 bg-white/5 backdrop-blur-2xl
        shadow-[0_0_80px_rgba(255,180,0,0.15)]
      "
    >
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500/20 blur-[120px]" />

      <div className="relative z-10 p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 mb-5">
            <span className="text-yellow-300 text-sm tracking-wider uppercase">
              AI Powered Content Intelligence
            </span>
          </div>

          <h2 className="text-5xl font-extrabold leading-tight">
            Analyze Your
            <span className="bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
              {" "}Viral Potential
            </span>
          </h2>

          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Enter your caption and hook, and AI will score your virality,
            hook strength, engagement and trend relevance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT PANEL */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Caption</label>
              <textarea
                rows="6"
                placeholder="Write your viral caption idea..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                First 3-Second Hook
              </label>
              <input
                type="text"
                placeholder="Describe the opening scene..."
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                className={inputClass}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAnalyze}
              disabled={loading}
              className="
                w-full rounded-2xl bg-gradient-to-r from-yellow-400
                to-orange-500 py-4 text-lg font-bold text-black shadow-lg
                hover:opacity-90 transition
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? "Analyzing..." : "Analyze Content 🚀"}
            </motion.button>
          </div>

          {/* RIGHT PANEL */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-8 flex flex-col justify-center">
            {loading ? (
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full border-4 border-yellow-400/20 border-t-yellow-400 animate-spin" />
                <p className="text-gray-300 mt-6">
                  Analyzing your content...
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  This usually takes a few seconds.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-yellow-300 mb-5">
                  Your report will include
                </h3>
                <ul className="space-y-4 text-gray-300">
                  <li>🔥 Virality, hook, engagement and trend scores</li>
                  <li>✅ What is working and ❌ what is weak</li>
                  <li>🚀 Specific ways to improve</li>
                  <li>🎯 A stronger CTA and 📈 better hook options</li>
                  <li>🏷️ Hashtag suggestions</li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}