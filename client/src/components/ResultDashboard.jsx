import { motion } from "framer-motion";
import {
  getScores,
  parseSections,
  toList,
  toHashtags,
} from "../utils/parseReport";

const MetricBar = ({ label, value, valueClass, barClass, delay }) => (
  <div>
    <div className="flex justify-between mb-2">
      <span className="text-gray-300">{label}</span>
      <span className={`${valueClass} font-semibold`}>
        {value == null ? "--" : `${value}%`}
      </span>
    </div>
    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value ?? 0}%` }}
        transition={{ duration: 1, delay }}
        className={`h-full ${barClass}`}
      />
    </div>
  </div>
);

const ListItem = ({ text }) => {
  const idx = text.indexOf(":");
  const hasLabel = idx > 0 && idx < 60;
  return (
    <li className="flex gap-3 leading-relaxed">
      <span className="text-yellow-400">•</span>
      <span>
        {hasLabel ? (
          <>
            <span className="font-semibold text-white">
              {text.slice(0, idx + 1)}
            </span>
            {text.slice(idx + 1)}
          </>
        ) : (
          text
        )}
      </span>
    </li>
  );
};

const Card = ({ title, titleClass, children, className = "" }) => (
  <div
    className={`rounded-3xl bg-black/30 border border-white/10 p-6 ${className}`}
  >
    <h3 className={`text-xl font-bold mb-4 ${titleClass}`}>{title}</h3>
    {children}
  </div>
);

const ListCard = ({ title, titleClass, items, className }) =>
  items.length > 0 && (
    <Card title={title} titleClass={titleClass} className={className}>
      <ul className="space-y-3 text-gray-300 text-[15px]">
        {items.map((item, i) => (
          <ListItem key={i} text={item} />
        ))}
      </ul>
    </Card>
  );

export default function ResultDashboard({ result }) {
  const scores = getScores(result);
  const sections = parseSections(result);
  const hashtags = toHashtags(sections.hashtags);
  const hasSections = Object.keys(sections).length > 0;

  const ring = `conic-gradient(#facc15 ${(scores.viral ?? 0) * 3.6}deg, rgba(250,204,21,0.15) 0deg)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        mt-8 rounded-[32px] border border-white/10 bg-white/5
        backdrop-blur-2xl p-6 md:p-8
        shadow-[0_0_60px_rgba(255,180,0,0.12)]
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">AI Analysis Report</h2>
          <p className="text-gray-400 mt-2">
            Virality prediction and engagement analysis
          </p>
        </div>
        <div className="px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
          Analysis Complete
        </div>
      </div>

      {/* Score panel: ring + bars side by side */}
      <div className="rounded-3xl bg-black/30 border border-white/10 p-6 md:p-8 grid md:grid-cols-[220px_1fr] gap-8 items-center">
        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 rounded-full bg-yellow-400/10 blur-2xl" />
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: ring }}
            />
            <div className="absolute inset-4 rounded-full bg-[#0a0a0a]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-6xl font-extrabold text-yellow-300">
                {scores.viral ?? "--"}
              </h1>
              <p className="text-gray-400 mt-1 text-sm">Viral Score</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <MetricBar
            label="Hook Strength"
            value={scores.hook}
            valueClass="text-yellow-300"
            barClass="bg-gradient-to-r from-yellow-400 to-orange-500"
            delay={0}
          />
          <MetricBar
            label="Engagement Potential"
            value={scores.engagement}
            valueClass="text-orange-400"
            barClass="bg-gradient-to-r from-orange-400 to-red-500"
            delay={0.15}
          />
          <MetricBar
            label="Trend Relevance"
            value={scores.trend}
            valueClass="text-green-400"
            barClass="bg-gradient-to-r from-green-400 to-emerald-500"
            delay={0.3}
          />
        </div>
      </div>

      {/* Detail cards in a balanced grid */}
      {hasSections ? (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <ListCard
            title="✅ What's Good"
            titleClass="text-green-400"
            items={toList(sections.good)}
          />
          <ListCard
            title="❌ What's Weak"
            titleClass="text-red-400"
            items={toList(sections.weak)}
          />
          <ListCard
            title="🚀 How to Improve"
            titleClass="text-yellow-300"
            items={toList(sections.improve)}
            className="md:col-span-2"
          />
          <ListCard
            title="🎯 Better CTA"
            titleClass="text-orange-400"
            items={toList(sections.cta)}
          />
          <ListCard
            title="📈 Better Hook"
            titleClass="text-yellow-300"
            items={toList(sections.hook)}
          />
          {hashtags.length > 0 && (
            <Card
              title="🏷️ Hashtags"
              titleClass="text-orange-400"
              className="md:col-span-2"
            >
              <div className="flex flex-wrap gap-3">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      ) : (
        <Card
          title="Detailed Analysis"
          titleClass="text-green-400"
          className="mt-6"
        >
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {result}
          </p>
        </Card>
      )}
    </motion.div>
  );
}