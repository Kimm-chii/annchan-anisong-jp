import { siteData } from "../data";
import { motion } from "motion/react";
import { Music, Star, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="min-h-[calc(100vh-80px)] pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-16 overflow-hidden relative flex flex-col justify-center">
      {/* Top Edge Gradient Blur */}
      <div className="absolute top-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-b from-pink-100/50 via-pink-50/20 to-transparent dark:from-purple-950/30 dark:to-transparent pointer-events-none -z-10"></div>

      {/* Decorative Background Elements */}
      <div className="absolute top-16 left-4 sm:left-10 text-pink-200 animate-pulse hidden sm:block">
        <Star size={28} className="fill-current" />
      </div>
      <div className="absolute top-14 right-4 sm:right-20 text-yellow-200 animate-bounce" style={{ animationDuration: '3s' }}>
        <Star size={20} className="fill-current sm:w-[26px] sm:h-[26px]" />
      </div>
      <div className="absolute bottom-8 left-1/4 text-blue-200 animate-pulse" style={{ animationDuration: '4s' }}>
        <Heart size={20} className="fill-current sm:w-[28px] sm:h-[28px]" />
      </div>
      <div className="absolute top-28 right-4 sm:right-10 text-pink-300 animate-bounce hidden sm:block" style={{ animationDuration: '5s' }}>
        <Music size={28} />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-block bg-white/70 dark:bg-slate-800/70 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-pink-500 dark:text-purple-400 font-bold tracking-wider text-[11px] sm:text-xs md:text-sm mb-2.5 sm:mb-4 shadow-sm border border-pink-100 dark:border-slate-700 transition-colors">
              {siteData.hero.greeting}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight mb-2.5 sm:mb-4 transition-colors tracking-tight">
              {siteData.hero.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-slate-300 mb-4 sm:mb-6 leading-relaxed max-w-xl mx-auto md:mx-0 transition-colors">
              {siteData.hero.subtitle}
            </p>
            <div className="flex flex-row items-center gap-2.5 sm:gap-3.5 justify-center md:justify-start w-full sm:w-auto">
              <a 
                href={siteData.hero.ctaLink}
                className="flex-1 sm:flex-initial bg-pink-400 hover:bg-pink-500 dark:bg-purple-600 dark:hover:bg-purple-500 text-white text-xs sm:text-sm md:text-base font-bold px-4 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all shadow-md sm:shadow-lg shadow-pink-300/40 dark:shadow-none hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <Music size={15} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                {siteData.hero.ctaText}
              </a>
              <a 
                href="#about"
                className="flex-1 sm:flex-initial bg-white dark:bg-slate-800 hover:bg-pink-50 dark:hover:bg-slate-700 text-pink-500 dark:text-purple-400 border border-pink-200 sm:border-2 dark:border-slate-600 text-xs sm:text-sm md:text-base font-bold px-4 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-[200px] sm:max-w-xs md:max-w-sm mx-auto relative mt-1 md:mt-0"
          >
            {/* Cute blob background behind image */}
            <div className="absolute inset-0 bg-pink-200 dark:bg-purple-900/30 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-spin-slow -z-10 blur-xl opacity-50 scale-105 transition-colors"></div>
            
            <div className="relative rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border-3 sm:border-8 border-white dark:border-slate-800 shadow-lg sm:shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 aspect-[4/5]">
              <img 
                src={siteData.hero.imageUrl} 
                alt="AnnChan" 
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient for cuteness */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 dark:from-slate-900/60 to-transparent transition-colors"></div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-2 right-0 sm:-right-2 bg-white dark:bg-slate-800 text-pink-500 dark:text-purple-400 font-bold py-1 px-3 sm:py-2 sm:px-5 rounded-full border sm:border-4 border-pink-100 dark:border-slate-700 shadow-md text-[10px] sm:text-sm flex items-center gap-1.5 transition-colors">
              <span>It's me, AnnChan! 🌸</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Section Edge Gradient Divider */}
      <div className="mt-12 sm:mt-16 h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-pink-200/80 dark:via-purple-900/60 to-transparent"></div>
    </section>
  );
}
