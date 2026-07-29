import { siteData } from "../data";
import { motion } from "motion/react";
import { Play, Sparkles, ExternalLink, Disc } from "lucide-react";

export default function Music() {
  return (
    <section id="music" className="py-12 md:py-20 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/80 dark:bg-purple-950/80 border border-pink-200/80 dark:border-purple-800/80 text-pink-600 dark:text-purple-300 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider mb-2.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-500 dark:text-purple-300" />
            <span>Anisong Discography</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white tracking-tight flex items-center justify-center gap-2"
          >
            {siteData.music.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-slate-400 mt-2 max-w-md mx-auto"
          >
            Explore my latest Japanese song covers, vocal performances, and music videos.
          </motion.p>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
          {siteData.music.albums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-2.5 sm:p-5 shadow-md sm:shadow-lg shadow-pink-100/50 dark:shadow-black/30 border border-pink-100/80 dark:border-slate-700/80 hover:border-pink-300 dark:hover:border-purple-500/80 transition-all duration-300 group flex flex-row sm:flex-col items-center sm:items-stretch gap-3 sm:gap-0 justify-between hover:-translate-y-0.5 sm:hover:-translate-y-1"
            >
              <div className="flex flex-row sm:flex-col items-center sm:items-stretch gap-3 sm:gap-0 w-full">
                {/* Album Cover Container */}
                <div className="relative w-20 h-20 sm:w-full sm:h-auto sm:aspect-square rounded-xl sm:rounded-2xl overflow-hidden sm:mb-4 flex-shrink-0 group-hover:shadow-md transition-shadow">
                  <img 
                    src={album.coverUrl} 
                    alt={album.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  
                  {/* Top Badge (Hidden on mobile thumb, visible on sm+) */}
                  <div className="hidden sm:flex absolute top-2.5 left-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-pink-600 dark:text-purple-300 shadow-sm border border-pink-100 dark:border-slate-800 items-center gap-1">
                    <Disc className="w-3 h-3 text-pink-500 animate-spin-slow" />
                    <span>{album.date}</span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-pink-900/30 dark:bg-purple-900/50 backdrop-blur-[2px]">
                    <a 
                      href={album.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-pink-500 dark:bg-slate-900 dark:text-purple-300 p-2 sm:p-4 rounded-full shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300 hover:bg-pink-500 hover:text-white dark:hover:bg-purple-500 dark:hover:text-white"
                      aria-label={`Listen to ${album.title}`}
                    >
                      <Play fill="currentColor" className="w-4 h-4 sm:w-6 sm:h-6" />
                    </a>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-1 sm:pr-0">
                  <div className="flex items-center gap-1.5 sm:hidden mb-1">
                    <span className="text-[10px] font-bold text-pink-500 dark:text-purple-300 bg-pink-50 dark:bg-purple-950/80 px-2 py-0.5 rounded-full border border-pink-100 dark:border-purple-800/60 inline-flex items-center gap-1">
                      <Disc className="w-2.5 h-2.5 text-pink-500" />
                      {album.date}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-base font-bold text-gray-800 dark:text-white transition-colors leading-snug line-clamp-2 mb-1.5 sm:mb-2 group-hover:text-pink-500 dark:group-hover:text-purple-300">
                    {album.title}
                  </h3>
                  
                  {/* Mobile Watch Link */}
                  <div className="sm:hidden flex items-center justify-between pt-1">
                    <a
                      href={album.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-extrabold text-pink-500 dark:text-purple-400 hover:text-pink-600 transition-colors"
                    >
                      Watch <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Desktop Card Footer Action (sm+) */}
              <div className="hidden sm:flex mt-2 pt-2.5 border-t border-pink-50 dark:border-slate-700/60 items-center justify-between px-1">
                <span className="text-xs font-semibold text-gray-400 dark:text-slate-400">
                  YouTube Video
                </span>
                <a
                  href={album.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-pink-500 dark:text-purple-400 hover:text-pink-600 dark:hover:text-purple-300 transition-colors"
                >
                  Watch <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
