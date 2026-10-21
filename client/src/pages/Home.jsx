import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnalyzerCard from "../components/AnalyzerCard";

const features = [
  {
    icon: "🔥",
    title: "Virality Score",
    text: "Get an overall score from 0 to 100 for how likely your content is to spread.",
  },
  {
    icon: "🎣",
    title: "Hook Analysis",
    text: "See how strong your first 3 seconds are and why viewers would keep or skip.",
  },
  {
    icon: "📊",
    title: "Engagement and Trend Scores",
    text: "Separate scores for engagement potential and how well you fit current trends.",
  },
  {
    icon: "🚀",
    title: "Actionable Improvements",
    text: "Clear points on what is good, what is weak, and exactly how to fix it.",
  },
  {
    icon: "🎯",
    title: "Better CTAs and Hooks",
    text: "Ready-to-use call-to-action and hook options written for your content.",
  },
  {
    icon: "🏷️",
    title: "Hashtag Suggestions",
    text: "A hashtag set matched to your topic so your post reaches the right audience.",
  },
];

const steps = [
  { n: "1", title: "Paste your content", text: "Add your caption and the opening hook." },
  { n: "2", title: "AI analyzes it", text: "Gemini scores it and finds the weak spots." },
  { n: "3", title: "Improve and track", text: "Use the fixes, and watch your scores in Analytics." },
];

export default function Home() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
  if (pathname !== "/") return;

  if (!hash) {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return;
  }

  const timer = window.setTimeout(() => {
    document.getElementById(hash.slice(1))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);

  return () => window.clearTimeout(timer);
}, [pathname, hash]);


  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-yellow-500/20 blur-[140px]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-orange-500/20 blur-[140px]" />


      <Navbar />

      <div className="relative z-10 px-6 pt-32 pb-10">
        {/* <div className="h-20"/> */}
        {/* Hero */}

        {/* Hero */}
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.h1
            initial={ false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight"
          >
            Predict Your
            <span className="bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
              {" "}Content Virality
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            AI-powered content analysis that scores your caption and hook,
            shows what is weak, and helps you optimize posts for maximum reach.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mt-10"
          >
            {[
              { v: "4", l: "Virality Metrics", c: "text-yellow-300" },
              { v: "Instant", l: "AI Analysis", c: "text-orange-400" },
              { v: "Gemini", l: "Powered by Google AI", c: "text-green-400" },
            ].map((s) => (
              <div
                key={s.l}
                className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
              >
                <h3 className={`text-3xl font-bold ${s.c}`}>{s.v}</h3>
                <p className="text-gray-400 text-sm mt-1">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      

        {/* Analyzer */}
        <AnalyzerCard />

        {/* Features */}
        <section id="features" className="max-w-6xl mx-auto mt-28 scroll-mt-24">
          <div className="text-center mb-12">
            <p className="text-yellow-300 text-sm tracking-wider uppercase">
              Features
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
                go viral
              </span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              One analysis gives you scores, feedback and ready-to-use
              improvements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-3xl bg-white/5 border border-white/10 p-7 hover:border-yellow-400/40 hover:-translate-y-1 transition"
              >
                <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-2xl">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mt-5">{f.title}</h3>
                <p className="text-gray-400 mt-2 leading-relaxed text-[15px]">
                  {f.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-6xl mx-auto mt-24">
          <h2 className="text-3xl font-extrabold text-center mb-10">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-3xl bg-black/30 border border-white/10 p-7 text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-black font-extrabold text-lg flex items-center justify-center">
                  {s.n}
                </div>
                <h3 className="text-lg font-bold mt-4">{s.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{s.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}