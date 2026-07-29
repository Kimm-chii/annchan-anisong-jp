import { siteData } from "../data";
import { motion } from "motion/react";
import { Sparkles, Heart, Film, Cat, Music2 } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="pt-8 sm:pt-16 pb-12 sm:pb-20 md:pb-24 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-12 shadow-xl sm:shadow-2xl shadow-pink-100/50 dark:shadow-black/40 border border-pink-100/80 dark:border-slate-700/80 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden transition-colors">
          
          {/* Edge Gradient Glow Overlay */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-300 via-rose-400 to-purple-400 dark:from-purple-900 dark:via-purple-500 dark:to-indigo-900 opacity-80"></div>

          {/* Decorative background blobs */}
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-pink-100/50 dark:bg-purple-900/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 transition-colors"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-purple-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2 transition-colors"></div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-[260px] sm:max-w-sm mx-auto md:mx-0"
          >
            <div className="relative group">
              {/* Cute dashed border behind image */}
              <div className="absolute inset-0 border-2 sm:border-4 border-dashed border-pink-300 dark:border-purple-800/60 rounded-[1.8rem] sm:rounded-[2.2rem] transform translate-x-2.5 translate-y-2.5 sm:translate-x-4 sm:translate-y-4 -z-10 transition-colors"></div>
              
              <img 
                src={siteData.about.imageUrl} 
                alt="About AnnChan" 
                className="w-full aspect-[4/3] object-cover rounded-[1.5rem] sm:rounded-[2rem] shadow-lg border-2 sm:border-4 border-white dark:border-slate-700 transition-transform duration-300 group-hover:scale-[1.01]"
              />

              {/* Floating japan badge */}
              <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold text-pink-600 dark:text-purple-300 shadow-md border border-pink-100 dark:border-slate-800 flex items-center gap-1.5">
                <span>🇯🇵 Based in Japan</span>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 dark:bg-purple-950/60 border border-pink-200/60 dark:border-purple-800/60 text-pink-500 dark:text-purple-300 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3 text-pink-500 dark:text-purple-300" />
              <span>Get To Know Ann</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-4 sm:mb-5 block relative transition-colors tracking-tight">
              {siteData.about.title}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-slate-300 leading-relaxed font-medium transition-colors mb-6">
              {siteData.about.content}
            </p>
            
            {/* Interest Badges */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-center md:justify-start">
              <div className="bg-pink-50 dark:bg-slate-700/80 text-pink-600 dark:text-purple-300 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-pink-200/50 dark:border-slate-600 flex items-center gap-1.5 shadow-sm">
                <Music2 className="w-3.5 h-3.5" />
                <span>Anisong Artist</span>
              </div>
              <div className="bg-purple-50 dark:bg-slate-700/80 text-purple-600 dark:text-purple-300 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-purple-200/50 dark:border-slate-600 flex items-center gap-1.5 shadow-sm">
                <Film className="w-3.5 h-3.5" />
                <span>Cinematography</span>
              </div>
              <div className="bg-rose-50 dark:bg-slate-700/80 text-rose-600 dark:text-rose-300 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-rose-200/50 dark:border-slate-600 flex items-center gap-1.5 shadow-sm">
                <Cat className="w-3.5 h-3.5" />
                <span>Cat Lover</span>
              </div>
              <div className="bg-blue-50 dark:bg-slate-700/80 text-blue-600 dark:text-blue-300 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-blue-200/50 dark:border-slate-600 flex items-center gap-1.5 shadow-sm">
                <Heart className="w-3.5 h-3.5" />
                <span>Beautiful Visuals</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
