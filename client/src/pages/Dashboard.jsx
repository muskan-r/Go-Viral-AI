import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getReports, deleteReport } from "../utils/reportStore";
import { getScores } from "../utils/parseReport";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function Dashboard() {
  const [reports, setReports] = useState(getReports());

  const withScores = reports.map((r) => ({
    ...r,
    scores: getScores(r.result),
  }));
  const valid = withScores.filter((r) => r.scores.viral != null);
  const avg = valid.length
    ? Math.round(valid.reduce((s, r) => s + r.scores.viral, 0) / valid.length)
    : null;
  const best = valid.length ? Math.max(...valid.map((r) => r.scores.viral)) : null;

  const handleDelete = (id) => {
    if (window.confirm("Delete this report?")) setReports(deleteReport(id));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-yellow-500/20 blur-[140px]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-orange-500/20 blur-[140px]" />

      <div className="relative z-10 px-6 pt-32 pb-10 max-w-6xl mx-auto">
         <Navbar />

        <h1 className="text-4xl font-extrabold">
          Your{" "}
          <span className="bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>
        <p className="text-gray-400 mt-2 mb-8">
          All your saved analysis reports in one place.
        </p>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Reports", value: reports.length, color: "text-yellow-300" },
            { label: "Average Score", value: avg ?? "--", color: "text-orange-400" },
            { label: "Best Score", value: best ?? "--", color: "text-green-400" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/5 border border-white/10 p-5"
            >
              <p className="text-gray-400 text-sm">{s.label}</p>
              <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Report list */}
        {withScores.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-gray-300 text-lg">No reports yet.</p>
            <p className="text-gray-500 mt-2">
              Analyze your first caption and it will be saved here.
            </p>
            <Link
              to="/"
              className="inline-block mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold"
            >
              Analyze Content 🚀
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {withScores.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-3xl bg-white/5 border border-white/10 p-6 flex flex-col"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">
                      {formatDate(r.createdAt)}
                    </p>
                    <p className="text-gray-200 mt-2 line-clamp-3 whitespace-pre-line">
                      {r.caption}
                    </p>
                  </div>
                  <div className="shrink-0 w-16 h-16 rounded-full border-4 border-yellow-400 flex items-center justify-center text-xl font-extrabold text-yellow-300">
                    {r.scores.viral ?? "--"}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-5 text-center text-sm">
                  <div className="rounded-xl bg-black/30 py-2">
                    <p className="text-gray-500 text-xs">Hook</p>
                    <p className="text-yellow-300 font-semibold">
                      {r.scores.hook ?? "--"}%
                    </p>
                  </div>
                  <div className="rounded-xl bg-black/30 py-2">
                    <p className="text-gray-500 text-xs">Engagement</p>
                    <p className="text-orange-400 font-semibold">
                      {r.scores.engagement ?? "--"}%
                    </p>
                  </div>
                  <div className="rounded-xl bg-black/30 py-2">
                    <p className="text-gray-500 text-xs">Trend</p>
                    <p className="text-green-400 font-semibold">
                      {r.scores.trend ?? "--"}%
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <Link
                    to={`/report/${r.id}`}
                    className="flex-1 text-center py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:opacity-90 transition"
                  >
                    View Report
                  </Link>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
        <Footer />
    </div>
  );
}