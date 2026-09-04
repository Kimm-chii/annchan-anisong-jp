import { useState, useEffect } from "react";
import { siteData } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Cat, Music2, Camera } from "lucide-react";

export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageUrls = siteData.about.imageUrls || [];

  useEffect(() => {
    if (imageUrls.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
    }, 4500); // Crossfade every 4.5 seconds
    
    return () => clearInterval(timer);
  }, [imageUrls.length]);

  return (
    <section id="about" className="pt-16 sm:pt-24 pb-16 sm:pb-28 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 relative">
          
          {/* Decorative background blobs to anchor the section smoothly */}
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-pink-100/40 dark:bg-purple-900/10 rounded-full blur-3xl -z-10 -translate-y-1/2 -translate-x-1/3 transition-colors"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-rose-100/40 dark:bg-pink-900/10 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/3 transition-colors"></div>

          {/* Fading Image Carousel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-[300px] sm:max-w-sm lg:max-w-md mx-auto md:mx-0 relative px-2 sm:px-0"
          >
            {/* Animated Blob behind image */}
            <motion.div 
              animate={{ 
                borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"] 
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-pink-100/60 to-rose-50/60 dark:from-purple-900/20 dark:to-slate-800/40 backdrop-blur-xl -z-10"
            ></motion.div>
            
            <div className="relative group aspect-square w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-pink-200/40 dark:shadow-black/30 border-4 sm:border-[6px] border-white dark:border-slate-800 transition-colors">
              <AnimatePresence mode="popLayout">
                {imageUrls.length > 0 && (
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    src={imageUrls[currentImageIndex]}
                    alt="About AnnChan"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </AnimatePresence>
            </div>
            
            {/* Floating japan badge */}
            <div className="absolute bottom-2 left-2 sm:-bottom-4 sm:-left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-medium tracking-widest uppercase text-pink-600 dark:text-purple-300 shadow-xl border border-pink-100 dark:border-slate-700 flex items-center gap-1.5 sm:gap-2 z-10 transition-colors">
              <span>🇯🇵 Based in Japan</span>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50/80 dark:bg-purple-950/40 border border-pink-200/60 dark:border-purple-800/40 text-pink-500 dark:text-purple-300 font-medium text-[10px] sm:text-[11px] uppercase tracking-widest mb-4 shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-pink-500 dark:text-purple-300" />
              <span>Get To Know Ann</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-800 dark:text-white mb-6 tracking-tight">
              {siteData.about.title}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-slate-300 leading-relaxed font-light transition-colors mb-8 tracking-wide">
              {siteData.about.content}
            </p>
            
            {/* Interest Badges / Little Things */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-200 dark:via-slate-700 to-transparent my-10"></div>

            <div className="text-center md:text-left">
              <h3 className="text-[10px] sm:text-[11px] font-medium tracking-widest text-gray-400 dark:text-slate-500 uppercase mb-8">
                Little Things I Love
              </h3>
              
              <div className="flex flex-row flex-wrap justify-center md:justify-start gap-6 sm:gap-14">
                
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-pink-400 dark:text-purple-300 shadow-md shadow-pink-100/50 dark:shadow-none border border-pink-100 dark:border-slate-700 transition-transform hover:scale-110">
                    <Cat className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium tracking-widest text-gray-500 dark:text-slate-400 uppercase">Cats ♡</span>
                </div>
                
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-purple-400 dark:text-purple-300 shadow-md shadow-purple-100/50 dark:shadow-none border border-purple-100 dark:border-slate-700 transition-transform hover:scale-110">
                    <Camera className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium tracking-widest text-gray-500 dark:text-slate-400 uppercase">Visuals 🎞</span>
                </div>
                
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-rose-400 dark:text-rose-300 shadow-md shadow-rose-100/50 dark:shadow-none border border-rose-100 dark:border-slate-700 transition-transform hover:scale-110">
                    <Music2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium tracking-widest text-gray-500 dark:text-slate-400 uppercase">Anisong ♫</span>
                </div>

              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
