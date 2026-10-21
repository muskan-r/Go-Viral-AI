export const extractScore = (text, label) => {
  const m = text.match(
    new RegExp(`${label}[^\\d]{0,25}(\\d+(?:\\.\\d+)?)\\s*(?:/\\s*(\\d+))?`, "i")
  );
  if (!m) return null;
  const num = parseFloat(m[1]);
  const max = m[2] ? parseFloat(m[2]) : num <= 10 ? 10 : 100;
  return Math.min(100, Math.round((num / max) * 100));
};

export const getScores = (text) => ({
  viral: extractScore(text, "VIRALITY SCORE"),
  hook: extractScore(text, "HOOK STRENGTH"),
  engagement: extractScore(text, "ENGAGEMENT POTENTIAL"),
  trend: extractScore(text, "TREND RELEVANCE"),
});

const SECTION_KEYS = [
  { key: "good", label: "WHAT IS GOOD" },
  { key: "weak", label: "WHAT IS WEAK" },
  { key: "improve", label: "HOW TO IMPROVE" },
  { key: "cta", label: "BETTER CTA" },
  { key: "hook", label: "BETTER HOOK" },
  { key: "hashtags", label: "HASHTAGS", last: true },
];

const findHeading = (text, label, last = false) => {
  const re = new RegExp(`^[^\\p{L}\\n]*${label}\\b`, "gimu");
  let m;
  let hit = null;
  while ((m = re.exec(text))) {
    hit = m;
    if (!last) break;
  }
  return hit;
};

export const parseSections = (raw) => {
  const text = raw.replace(/\*\*/g, "").replace(/^#{1,6}\s+/gm, "");

  const found = SECTION_KEYS.map(({ key, label, last }) => {
    const m = findHeading(text, label, last);
    if (!m) return null;
    return { key, lineStart: m.index, bodyStart: m.index + m[0].length };
  })
    .filter(Boolean)
    .sort((a, b) => a.lineStart - b.lineStart);

  const out = {};
  found.forEach((s, i) => {
    const end = i + 1 < found.length ? found[i + 1].lineStart : text.length;
    out[s.key] = text
      .slice(s.bodyStart, end)
      .replace(/^[\s:：-]+/, "")
      .trim();
  });
  return out;
};

const clean = (s) =>
  s.replace(/`/g, "").replace(/\*+/g, "").replace(/\s+/g, " ").trim();

export const toList = (body = "") =>
  body
    .split("\n")
    .map((l) => clean(l.replace(/^\s*(?:[-*•]|\d+[.)])\s+/, "")))
    .filter((l) => l && !/^[-–—_=\s]+$/.test(l));

export const toHashtags = (body = "") => [
  ...new Set(body.match(/#[\p{L}\p{N}_]+/gu) || []),
];