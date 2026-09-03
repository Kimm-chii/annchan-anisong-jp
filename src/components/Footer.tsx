import { siteData } from "../data";
import { motion } from "motion/react";
import { ArrowUp, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-[#fffdfb]/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-pink-100/80 dark:border-slate-800/80 py-6 sm:py-8 relative overflow-hidden transition-colors">
      {/* Delicate Top Edge Pastel Accent */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-pink-200 via-rose-200 to-pink-300 dark:from-pink-900/60 dark:via-purple-900/60 dark:to-pink-900/60 opacity-90"></div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-5 border-b border-pink-100/60 dark:border-slate-800/60">
          
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <motion.div 
                animate={{ rotate: 360, scale: [1, 1.15, 1] }} 
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }} 
                className="w-4 h-4 flex items-center justify-center text-pink-400 dark:text-purple-300 transform-gpu"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 0C12.5 6 18 11.5 24 12C18 12.5 12.5 18 12 24C11.5 18 6 12.5 0 12C6 11.5 11.5 6 12 0Z" />
                </svg>
              </motion.div>
              <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-white tracking-tight">
                AnnChan<span className="text-pink-500 dark:text-purple-300">【杏】</span>
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-500 dark:text-slate-400 font-light tracking-wide flex items-center justify-center md:justify-start gap-1">
              <span>Thanks for stopping by ♡</span>
            </p>
          </div>

          {/* Footer Quick Links (Socials link removed) */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-gray-600 dark:text-slate-300 font-medium tracking-wide">
            {siteData.header.nav.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className="hover:text-pink-500 dark:hover:text-purple-300 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Compact Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-pink-500 dark:text-purple-300 bg-pink-50/80 dark:bg-slate-800/80 hover:bg-pink-400 dark:hover:bg-purple-600 hover:text-white dark:hover:text-white px-3 py-1 rounded-full border border-pink-200/60 dark:border-slate-700/80 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-2.5 h-2.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 text-center">
          <p className="text-[10px] sm:text-xs text-gray-400 dark:text-slate-500 font-light tracking-wider">
            © 2026 Ann.
          </p>
        </div>
      </div>
    </footer>
  );
}
