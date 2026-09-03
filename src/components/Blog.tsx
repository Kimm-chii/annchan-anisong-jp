import { siteData } from "../data";
import { motion } from "motion/react";
import { Calendar, ChevronRight, Sparkles, BookOpen } from "lucide-react";

export default function Blog() {
  return (
    <section id="blog" className="py-10 sm:py-16 md:py-20 bg-pink-50/50 dark:bg-slate-800/50 rounded-[2rem] sm:rounded-[3rem] mx-3 sm:mx-6 my-6 md:my-10 border-2 sm:border-4 border-white dark:border-slate-800 shadow-xl shadow-pink-100/50 dark:shadow-none relative overflow-hidden transition-colors">
      
      {/* Top Edge Gradient Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 dark:from-purple-800 dark:via-purple-600 dark:to-indigo-800 opacity-70"></div>

      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-60 transition-colors"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-60 transition-colors"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/80 dark:bg-purple-950/80 border border-pink-200/80 dark:border-purple-800/80 text-pink-600 dark:text-purple-300 font-medium text-[10px] sm:text-[11px] uppercase tracking-widest mb-2.5 shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5 text-pink-500 dark:text-purple-300" />
            <span>Personal Updates</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-medium text-gray-800 dark:text-white tracking-tight flex items-center justify-center gap-2"
          >
            {siteData.blog.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-slate-400 mt-2 max-w-md mx-auto font-light tracking-wide"
          >
            Catch up on my latest creative logs, unboxings, and memories!
          </motion.p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {siteData.blog.posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg shadow-pink-100/60 dark:shadow-black/30 border border-pink-100/80 dark:border-slate-700/80 flex flex-col h-full hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="h-36 sm:h-48 overflow-hidden relative">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-medium tracking-widest text-pink-600 dark:text-purple-300 flex items-center gap-1 shadow-sm border border-pink-100 dark:border-slate-800 uppercase">
                  <Calendar className="w-3 h-3 text-pink-500" />
                  {post.date}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-white mb-2 group-hover:text-pink-500 dark:group-hover:text-purple-300 transition-colors leading-snug">
                  <a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
                </h3>
                <p className="text-gray-500 dark:text-slate-400 line-clamp-2 sm:line-clamp-3 mb-4 flex-1 text-xs sm:text-sm leading-relaxed transition-colors font-light tracking-wide">
                  {post.excerpt}
                </p>
                <div className="pt-2 border-t border-pink-50 dark:border-slate-700/60 flex items-center justify-between">
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium tracking-widest uppercase text-pink-500 dark:text-purple-400 hover:text-pink-600 dark:hover:text-purple-300 transition-colors">
                    Read Post <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
      </div>
    </section>
  );
}

