import { siteData } from "../data";
import { motion } from "motion/react";
import { Play } from "lucide-react";

export default function Hero() {
  const latestRelease = siteData.music.albums[0];

  return (
    <section id="home" className="min-h-screen pt-20 sm:pt-36 pb-10 sm:pb-16 overflow-hidden relative flex flex-col justify-center">
      
      {/* Delicate floating background elements */}
      <motion.div 
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-[10%] text-pink-200 dark:text-purple-900/40 text-2xl font-serif select-none pointer-events-none"
      >
        ✦
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 right-[15%] text-pink-300 dark:text-purple-800/40 text-xl font-serif select-none pointer-events-none"
      >
        ♡
      </motion.div>
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-[25%] w-24 h-24 rounded-full bg-gradient-to-tr from-pink-100/40 to-transparent dark:from-purple-900/20 blur-2xl pointer-events-none"
      ></motion.div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-16 lg:gap-20">
          
          {/* LEFT SIDE - Simple & Cute Typography */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start w-full"
          >
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-3 sm:mb-5">
              <div className="inline-block bg-pink-100 dark:bg-purple-900/40 text-pink-500 dark:text-purple-300 rounded-full px-3.5 py-1 sm:px-4 sm:py-1.5 font-medium text-[10px] sm:text-[11px] tracking-widest shadow-sm border border-pink-200/60 dark:border-purple-700/50 uppercase">
                {siteData.hero.greeting}
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium text-gray-800 dark:text-white leading-[1.1] mb-3 sm:mb-5 tracking-tight">
              {siteData.hero.title}
            </h1>
            
            <div className="mb-6 sm:mb-10 max-w-xs sm:max-w-md">
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-slate-300 leading-relaxed font-light tracking-wide">
                {siteData.hero.subtitle.split('\n')[0]}
              </p>
              {siteData.hero.subtitle.split('\n').length > 1 && (
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 dark:text-slate-500 font-light tracking-wide mt-3 sm:mt-4 whitespace-pre-line">
                  {siteData.hero.subtitle.split('\n').slice(1).join('\n')}
                </p>
              )}
            </div>
            
            <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-5 mt-2">
              <a 
                href={siteData.hero.ctaLink}
                className="inline-flex items-center justify-center gap-2 bg-pink-400 hover:bg-pink-500 dark:bg-purple-600 dark:hover:bg-purple-500 text-white text-[10px] sm:text-xs font-medium tracking-widest uppercase px-5 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all shadow-md shadow-pink-300/40 dark:shadow-none hover:shadow-lg hover:-translate-y-0.5"
              >
                <Play size={13} fill="currentColor" />
                Listen Now ♡
              </a>
              
              <div className="flex flex-col items-center lg:items-start gap-3">
                {/* Quick Socials Row */}
                <div className="flex items-center gap-2">
                  <a href={siteData.socials.twitch} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm text-gray-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-purple-300 hover:bg-white dark:hover:bg-slate-700 shadow-sm border border-pink-50 dark:border-slate-700/50 transition-all hover:-translate-y-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"/></svg>
                  </a>
                  <a href={siteData.socials.twitter} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm text-gray-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-purple-300 hover:bg-white dark:hover:bg-slate-700 shadow-sm border border-pink-50 dark:border-slate-700/50 transition-all hover:-translate-y-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                  </a>
                  <a href={siteData.socials.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm text-gray-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-purple-300 hover:bg-white dark:hover:bg-slate-700 shadow-sm border border-pink-50 dark:border-slate-700/50 transition-all hover:-translate-y-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href={siteData.socials.tiktok} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm text-gray-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-purple-300 hover:bg-white dark:hover:bg-slate-700 shadow-sm border border-pink-50 dark:border-slate-700/50 transition-all hover:-translate-y-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                  </a>
                  <a href={siteData.socials.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm text-gray-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-purple-300 hover:bg-white dark:hover:bg-slate-700 shadow-sm border border-pink-50 dark:border-slate-700/50 transition-all hover:-translate-y-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                </div>

                <div className="flex items-center gap-1.5 text-gray-400 dark:text-slate-500 font-light text-[10px] sm:text-[11px] tracking-wide ml-1">
                  <span>📍</span>
                  <span>Based in Japan</span>
                </div>
              </div>
            </div>

            {/* Now Playing Strip */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-6 sm:mt-12 lg:mt-16 w-full max-w-[270px] sm:max-w-[300px] flex items-center p-1.5 sm:p-2 rounded-2xl border border-pink-100/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-800/50 backdrop-blur-md shadow-[0_4px_24px_rgba(244,114,182,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0 bg-slate-100 mr-3 sm:mr-4 relative">
                <img src={latestRelease.coverUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <div className="flex-1 min-w-0 pr-2 sm:pr-3 flex flex-col justify-center">
                <div className="text-[9px] tracking-[0.15em] text-pink-500 dark:text-purple-400 uppercase mb-0.5 font-medium flex items-center gap-1">
                  Now Playing
                </div>
                <div className="text-[11px] sm:text-xs md:text-sm text-gray-700 dark:text-slate-200 truncate font-medium">
                  {latestRelease.title}
                </div>
              </div>
              <a 
                href={latestRelease.link} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-pink-400 dark:text-purple-300 shadow-sm border border-pink-50 dark:border-slate-600 hover:bg-pink-50 dark:hover:bg-slate-600 transition-colors"
                aria-label="Play on YouTube"
              >
                <Play size={13} fill="currentColor" className="ml-0.5" />
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Fuwa-Fuwa Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative w-full max-w-[260px] sm:max-w-[420px] lg:max-w-none mx-auto flex justify-center lg:justify-end"
          >
            {/* Organic Fuwa-Fuwa Background Shape */}
            <motion.div 
              animate={{ 
                borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"] 
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 sm:-inset-10 bg-gradient-to-tr from-pink-100/60 to-rose-50/60 dark:from-purple-900/20 dark:to-slate-800/40 backdrop-blur-xl -z-10"
            ></motion.div>
            
            <div className="relative z-10 aspect-[3/4] w-full max-w-[260px] sm:max-w-none lg:w-[460px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl sm:shadow-2xl shadow-pink-200/40 dark:shadow-black/40 group">
              <img 
                src={siteData.hero.imageUrl} 
                alt="AnnChan" 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/10 to-transparent dark:from-purple-900/30 mix-blend-overlay"></div>
            </div>

            {/* Floating foreground petal */}
            <motion.div 
              animate={{ y: [0, -12, 0], x: [0, 8, 0], rotate: [0, 15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-2 sm:-bottom-10 sm:-left-8 w-12 h-12 sm:w-20 sm:h-20 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-[40%_60%_70%_30%/40%_50%_60%_50%] border border-white/50 dark:border-slate-700/50 shadow-lg flex items-center justify-center z-20"
            >
              <span className="text-pink-400 text-base sm:text-2xl drop-shadow-sm">🌸</span>
            </motion.div>
            
            {/* Tiny floating star */}
            <motion.div 
              animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-4 right-0 sm:top-10 sm:-right-6 text-pink-300 dark:text-purple-400/80 text-base sm:text-xl font-serif select-none z-20"
            >
              ✦
            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="text-[9px] sm:text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400 dark:text-slate-500" style={{ writingMode: 'vertical-rl' }}>
          Scroll to explore
        </span>
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-pink-300 dark:text-purple-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
