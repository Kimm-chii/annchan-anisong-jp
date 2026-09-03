import { ChevronUp, ChevronDown } from "lucide-react";

// IDs of the major sections to navigate through
const sections = ["home", "about", "music", "diary", "message", "socials", "footer"];

export default function FloatingNav() {
  const scrollToNext = () => {
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        // If this section's top is comfortably below the current viewport
        if (rect.top > 80) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
    }
    // If no next section found (already at the bottom), could scroll to footer or do nothing.
  };

  const scrollToPrev = () => {
    // Traverse backwards
    for (let i = sections.length - 1; i >= 0; i--) {
      const id = sections[i];
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        // If this section's top is comfortably above the current viewport
        if (rect.top < -80) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col gap-2.5 sm:gap-3 z-50">
      <button 
        onClick={scrollToPrev}
        className="p-2.5 sm:p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-pink-500 dark:text-purple-400 rounded-full shadow-lg border border-pink-200/80 dark:border-slate-700 hover:bg-pink-50 dark:hover:bg-purple-900/40 transition-all hover:-translate-y-0.5 active:scale-95"
        aria-label="Scroll Up"
      >
        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button 
        onClick={scrollToNext}
        className="p-2.5 sm:p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-pink-500 dark:text-purple-400 rounded-full shadow-lg border border-pink-200/80 dark:border-slate-700 hover:bg-pink-50 dark:hover:bg-purple-900/40 transition-all hover:translate-y-0.5 active:scale-95"
        aria-label="Scroll Down"
      >
        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}
