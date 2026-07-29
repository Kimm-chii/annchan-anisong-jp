import { siteData } from "../data";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 mx-auto w-[calc(100%-1.25rem)] sm:w-[calc(100%-2.5rem)] max-w-5xl z-50 transition-all duration-300">
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/80 dark:border-slate-800/80 shadow-lg shadow-pink-100/40 dark:shadow-black/50 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex justify-between items-center relative">
        
        {/* Logo / Brand - Styled AnnChan's Room Badge */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-pink-400 via-rose-300 to-purple-400 text-white font-bold text-xs shadow-sm group-hover:scale-105 transition-transform">
            <span>🌸</span>
            <span className="absolute -top-0.5 -right-0.5 flex h-2 sm:h-2.5 w-2 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-pink-500"></span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-extrabold tracking-tight text-gray-800 dark:text-white text-sm sm:text-base">
            <span className="bg-gradient-to-r from-gray-800 via-pink-600 to-purple-600 dark:from-white dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
              AnnChan's
            </span>
            <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-pink-100/80 dark:bg-purple-900/60 text-pink-600 dark:text-purple-300 font-black tracking-wider uppercase border border-pink-200/60 dark:border-purple-700/50 flex items-center gap-1">
              ROOM <Sparkles className="w-2.5 h-2.5 inline text-pink-500 dark:text-purple-300" />
            </span>
          </div>
        </a>

        {/* Desktop Central Capsule Menu */}
        <div className="hidden md:flex items-center gap-1 bg-gray-100/70 dark:bg-slate-800/70 backdrop-blur-md px-3 py-1 rounded-full border border-gray-200/50 dark:border-slate-700/60">
          {siteData.header.nav.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-purple-300 hover:bg-white dark:hover:bg-slate-700/80 font-bold px-3.5 py-1 rounded-full transition-all duration-200 text-xs sm:text-sm tracking-wide uppercase"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Desktop Right Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          <ThemeToggle />
          <a 
            href="#socials"
            className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 px-4 py-1.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all text-xs sm:text-sm flex items-center gap-1.5 group hover:scale-[1.02] active:scale-95"
          >
            <span>Socials</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center gap-1.5">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-slate-200 hover:text-pink-500 dark:hover:text-purple-300 p-1.5 rounded-full hover:bg-pink-50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Floating Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-pink-100/80 dark:border-slate-800 p-3 shadow-xl md:hidden overflow-hidden"
            >
              <div className="space-y-1">
                {siteData.header.nav.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-center text-gray-700 dark:text-slate-200 hover:text-pink-500 dark:hover:text-purple-300 hover:bg-pink-50/80 dark:hover:bg-slate-800/80 font-bold rounded-xl py-2 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-2 border-t border-pink-100 dark:border-slate-800 flex justify-center">
                  <a
                    href="#socials"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center bg-gray-900 dark:bg-white text-white dark:text-slate-900 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Socials</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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

