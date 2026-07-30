import { useEffect } from "react";
import { SEO_CONFIG } from "../config/seoConfig";

interface OpenGraphMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

/**
 * Utility to helper build absolute URLs from relative paths based on current window location
 */
export function getAbsoluteUrl(path: string): string {
  if (typeof window === "undefined") return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const origin = window.location.origin;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${cleanPath}`;
}

export default function OpenGraphHead({
  title = SEO_CONFIG.defaultTitle,
  description = SEO_CONFIG.defaultDescription,
  image = SEO_CONFIG.defaultImage,
  url,
}: OpenGraphMetaProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentOrigin = window.location.origin;
    const fullPageUrl = url || window.location.href;
    const fullImageUrl = getAbsoluteUrl(image);

    const setMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement;
      if (!element) {
        if (selector.startsWith("meta[property=")) {
          const prop = selector.match(/property="([^"]+)"/)?.[1];
          element = document.createElement("meta");
          if (prop) element.setAttribute("property", prop);
          document.head.appendChild(element);
        } else if (selector.startsWith("meta[name=")) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          element = document.createElement("meta");
          if (name) element.setAttribute("name", name);
          document.head.appendChild(element);
        } else if (selector.startsWith("link[rel=")) {
          const rel = selector.match(/rel="([^"]+)"/)?.[1];
          element = document.createElement("link");
          if (rel) element.setAttribute("rel", rel);
          document.head.appendChild(element);
        }
      }
      if (element) {
        element.setAttribute(attribute, value);
      }
    };

    // 1. Standard Document Title & Description
    document.title = title;
    setMetaTag('meta[name="description"]', "content", description);
    setMetaTag('meta[name="theme-color"]', "content", SEO_CONFIG.themeColor);

    // 2. Open Graph Protocol Meta Tags
    setMetaTag('meta[property="og:type"]', "content", "website");
    setMetaTag('meta[property="og:site_name"]', "content", SEO_CONFIG.siteName);
    setMetaTag('meta[property="og:locale"]', "content", SEO_CONFIG.locale);
    setMetaTag('meta[property="og:title"]', "content", title);
    setMetaTag('meta[property="og:description"]', "content", description);
    setMetaTag('meta[property="og:url"]', "content", fullPageUrl);

    // Open Graph Image Meta Tags with Absolute URLs
    setMetaTag('meta[property="og:image"]', "content", fullImageUrl);
    setMetaTag('meta[property="og:image:secure_url"]', "content", fullImageUrl);
    setMetaTag('meta[property="og:image:type"]', "content", SEO_CONFIG.imageType);
    setMetaTag('meta[property="og:image:width"]', "content", SEO_CONFIG.imageWidth);
    setMetaTag('meta[property="og:image:height"]', "content", SEO_CONFIG.imageHeight);
    setMetaTag('meta[property="og:image:alt"]', "content", SEO_CONFIG.imageAlt);

    // 3. Twitter / X Card Meta Tags
    setMetaTag('meta[name="twitter:card"]', "content", SEO_CONFIG.twitterCardType);
    setMetaTag('meta[name="twitter:site"]', "content", SEO_CONFIG.twitterHandle);
    setMetaTag('meta[name="twitter:creator"]', "content", SEO_CONFIG.twitterHandle);
    setMetaTag('meta[name="twitter:title"]', "content", title);
    setMetaTag('meta[name="twitter:description"]', "content", description);
    setMetaTag('meta[name="twitter:image"]', "content", fullImageUrl);

    // 4. Canonical URL Link Tag
    setMetaTag('link[rel="canonical"]', "href", fullPageUrl);

    // 5. Schema.org JSON-LD Structured Data for Rich Search Results
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
      "url": fullPageUrl,
      "image": fullImageUrl,
      "description": description,
      "sameAs": SEO_CONFIG.socialLinks,
    });
  }, [title, description, image, url]);

  return null;
}
