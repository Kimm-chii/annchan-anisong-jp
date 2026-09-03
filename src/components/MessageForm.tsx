import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { motion } from "motion/react";
import { Send, Heart, CheckCircle2 } from "lucide-react";

export default function MessageForm() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    // Check if there's a stored cooldown timestamp
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prevent submission if on cooldown
    if (cooldown > 0 || isSubmitting) return;

    setIsSubmitting(true);

    // Honeypot check: if filled out, silently reject but mimic success
    if (formData.honeypot !== "") {
      setTimeout(() => {
        setIsSubmitting(false);
        setCooldown(60);
        localStorage.setItem("annchan_msg_sent", Date.now().toString());
        setFormData({ name: "", message: "", honeypot: "" });
      }, 800);
      return;
    }

    // Simulate sending message (e.g., API call)
    try {
      const response = await fetch("https://annchan-messages.sretii22.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          message: formData.message,
          phone: formData.honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error("Failed to send message");
      }

      setIsSubmitting(false);
      setCooldown(60);
      localStorage.setItem("annchan_msg_sent", Date.now().toString());
      setFormData({ name: "", message: "", honeypot: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Sanitize to prevent Discord pings (@everyone, @here, role/user mentions)
    const sanitizedValue = e.target.value
      .replace(/@everyone/gi, "@ everyone")
      .replace(/@here/gi, "@ here")
      .replace(/<@/g, "< @");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: sanitizedValue,
    }));
  };

  return (
    <section id="message" className="py-12 md:py-20 relative">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/80 dark:bg-purple-950/80 border border-pink-200/80 dark:border-purple-800/80 text-pink-600 dark:text-purple-300 font-medium text-[10px] sm:text-[11px] uppercase tracking-widest mb-3 shadow-sm">
              <Heart className="w-3.5 h-3.5 text-pink-500 dark:text-purple-300" />
              <span>Message Box</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-medium text-gray-800 dark:text-white tracking-tight mb-3">
              Send a Letter ✦
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400 font-light tracking-wide max-w-md mx-auto">
              Say hi to AnnChan, ask a question, or just leave some love! 🌸
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_32px_rgba(244,114,182,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-pink-100/80 dark:border-slate-700/80 relative overflow-hidden"
          >
            {cooldown > 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in duration-500">
                <div className="w-16 h-16 bg-pink-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-pink-500 dark:text-purple-300" />
                </div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-500 dark:text-slate-400 text-sm max-w-sm font-light tracking-wide">
                  Thank you so much for your sweet message! ♡
                </p>
                <div className="mt-8 inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-widest text-pink-500 dark:text-purple-400 bg-pink-50 dark:bg-purple-950/30 px-4 py-2 rounded-full">
                  You can send another message in {cooldown}s
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot Field */}
                <div
                  className="absolute w-0 h-0 opacity-0 -z-50 pointer-events-none overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="phone_number">Phone Number</label>
                  <input
                    type="text"
                    id="phone_number"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-[10px] font-medium text-gray-500 dark:text-slate-400 uppercase tracking-widest mb-2 pl-2"
                  >
                    Your Name / Handle
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={50}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ann, or your @ on socials"
                    className="w-full bg-white/90 dark:bg-slate-900/90 border border-pink-100 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-sm text-gray-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500 shadow-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] font-medium text-gray-500 dark:text-slate-400 uppercase tracking-widest mb-2 pl-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    maxLength={500}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Say hi to AnnChan, ask a question, or just leave some love! ✨"
                    className="w-full bg-white/90 dark:bg-slate-900/90 border border-pink-100 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm text-gray-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500 resize-none shadow-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cooldown > 0}
                  className="w-full bg-pink-400 hover:bg-pink-500 dark:bg-purple-600 dark:hover:bg-purple-500 text-white font-medium text-[11px] sm:text-xs tracking-widest uppercase rounded-2xl px-6 py-4 flex items-center justify-center gap-2 transition-all shadow-md shadow-pink-200/50 dark:shadow-none hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      <span>Send Letter</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
