import { useEffect, useState } from "react";

export type YouTubeItem = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
};

type Feed = { videos: YouTubeItem[]; shorts: YouTubeItem[] };

const FEED_URL = "https://annchan-youtube.sretii22.workers.dev/youtube";

// One request shared by every component (hero "Now Playing" and the Music section)
let feedPromise: Promise<Feed> | null = null;

function loadFeed(): Promise<Feed> {
  if (!feedPromise) {
    feedPromise = fetch(FEED_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`YouTube feed error: ${res.status}`);
        return res.json();
      })
      .then((data) => ({ videos: data.videos || [], shorts: data.shorts || [] }))
      .catch((error) => {
        console.error("YouTube feed error:", error);
        feedPromise = null; // allow a retry on the next mount
        return { videos: [], shorts: [] };
      });
  }
  return feedPromise;
}

export function useYouTubeFeed() {
  const [feed, setFeed] = useState<Feed & { loaded: boolean }>({ videos: [], shorts: [], loaded: false });

  useEffect(() => {
    let active = true;
    loadFeed().then((data) => {
      if (active) setFeed({ ...data, loaded: true });
    });
    return () => {
      active = false;
    };
  }, []);

  return feed;
}
