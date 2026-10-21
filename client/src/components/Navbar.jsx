import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navClass = ({ isActive }) =>
  `transition hover:text-yellow-400 ${
    isActive ? "text-yellow-400" : "text-gray-300"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // If already on the home page, just scroll (a same-hash link would do nothing)
  const goFeatures = (e) => {
    setOpen(false);
    if (pathname === "/") {
      e.preventDefault();

      window.history.replaceState(null, "", "/#features"); // Update the URL hash without reloading

      document
        .getElementById("features")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <nav className="relative max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold text-xl shadow-lg">
              G
            </div>
            <div className="leading-tight">
              <h1 className="text-xl font-bold">Go Viral AI</h1>
              <p className="text-xs text-gray-400">AI Content Intelligence</p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/#features"
              onClick={goFeatures}
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              Features
            </Link>
            <NavLink to="/analytics" className={navClass}>
              Analytics
            </NavLink>
            <NavLink to="/dashboard" className={navClass}>
              Dashboard
            </NavLink>
            <Link
              to="/"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:opacity-90 transition"
            >
              Analyze
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-gray-200"
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>

          {/* Mobile menu */}
          {open && (
            <div
              onClick={() => setOpen(false)}
              className="md:hidden absolute top-full right-6 mt-2 w-52 rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl p-4 flex flex-col gap-4"
            >
              <Link to="/#features" onClick={goFeatures} className="text-gray-300">
                Features
              </Link>
              <NavLink to="/analytics" className={navClass}>
                Analytics
              </NavLink>
              <NavLink to="/dashboard" className={navClass}>
                Dashboard
              </NavLink>
              <Link to="/" className="text-yellow-400 font-semibold">
                Analyze →
              </Link>
            </div>
          )}
        </nav>
      </header>

      
      {/* <div className="h-40" /> */}
    </>
  );
}