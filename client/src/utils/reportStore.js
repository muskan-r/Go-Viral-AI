const KEY = "goviral_reports";

export const getReports = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export const saveReport = (data) => {
  const report = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };
  const all = [report, ...getReports()].slice(0, 50); // keep latest 50
  localStorage.setItem(KEY, JSON.stringify(all));
  return report;
};

export const getReport = (id) => getReports().find((r) => r.id === id) || null;

export const deleteReport = (id) => {
  const all = getReports().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
  return all;
};