import { siteData } from "../data";
import { motion } from "motion/react";
import { Instagram, Twitter, Youtube, Music2, Facebook, Twitch } from "lucide-react";
import { ReactNode } from "react";

const TiktokIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  return (
    <footer id="socials" className="bg-white dark:bg-slate-900 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 border-t-2 sm:border-t-4 border-pink-50 dark:border-slate-800 relative overflow-hidden transition-colors">
      {/* Top Edge Gradient Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-200 via-pink-400 to-purple-300 dark:from-purple-900 dark:via-purple-500 dark:to-indigo-900 opacity-70"></div>
      
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-500 dark:text-purple-400 mb-4 sm:mb-6 flex items-center justify-center gap-2 transition-colors tracking-tight">
            {siteData.header.title}
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto transition-colors leading-relaxed">
            Thank you for visiting my little corner of the internet. Let's stay connected! 💕
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 flex-wrap">
            <SocialLink href={siteData.socials.youtube} icon={<Youtube className="w-5 h-5 sm:w-6 sm:h-6" />} label="YouTube" />
            <SocialLink href={siteData.socials.instagram} icon={<Instagram className="w-5 h-5 sm:w-6 sm:h-6" />} label="Instagram" />
            <SocialLink href={siteData.socials.twitter} icon={<Twitter className="w-5 h-5 sm:w-6 sm:h-6" />} label="Twitter" />
            <SocialLink href={siteData.socials.facebook} icon={<Facebook className="w-5 h-5 sm:w-6 sm:h-6" />} label="Facebook" />
            <SocialLink href={siteData.socials.tiktok} icon={<TiktokIcon />} label="TikTok" />
            <SocialLink href={siteData.socials.twitch} icon={<Twitch className="w-5 h-5 sm:w-6 sm:h-6" />} label="Twitch" />
            <SocialLink href={siteData.socials.gank} icon={<Music2 className="w-5 h-5 sm:w-6 sm:h-6" />} label="Gank" />
          </div>
        </motion.div>

        <div className="border-t border-pink-100 dark:border-slate-800 pt-6 sm:pt-8 mt-6 sm:mt-8 transition-colors">
          <p className="text-gray-400 dark:text-slate-500 text-xs sm:text-sm font-medium transition-colors">
            {siteData.footer.text}
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-50 dark:bg-slate-800 text-pink-400 dark:text-purple-400 rounded-full flex items-center justify-center hover:bg-pink-400 dark:hover:bg-purple-600 hover:text-white dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
    >
      {icon}
    </a>
  );
}
