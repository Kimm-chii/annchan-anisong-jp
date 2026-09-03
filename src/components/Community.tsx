import { useState, useEffect, ReactNode, FormEvent, ChangeEvent } from "react";
import { motion } from "motion/react";
import { siteData } from "../data";
import { 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  Send, 
  Heart, 
  CheckCircle2, 
  MessageCircleHeart, 
  Instagram, 
  Twitter, 
  Youtube, 
  Facebook, 
  Twitch, 
  Sparkles,
  ExternalLink
} from "lucide-react";

// TikTok SVG Icon
const TiktokIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Discord SVG Icon
const DiscordIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
  </svg>
);

export default function Community() {
  // Message Form State
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const lastSent = localStorage.getItem("annchan_msg_sent");
    if (lastSent) {
      const timePassed = Math.floor((Date.now() - parseInt(lastSent, 10)) / 1000);
      if (timePassed < 60) {
        setCooldown(60 - timePassed);
      }
    }
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (cooldown > 0 || isSubmitting) return;

    setIsSubmitting(true);

    if (formData.honeypot !== "") {
      setTimeout(() => {
        setIsSubmitting(false);
        setCooldown(60);
        localStorage.setItem("annchan_msg_sent", Date.now().toString());
        setFormData({ name: "", message: "", honeypot: "" });
      }, 800);
      return;
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setCooldown(60);
      localStorage.setItem("annchan_msg_sent", Date.now().toString());
      setFormData({ name: "", message: "", honeypot: "" });
    }, 1200);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="diary-community" className="py-12 sm:py-20 relative scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
          
          {/* ================= LEFT COLUMN: DIARY (Sticky on desktop, fuwa fuwa & compressed) ================= */}
          <div id="diary" className="lg:col-span-5 lg:sticky lg:top-28 self-start transition-all">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-xl rounded-[2.2rem] sm:rounded-[2.5rem] p-5 sm:p-7 shadow-xl shadow-pink-100/40 dark:shadow-black/30 border border-pink-100/90 dark:border-slate-700/80 relative overflow-hidden"
            >
              {/* Cute Top Accent Ribbon */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-200 via-rose-200 to-pink-300 dark:from-pink-900/60 dark:via-purple-900/60 dark:to-pink-900/60 opacity-90"></div>

              {/* Header Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 dark:bg-purple-950/60 border border-pink-200/60 dark:border-purple-800/60 text-pink-500 dark:text-purple-300 font-medium text-[10px] sm:text-[11px] uppercase tracking-widest shadow-sm">
                  <BookOpen className="w-3.5 h-3.5 text-pink-500 dark:text-purple-300" />
                  <span>日々のこと</span>
                </div>
                <span className="text-[10px] font-medium tracking-widest uppercase text-pink-400 dark:text-purple-400/80 bg-pink-100/50 dark:bg-slate-900/50 px-2.5 py-0.5 rounded-full border border-pink-200/40 dark:border-slate-700">
                  {siteData.blog.posts.length} Entries
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-white tracking-tight mb-2">
                Everyday things
              </h2>
              <p className="text-xs text-gray-500 dark:text-slate-400 font-light tracking-wide mb-6">
                A little collection of thoughts, moments, and memories.
              </p>

              {/* Compressed Feed of Diary Entries */}
              <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-pink-200 dark:scrollbar-thumb-slate-700">
                {siteData.blog.posts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="group bg-white/70 dark:bg-slate-900/60 hover:bg-pink-50/60 dark:hover:bg-slate-900/90 rounded-2xl p-3.5 border border-pink-100/70 dark:border-slate-800 transition-all duration-300 flex items-start gap-3.5 shadow-sm hover:shadow-md"
                  >
                    {/* Tiny Compact Thumbnail */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 relative border border-white dark:border-slate-700 shadow-sm">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[9px] font-medium tracking-widest text-pink-500 dark:text-purple-300 uppercase mb-1">
                        <Calendar className="w-3 h-3 text-pink-400" />
                        <span>{post.date}</span>
                      </div>
                      
                      <h3 className="text-xs sm:text-sm font-medium text-gray-800 dark:text-slate-100 group-hover:text-pink-500 dark:group-hover:text-purple-300 transition-colors line-clamp-1 leading-snug mb-1">
                        <a href={post.link} target="_blank" rel="noopener noreferrer">
                          {post.title}
                        </a>
                      </h3>

                      <p className="text-[11px] text-gray-500 dark:text-slate-400 line-clamp-2 font-light leading-relaxed mb-2">
                        {post.excerpt}
                      </p>

                      <a 
                        href={post.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1 text-[10px] font-medium tracking-widest uppercase text-pink-500 dark:text-purple-300 hover:text-pink-600 dark:hover:text-purple-200 transition-colors"
                      >
                        <span>Read Post</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Fuwa Fuwa Footer Note */}
              <div className="mt-5 pt-4 border-t border-dashed border-pink-100 dark:border-slate-700/60 flex items-center justify-center text-[10px] text-pink-400 dark:text-purple-400 font-serif tracking-widest">
                ✦ ✦ ✦
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: MESSAGE, DISCORD & SOCIALS ================= */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            
            {/* 1. Send Message Form Section */}
            <div id="message" className="relative">
              {/* Animated Blob behind form card */}
              <motion.div 
                animate={{ 
                  borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"] 
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-pink-100/60 to-rose-50/60 dark:from-purple-900/20 dark:to-slate-800/40 backdrop-blur-xl -z-10"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2.2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-xl shadow-pink-100/40 dark:shadow-black/30 border border-pink-100/90 dark:border-slate-700/80 relative overflow-hidden"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 dark:bg-purple-950/60 border border-pink-200/60 dark:border-purple-800/60 text-pink-500 dark:text-purple-300 font-medium text-[10px] sm:text-[11px] uppercase tracking-widest mb-3 shadow-sm">
                  <Heart className="w-3.5 h-3.5 text-pink-500 dark:text-purple-300" />
                  <span>Message Box</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-medium text-gray-800 dark:text-white tracking-tight mb-2">
                  Send a Letter ✦
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-light tracking-wide mb-6">
                  Say hi to AnnChan, ask a question, or leave some love! 🌸
                </p>

                {cooldown > 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in duration-500 bg-pink-50/50 dark:bg-slate-900/50 rounded-2xl border border-pink-100 dark:border-slate-800">
                    <div className="w-14 h-14 bg-pink-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mb-3 shadow-sm">
                      <CheckCircle2 className="w-7 h-7 text-pink-500 dark:text-purple-300" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
                      Message Sent!
                    </h3>
                    <p className="text-gray-500 dark:text-slate-400 text-xs sm:text-sm max-w-sm font-light tracking-wide">
                      Thank you so much for your sweet message! ♡
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-pink-500 dark:text-purple-400 bg-white dark:bg-purple-950/50 px-4 py-2 rounded-full border border-pink-100 dark:border-slate-700 shadow-sm">
                      Next letter allowed in {cooldown}s
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div className="absolute w-0 h-0 opacity-0 -z-50 pointer-events-none overflow-hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="honeypot"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.honeypot}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-[10px] font-medium text-gray-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 pl-1">
                        Your Name / Handle
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ann, or your @ handle"
                        className="w-full bg-white/90 dark:bg-slate-900/90 border border-pink-100 dark:border-slate-700 rounded-xl sm:rounded-2xl px-4 py-3 text-xs sm:text-sm text-gray-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500 shadow-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[10px] font-medium text-gray-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 pl-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Say hi to AnnChan, ask a question, or leave some love! ✨"
                        className="w-full bg-white/90 dark:bg-slate-900/90 border border-pink-100 dark:border-slate-700 rounded-xl sm:rounded-2xl px-4 py-3 text-xs sm:text-sm text-gray-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500 resize-none shadow-sm"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || cooldown > 0}
                      className="w-full bg-pink-400 hover:bg-pink-500 dark:bg-purple-600 dark:hover:bg-purple-500 text-white font-medium text-[11px] sm:text-xs tracking-widest uppercase rounded-xl sm:rounded-2xl px-6 py-3.5 flex items-center justify-center gap-2 transition-all shadow-md shadow-pink-200/50 dark:shadow-none hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">Sending...</span>
                      ) : (
                        <>
                          <span>Send Letter</span>
                          <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* 2. Discord CTA Section */}
            <div id="discord">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2.2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-xl shadow-pink-100/30 dark:shadow-black/30 border border-pink-100/90 dark:border-slate-700/80 relative overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-200 via-rose-200 to-indigo-200 dark:from-pink-900/50 dark:via-purple-900/50 dark:to-indigo-900/50 opacity-90"></div>

                {/* Subtle Floating Discord Watermark in Top-Right Background */}
                <div className="absolute -right-4 -top-4 text-[#5865F2]/10 dark:text-[#5865F2]/20 pointer-events-none transform rotate-12 scale-150 sm:scale-[2]">
                  <DiscordIcon />
                </div>

                <div className="relative z-10 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/80 dark:bg-indigo-950/80 text-[#5865F2] dark:text-indigo-300 font-medium text-[10px] uppercase tracking-widest mb-3 shadow-sm">
                    <DiscordIcon />
                    <span>Official Server</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-white mb-1.5">
                    {siteData.community.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-light leading-relaxed mb-5 max-w-lg">
                    {siteData.community.content}
                  </p>
                  <a
                    href={siteData.community.discordLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white text-[10px] sm:text-[11px] font-medium tracking-widest uppercase px-6 py-3 rounded-full transition-all shadow-md shadow-[#5865F2]/30 hover:scale-[1.02] active:scale-95"
                  >
                    <span>Join the Discord</span>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* 3. Socials Section ("Find Ann Elsewhere") */}
            <div id="socials">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2.2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-xl shadow-pink-100/40 dark:shadow-black/30 border border-pink-100/90 dark:border-slate-700/80 text-center relative overflow-hidden"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 dark:bg-purple-950/60 border border-pink-200/60 dark:border-purple-800/60 text-pink-500 dark:text-purple-300 font-medium text-[10px] sm:text-[11px] uppercase tracking-widest mb-3 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500 dark:text-purple-300" />
                  <span>Stay Connected</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-medium text-gray-800 dark:text-white tracking-tight mb-2">
                  Find Ann Elsewhere
                </h2>
                
                <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-light tracking-wide mb-8 max-w-md mx-auto">
                  music · streams · little moments ♡
                </p>

                {/* Social Links Grid with Smooth Hover Animation */}
                <div className="flex flex-wrap justify-center items-center gap-3.5 sm:gap-5">
                  <AnimatedSocialLink 
                    href={siteData.socials.youtube} 
                    icon={<Youtube className="w-5 h-5 sm:w-6 sm:h-6" />} 
                    label="YouTube"
                    hoverColor="hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]"
                  />
                  <AnimatedSocialLink 
                    href={siteData.socials.instagram} 
                    icon={<Instagram className="w-5 h-5 sm:w-6 sm:h-6" />} 
                    label="Instagram"
                    hoverColor="hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:border-rose-400"
                  />
                  <AnimatedSocialLink 
                    href={siteData.socials.twitter} 
                    icon={<Twitter className="w-5 h-5 sm:w-6 sm:h-6" />} 
                    label="Twitter / X"
                    hoverColor="hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white hover:border-black"
                  />
                  <AnimatedSocialLink 
                    href={siteData.socials.facebook} 
                    icon={<Facebook className="w-5 h-5 sm:w-6 sm:h-6" />} 
                    label="Facebook"
                    hoverColor="hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
                  />
                  <AnimatedSocialLink 
                    href={siteData.socials.tiktok} 
                    icon={<TiktokIcon />} 
                    label="TikTok"
                    hoverColor="hover:bg-slate-900 dark:hover:bg-pink-500 hover:text-white hover:border-slate-900"
                  />
                  <AnimatedSocialLink 
                    href={siteData.socials.twitch} 
                    icon={<Twitch className="w-5 h-5 sm:w-6 sm:h-6" />} 
                    label="Twitch"
                    hoverColor="hover:bg-[#9146FF] hover:text-white hover:border-[#9146FF]"
                  />
                  <AnimatedSocialLink 
                    href={siteData.socials.gank} 
                    icon={<ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />} 
                    label="Gank"
                    hoverColor="hover:bg-pink-500 hover:text-white hover:border-pink-500"
                  />
                </div>
              </motion.div>
            </div>

          </div>

        </div>

        {/* Soft Fuwa Fuwa Starry Line Break Before Footer */}
        <div className="mt-12 sm:mt-20 flex items-center justify-center gap-3 text-pink-300 dark:text-purple-400/60 font-serif">
          <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-pink-200 dark:via-slate-800 to-transparent"></span>
          <span className="text-xs text-pink-400 dark:text-purple-300 tracking-widest">✦ 🎀 ✦</span>
          <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-pink-200 dark:via-slate-800 to-transparent"></span>
        </div>

      </div>
    </section>
  );
}

// Custom Smooth Animated Social Link Component
function AnimatedSocialLink({ 
  href, 
  icon, 
  label, 
  hoverColor 
}: { 
  href: string; 
  icon: ReactNode; 
  label: string; 
  hoverColor: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group relative flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/90 dark:bg-slate-900/90 text-gray-700 dark:text-purple-300 rounded-2xl border border-pink-100 dark:border-slate-700/80 shadow-md transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-1.5 hover:rotate-3 hover:shadow-xl hover:shadow-pink-200/50 dark:hover:shadow-purple-900/40 ${hoverColor}`}
    >
      <div className="transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      {/* Hover Tooltip Label */}
      <span className="absolute -top-9 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 text-[10px] font-medium tracking-wide bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900 px-2.5 py-0.5 rounded-full whitespace-nowrap pointer-events-none shadow-md">
        {label}
      </span>
    </a>
  );
}
