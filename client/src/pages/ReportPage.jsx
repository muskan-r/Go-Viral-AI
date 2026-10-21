import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ResultDashboard from "../components/ResultDashboard";
import { getReport } from "../utils/reportStore";
   import Navbar from "../components/Navbar";
   import Footer from "../components/Footer";

export default function ReportPage() {
  const { id } = useParams();
  const data = getReport(id);

  if (!data) return <Navigate to="/dashboard" replace />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-yellow-500/20 blur-[140px]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-orange-500/20 blur-[140px]" />

      <div className="relative z-10 px-6 pt-32 pb-10 max-w-5xl mx-auto">
        <Navbar />
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-xl font-bold">Go Viral AI</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-5 py-2 rounded-full border border-white/15 text-gray-200 hover:border-yellow-400/50 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:opacity-90 transition"
            >
              ← Analyze Another
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 grid md:grid-cols-2 gap-6"
        >
          <div>
            <p className="text-sm text-gray-400 mb-1">Caption</p>
            <p className="text-gray-200 whitespace-pre-wrap">{data.caption}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Hook</p>
            <p className="text-gray-200">{data.hook}</p>
          </div>
        </motion.div>

        <ResultDashboard result={data.result} />
      </div>
      <Footer />
    </div>
  );
}