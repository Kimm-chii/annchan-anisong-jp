import { useEffect } from "react";

interface OpenGraphMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function OpenGraphHead({
  title = "AnnChan's Room 🎀",
  description = "Konnichiwa! Welcome to AnnChan's Room! Singer, Streamer and lover of all things cute. Discover latest anisong covers, logs, and join our community! ✨",
  image = "/og-preview.jpg",
  url,
}: OpenGraphMetaProps) {
  useEffect(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const fullUrl = url || (typeof window !== "undefined" ? window.location.href : origin);
    
    // Ensure image is an absolute URL for social media crawlers
    const fullImageUrl = image.startsWith("http")
      ? image
      : `${origin}${image.startsWith("/") ? "" : "/"}${image}`;

    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement;
      if (!element) {
        if (selector.startsWith("meta[property=")) {
          const propName = selector.match(/property="([^"]+)"/)?.[1];
          element = document.createElement("meta");
          if (propName) element.setAttribute("property", propName);
          document.head.appendChild(element);
        } else if (selector.startsWith("meta[name=")) {
          const nameValue = selector.match(/name="([^"]+)"/)?.[1];
          element = document.createElement("meta");
          if (nameValue) element.setAttribute("name", nameValue);
          document.head.appendChild(element);
        } else if (selector.startsWith("link[rel=")) {
          const relValue = selector.match(/rel="([^"]+)"/)?.[1];
          element = document.createElement("link");
          if (relValue) element.setAttribute("rel", relValue);
          document.head.appendChild(element);
        }
      }
      if (element) {
        element.setAttribute(attribute, value);
      }
    };

    // Standard Document Title
    document.title = title;

    // Standard Meta Tags
    updateMetaTag('meta[name="description"]', "content", description);

    // Open Graph Meta Tags (Facebook, Discord, LinkedIn, iMessage, WhatsApp)
    updateMetaTag('meta[property="og:type"]', "content", "website");
    updateMetaTag('meta[property="og:site_name"]', "content", "AnnChan's Room");
    updateMetaTag('meta[property="og:title"]', "content", title);
    updateMetaTag('meta[property="og:description"]', "content", description);
    updateMetaTag('meta[property="og:image"]', "content", fullImageUrl);
    updateMetaTag('meta[property="og:image:secure_url"]', "content", fullImageUrl);
    updateMetaTag('meta[property="og:image:width"]', "content", "1200");
    updateMetaTag('meta[property="og:image:height"]', "content", "630");
    updateMetaTag('meta[property="og:image:alt"]', "content", "AnnChan's Room - Singer & Streamer Portfolio");
    updateMetaTag('meta[property="og:url"]', "content", fullUrl);

    // Twitter Card Meta Tags (X / Twitter)
    updateMetaTag('meta[name="twitter:card"]', "content", "summary_large_image");
    updateMetaTag('meta[name="twitter:site"]', "content", "@AnnChan295");
    updateMetaTag('meta[name="twitter:creator"]', "content", "@AnnChan295");
    updateMetaTag('meta[name="twitter:title"]', "content", title);
    updateMetaTag('meta[name="twitter:description"]', "content", description);
    updateMetaTag('meta[name="twitter:image"]', "content", fullImageUrl);

    // Color & Canonical
    updateMetaTag('meta[name="theme-color"]', "content", "#ffb6d9");
    updateMetaTag('link[rel="canonical"]', "href", fullUrl);

    // Structured Data (JSON-LD) for Search Engine Rich Snippets
    let scriptTag = document.getElementById("json-ld-schema") as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "json-ld-schema";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    
    scriptTag.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MusicGroup",
      "name": "AnnChan",
      "url": fullUrl,
      "image": fullImageUrl,
      "description": description,
      "sameAs": [
        "https://www.youtube.com/@AnnChan",
        "https://x.com/AnnChan295",
        "https://www.instagram.com/annchan295",
        "https://www.facebook.com/AnnChanSings",
        "https://ganknow.com/annchan"
      ]
    });
  }, [title, description, image, url]);

  return null;
}
