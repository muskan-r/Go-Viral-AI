import { Link } from "react-router-dom";

const GITHUB = "https://github.com/muskan-r";
const LINKEDIN = "https://www.linkedin.com/in/muskangulati999";

const colTitle = "text-sm font-semibold text-white mb-4";
const linkClass =
  "text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3 w-fit">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold">
              G
            </div>
            <span className="text-xl font-bold text-white">
              Go Viral AI
            </span>
          </Link>

          <p className="text-gray-400 text-sm mt-4 max-w-sm leading-relaxed">
            Create smarter content with AI-powered insights.
            Discover your content's potential before you post.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className={colTitle}>Explore</h4>
          <ul className="space-y-3">
            <li>
              <Link to="/#features" className={linkClass}>
                Features
              </Link>
            </li>
            <li>
              <Link to="/" className={linkClass}>
                Analyze Content
              </Link>
            </li>
            <li>
              <Link to="/analytics" className={linkClass}>
                Analytics
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className={linkClass}>
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className={colTitle}>Connect</h4>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Interested in the project? Explore the code or connect with me.
          </p>

          <div className="flex flex-wrap gap-5">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              GitHub ↗
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Go Viral AI. All rights reserved.
          </p>
          <p>Made with curiosity by Muskan Gulati ✨</p>
        </div>
      </div>
    </footer>
  );
}