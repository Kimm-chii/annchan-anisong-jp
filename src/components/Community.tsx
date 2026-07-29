import { motion } from "motion/react";
import { siteData } from "../data";
import { Sparkles, MessageCircleHeart } from "lucide-react";

const DiscordIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className="w-4 h-4 sm:w-5 sm:h-5"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
  </svg>
);

export default function Community() {
  return (
    <section id="community" className="py-10 sm:py-16 md:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-indigo-50/60 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 shadow-xl shadow-indigo-100/40 dark:shadow-black/30 border border-indigo-100/80 dark:border-slate-700/80 text-center relative overflow-hidden transition-colors"
        >
          {/* Top Edge Gradient Accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#5865F2] via-purple-400 to-indigo-500 opacity-80"></div>

          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-indigo-200/50 dark:bg-indigo-900/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 transition-colors"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-purple-200/50 dark:bg-purple-900/20 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2 transition-colors"></div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-100/80 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800/80 text-[#5865F2] dark:text-indigo-300 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider mb-2.5 shadow-sm">
            <MessageCircleHeart className="w-3.5 h-3.5 text-[#5865F2] dark:text-indigo-300" />
            <span>Hang Out With Us</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-3 tracking-tight">
            {siteData.community.title}
          </h2>
          
          <p className="text-xs sm:text-base text-gray-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-xl mx-auto transition-colors leading-relaxed font-medium">
            {siteData.community.content}
          </p>

          <a 
            href={siteData.community.discordLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs sm:text-base font-extrabold px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full transition-all shadow-md shadow-[#5865F2]/30 dark:shadow-none hover:shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <DiscordIcon />
            <span>Join the Discord</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

