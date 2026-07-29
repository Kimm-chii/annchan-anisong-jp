import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart } from "lucide-react";

export default function IntroSplash() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Shorter intro duration (2.4 seconds auto dismiss)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          onClick={handleDismiss}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 cursor-pointer select-none overflow-hidden"
        >
          {/* Animated Background Decorative Elements */}
          <div className="absolute top-1/4 left-8 text-pink-300 dark:text-purple-400/30 animate-pulse">
            <Sparkles size={28} />
          </div>
          <div className="absolute bottom-1/4 right-10 text-rose-300 dark:text-pink-400/30 animate-bounce" style={{ animationDuration: '3s' }}>
            <Heart size={24} />
          </div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-200/50 dark:bg-purple-900/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-purple-200/40 dark:bg-indigo-900/20 rounded-full blur-3xl -z-10"></div>

          {/* Main Content Box */}
          <div className="text-center px-6 max-w-lg relative z-10">
            {/* Music Note Symbol */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "backOut" }}
              className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg border border-pink-200/80 dark:border-purple-800/80 text-xl sm:text-2xl text-pink-500 dark:text-purple-300 mb-5 font-bold"
            >
              ♪
            </motion.div>

            {/* English Quote */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight leading-snug mb-3"
            >
              <span className="bg-gradient-to-r from-gray-900 via-pink-600 to-purple-600 dark:from-white dark:via-purple-200 dark:to-pink-300 bg-clip-text text-transparent">
                Every song<br />holds a memory.
              </span>
            </motion.h1>

            {/* Japanese Quote */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-sm sm:text-lg text-pink-600 dark:text-purple-300 font-semibold tracking-wide leading-relaxed font-serif"
            >
              一つひとつの歌に、<br />想いを込めて。
            </motion.p>

            {/* Quick entry tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="mt-8 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-pink-200/60 dark:border-slate-700 text-[11px] sm:text-xs text-pink-600 dark:text-purple-300 font-medium"
            >
              <span>Tap anywhere to skip</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
