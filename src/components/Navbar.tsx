import { siteData } from "../data";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const initialScrollY = window.scrollY;

    const handleScrollClose = () => {
      if (Math.abs(window.scrollY - initialScrollY) > 5) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScrollClose, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollClose);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / totalScroll)));
      }

      const navItems = siteData.header.nav;
      let currentSection = "";
      const scrollThreshold = window.innerHeight * 0.35; // 35% from top of screen

      for (const item of navItems) {
        const id = item.href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= scrollThreshold) {
            currentSection = item.name;
          }
        }
      }

      // If at very top of page (hero), clear selection if About section hasn't reached threshold
      if (window.scrollY < 200) {
        const aboutElem = document.getElementById("about");
        if (aboutElem && aboutElem.getBoundingClientRect().top > scrollThreshold) {
          currentSection = "";
        }
      }

      // If we are near the very bottom of the page, highlight the last item (Community)
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 120) {
        currentSection = navItems[navItems.length - 1].name;
      }

      setActiveItem(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 mx-auto w-[calc(100%-1.25rem)] sm:w-[calc(100%-2.5rem)] max-w-[1400px] z-50 transition-all duration-300">
      <nav className="bg-[#fffdf5]/80 dark:bg-slate-900/80 backdrop-blur-xl border border-pink-200/40 dark:border-slate-700/60 shadow-sm shadow-pink-100/20 dark:shadow-black/40 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex justify-between items-center relative transition-colors duration-500">
        
        {/* Soft Fuwa Fuwa Live Scroll Progress Line at Bottom Edge of Navbar */}
        <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-pink-100/30 dark:bg-slate-800/50 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-pink-300 via-rose-200 to-pink-400 dark:from-pink-800 dark:via-purple-800 dark:to-pink-700 rounded-full origin-left"
            style={{ scaleX: scrollProgress, transformOrigin: "0%" }}
          />
        </div>

        {/* Brand / Name */}
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 sm:gap-2.5 group mr-2 sm:mr-8">
          {/* Pulsating & Rotating Beacon Star Logo */}
          <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 shrink-0">
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-pink-300 dark:bg-purple-500 rounded-full blur-md"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="relative flex items-center justify-center w-full h-full z-10 text-pink-500 dark:text-purple-300 drop-shadow-[0_0_6px_rgba(249,157,181,0.6)] transform-gpu"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                <path d="M12 0C12.5 6 18 11.5 24 12C18 12.5 12.5 18 12 24C11.5 18 6 12.5 0 12C6 11.5 11.5 6 12 0Z" />
              </svg>
            </motion.div>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-800 dark:text-white font-medium tracking-wide text-xs sm:text-sm leading-tight">
              AnnChan<span className="text-pink-500 dark:text-purple-300">【杏】</span>
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 tracking-tight">
              Anisong Singer ✦ Streamer
            </span>
          </div>
        </a>

        {/* Desktop Central Capsule Menu */}
        <div className="hidden sm:flex items-center gap-1 bg-gray-100/70 dark:bg-slate-800/70 backdrop-blur-md px-3 py-1 rounded-full border border-gray-200/50 dark:border-slate-700/60">
          {siteData.header.nav.map((item) => {
            const isActive = activeItem === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveItem(item.name)}
                className={`relative px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 ${
                  isActive 
                    ? "text-pink-500 dark:text-purple-300 bg-white dark:bg-slate-700/80 shadow-sm" 
                    : "text-gray-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-purple-300 hover:bg-white/60 dark:hover:bg-slate-700/50"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Desktop Theme Toggle & Socials */}
        <div className="hidden sm:flex items-center gap-2.5 pl-4 ml-auto sm:ml-0">
          <ThemeToggle />
          <a 
            href="#socials"
            className="group inline-flex items-center gap-1.5 text-xs font-medium tracking-wide bg-pink-400 dark:bg-purple-600 text-white hover:bg-pink-50 dark:hover:bg-slate-800 hover:text-pink-600 dark:hover:text-purple-300 px-3.5 py-1.5 rounded-full border border-pink-300/60 dark:border-purple-500/60 hover:border-pink-200 dark:hover:border-slate-700 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:scale-105 active:scale-95 ml-2"
          >
            <span>Socials</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-slate-200 hover:text-pink-500 dark:hover:text-purple-300 p-1.5 rounded-full hover:bg-pink-50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
          </button>
        </div>

        {/* Floating Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-2.5 bg-[#fffdf5]/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-pink-200/60 dark:border-slate-700/80 p-3.5 shadow-2xl shadow-pink-200/30 dark:shadow-purple-950/50 sm:hidden overflow-hidden z-50"
            >
              <div className="space-y-1.5">
                {siteData.header.nav.map((item) => {
                  const isActive = activeItem === item.name;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setActiveItem(item.name);
                        setIsOpen(false);
                      }}
                      className={`flex items-center justify-between font-medium rounded-2xl px-4 py-3 transition-all duration-200 text-xs sm:text-sm tracking-wide ${
                        isActive
                          ? "bg-pink-100/70 dark:bg-purple-900/40 text-pink-600 dark:text-purple-300 shadow-sm border border-pink-200/50 dark:border-purple-700/40 font-semibold"
                          : "text-gray-700 dark:text-slate-200 hover:text-pink-500 dark:hover:text-purple-300 hover:bg-pink-50/60 dark:hover:bg-slate-800/60"
                      }`}
                    >
                      <span>{item.name}</span>
                      {isActive && (
                        <span className="text-pink-400 dark:text-purple-300 text-xs">✦</span>
                      )}
                    </a>
                  );
                })}
                <div className="pt-2.5 mt-1 border-t border-pink-100 dark:border-slate-800/80">
                  <a
                    href="#socials"
                    onClick={() => setIsOpen(false)}
                    className="group w-full text-center bg-pink-400 dark:bg-purple-600 text-white hover:bg-pink-500 dark:hover:bg-purple-500 font-medium py-3 rounded-2xl text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-2 border border-pink-300/60 dark:border-purple-500/60 transition-all duration-300 shadow-md shadow-pink-300/30 dark:shadow-none active:scale-[0.98]"
                  >
                    <span>Socials</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

