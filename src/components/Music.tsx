import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Play,
  Sparkles,
  ExternalLink,
  Disc,
  Smartphone,
} from "lucide-react";
import { siteData } from "../data";

type YouTubeItem = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
};

export default function Music() {
  const [videos, setVideos] = useState<YouTubeItem[]>([]);
  const [shorts, setShorts] = useState<YouTubeItem[]>([]);

    useEffect(() => {
      fetch("https://annchan-youtube.sretii22.workers.dev/youtube")
        .then((res) => {
          if (!res.ok) {
            throw new Error(`YouTube API error: ${res.status}`);
          }

          return res.json();
        })
        .then((data) => {
          console.log("YouTube Worker response:", data);
          console.log("VIDEOS:", data.videos);
          console.log("SHORTS:", data.shorts);

          setVideos(data.videos || []);
          setShorts(data.shorts || []);
        })
        .catch((error) => {
          console.error("YouTube feed error:", error);
        });
    }, []);

  return (
    <section id="music" className="py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 dark:bg-purple-950/80 border border-pink-200/80 dark:border-purple-800/80 text-pink-600 dark:text-purple-300 font-medium text-[10px] sm:text-[11px] uppercase tracking-widest mb-2.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Music</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-medium text-gray-800 dark:text-white tracking-tight"
          >
            Latest Releases 🎵
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-slate-400 mt-2 max-w-md mx-auto font-light tracking-wide"
          >
            latest covers & little melodies ♡
          </motion.p>
        </div>

        {/* Latest Releases */}
        {videos.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-white">
                  Latest Releases
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1 font-light tracking-wide">
                  Full covers and music videos
                </p>
              </div>

              <Disc className="w-5 h-5 text-pink-400 dark:text-purple-400" />
            </div>

            <div className="space-y-3">
              {videos.map((video, index) => (
                <motion.a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="group flex items-center gap-4 p-3 sm:p-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-pink-100 dark:border-slate-700 hover:border-pink-300 dark:hover:border-purple-500 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative w-28 h-20 sm:w-40 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/95 dark:bg-slate-900/95 rounded-full p-2.5 shadow-lg">
                        <Play
                          fill="currentColor"
                          className="w-4 h-4 text-pink-500 dark:text-purple-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-widest text-pink-500 dark:text-purple-400">
                        Full Cover
                      </span>

                      <span className="text-gray-300 dark:text-slate-600">
                        •
                      </span>

                      <span className="text-[10px] sm:text-xs text-gray-400 dark:text-slate-500">
                        {new Date(video.publishedAt).getFullYear()}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-medium text-gray-800 dark:text-white line-clamp-2 group-hover:text-pink-500 dark:group-hover:text-purple-300 transition-colors">
                      {video.title}
                    </h4>

                    <div className="flex items-center gap-1 mt-2 text-[10px] font-medium tracking-wide text-pink-500 dark:text-purple-400">
                      Watch on YouTube
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {/* Latest Shorts */}
        {shorts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-white">
                  Latest Shorts
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1 font-light tracking-wide">
                  Short-form performances and clips
                </p>
              </div>

              <Smartphone className="w-5 h-5 text-pink-400 dark:text-purple-400" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
              {shorts.map((short, index) => (
                <motion.a
                  key={short.id}
                  href={short.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="group relative aspect-[9/12] rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800"
                >
                  <img
                    src={short.thumbnail}
                    alt={short.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-medium tracking-widest">
                      SHORT
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white rounded-full p-3 shadow-xl">
                      <Play
                        fill="currentColor"
                        className="w-5 h-5 text-pink-500"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">
                      {short.title}
                    </p>

                    <p className="text-white/60 text-[10px] mt-1">
                      {new Date(short.publishedAt).getFullYear()}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {videos.length === 0 && shorts.length === 0 && (
          <div className="text-center py-10 text-sm text-gray-400 dark:text-slate-500">
            No releases available right now.
          </div>
        )}
      </div>
    </section>
  );
}