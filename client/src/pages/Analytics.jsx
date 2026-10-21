import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getReports } from "../utils/reportStore";
import { getScores } from "../utils/parseReport";

const avg = (arr) =>
  arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : null;

const TrendChart = ({ points }) => {
  const W = 640, H = 240, P = 32;
  const n = points.length;
  const x = (i) => (n === 1 ? W / 2 : P + (i * (W - P * 2)) / (n - 1));
  const y = (v) => H - P - (v / 100) * (H - P * 2);
  const line = points.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p.v)}`).join(" ");
  const area = `${line} L${x(n - 1)},${H - P} L${x(0)},${H - P} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#facc15" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 50, 100].map((g) => (
        <g key={g}>
          <line x1={P} x2={W - P} y1={y(g)} y2={y(g)} stroke="rgba(255,255,255,0.1)" />
          <text x={P - 8} y={y(g) + 4} textAnchor="end" fontSize="11" fill="#6b7280">
            {g}
          </text>
        </g>
      ))}
      {n > 1 && <path d={area} fill="url(#trendFill)" />}
      {n > 1 && (
        <path
          d={line}
          fill="none"
          stroke="#facc15"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={x(i)}
          cy={y(p.v)}
          r="5"
          fill="#f97316"
          stroke="#0a0a0a"
          strokeWidth="2"
        >
          <title>{`${p.label}: ${p.v}`}</title>
        </circle>
      ))}
    </svg>
  );
};

const Bar = ({ label, value, barClass, textClass }) => (
  <div>
    <div className="flex justify-between mb-2 text-sm">
      <span className="text-gray-300">{label}</span>
      <span className={`font-semibold ${textClass}`}>
        {value == null ? "--" : `${value}%`}
      </span>
    </div>
    <div className="h-3 rounded-full bg-white/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value ?? 0}%` }}
        transition={{ duration: 1 }}
        className={`h-full ${barClass}`}
      />
    </div>
  </div>
);

export default function Analytics() {
  const reports = getReports()
    .map((r) => ({ ...r, scores: getScores(r.result) }))
    .filter((r) => r.scores.viral != null);

  const chrono = [...reports].reverse().slice(-20);
  const col = (k) => reports.map((r) => r.scores[k]).filter((v) => v != null);

  const averages = {
    viral: avg(col("viral")),
    hook: avg(col("hook")),
    engagement: avg(col("engagement")),
    trend: avg(col("trend")),
  };

  const buckets = [
    { label: "0 – 39", min: 0, max: 39, color: "bg-red-500" },
    { label: "40 – 59", min: 40, max: 59, color: "bg-orange-500" },
    { label: "60 – 79", min: 60, max: 79, color: "bg-yellow-400" },
    { label: "80 – 100", min: 80, max: 100, color: "bg-green-500" },
  ].map((b) => ({
    ...b,
    count: reports.filter((r) => r.scores.viral >= b.min && r.scores.viral <= b.max).length,
  }));
  const maxCount = Math.max(1, ...buckets.map((b) => b.count));

  const metrics = [
    { name: "Hook strength", v: averages.hook },
    { name: "Engagement potential", v: averages.engagement },
    { name: "Trend relevance", v: averages.trend },
  ].filter((m) => m.v != null);
  const sorted = [...metrics].sort((a, b) => b.v - a.v);

  const latest = reports[0]?.scores.viral;
  const prevAvg = avg(reports.slice(1).map((r) => r.scores.viral));
  const diff = latest != null && prevAvg != null ? latest - prevAvg : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-yellow-500/20 blur-[140px]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-orange-500/20 blur-[140px]" />

      <div className="relative z-10 px-6 pt-32 pb-10 max-w-6xl mx-auto">
        <Navbar />

        <h1 className="text-4xl font-extrabold">
          Your{" "}
          <span className="bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
            Analytics
          </span>
        </h1>
        <p className="text-gray-400 mt-2 mb-8">
          Patterns across all your saved reports.
        </p>

        {reports.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-gray-300 text-lg">No data yet.</p>
            <p className="text-gray-500 mt-2">
              Analyze a few posts and your analytics will appear here.
            </p>
            <Link
              to="/"
              className="inline-block mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold"
            >
              Analyze Content 🚀
            </Link>
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { l: "Reports", v: reports.length, c: "text-yellow-300" },
                { l: "Average Score", v: averages.viral, c: "text-orange-400" },
                {
                  l: "Best Score",
                  v: Math.max(...reports.map((r) => r.scores.viral)),
                  c: "text-green-400",
                },
                {
                  l: "Latest vs Average",
                  v: diff == null ? "--" : `${diff > 0 ? "+" : ""}${diff}`,
                  c: diff == null ? "text-gray-400" : diff >= 0 ? "text-green-400" : "text-red-400",
                },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <p className="text-gray-400 text-sm">{s.l}</p>
                  <p className={`text-3xl font-bold mt-1 ${s.c}`}>{s.v}</p>
                </div>
              ))}
            </div>

            {/* Trend */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 mb-6">
              <h3 className="text-xl font-bold mb-1">Viral score over time</h3>
              <p className="text-gray-500 text-sm mb-4">
                Your last {chrono.length} report{chrono.length > 1 ? "s" : ""}, oldest to newest.
              </p>
              <TrendChart
                points={chrono.map((r) => ({
                  v: r.scores.viral,
                  label: new Date(r.createdAt).toLocaleDateString(),
                }))}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Averages */}
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-5">
                <h3 className="text-xl font-bold">Average scores</h3>
                <Bar label="Viral score" value={averages.viral} barClass="bg-gradient-to-r from-yellow-400 to-orange-500" textClass="text-yellow-300" />
                <Bar label="Hook strength" value={averages.hook} barClass="bg-gradient-to-r from-yellow-400 to-orange-500" textClass="text-yellow-300" />
                <Bar label="Engagement potential" value={averages.engagement} barClass="bg-gradient-to-r from-orange-400 to-red-500" textClass="text-orange-400" />
                <Bar label="Trend relevance" value={averages.trend} barClass="bg-gradient-to-r from-green-400 to-emerald-500" textClass="text-green-400" />
              </div>

              {/* Distribution */}
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-5">Score distribution</h3>
                <div className="flex items-end gap-4 h-44">
                  {buckets.map((b) => (
                    <div key={b.label} className="flex-1 flex flex-col items-center justify-end h-full">
                      <span className="text-sm text-gray-300 mb-2">{b.count}</span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(b.count / maxCount) * 100}%` }}
                        transition={{ duration: 0.8 }}
                        className={`w-full rounded-t-xl ${b.color} min-h-[4px]`}
                      />
                      <span className="text-xs text-gray-500 mt-3">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insight */}
            {sorted.length > 1 && (
              <div className="rounded-3xl bg-yellow-400/10 border border-yellow-400/20 p-6 mt-6">
                <h3 className="text-lg font-bold text-yellow-300 mb-2">💡 Insight</h3>
                <p className="text-gray-300 leading-relaxed">
                  Your strongest area is{" "}
                  <span className="font-semibold text-white">
                    {sorted[0].name.toLowerCase()}
                  </span>{" "}
                  (average {sorted[0].v}%). Your weakest is{" "}
                  <span className="font-semibold text-white">
                    {sorted[sorted.length - 1].name.toLowerCase()}
                  </span>{" "}
                  (average {sorted[sorted.length - 1].v}%), so that is the best
                  place to focus next.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}