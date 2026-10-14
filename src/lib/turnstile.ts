import { useCallback, useEffect, useRef, useState } from "react";

// The site key is public. On localhost, Cloudflare's always-pass test key is used instead.
const SITE_KEY =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "1x00000000000000000000AA"
    : "0x4AAAAAAFWJ3m1wEX1x_cnq";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  const w = window as unknown as { turnstile?: TurnstileApi };
  if (w.turnstile) return Promise.resolve(w.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => (w.turnstile ? resolve(w.turnstile) : reject(new Error("Turnstile missing")));
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Turnstile failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

/** Renders a Turnstile check into `ref` while `active` is true and exposes the current token. */
export function useTurnstile(active: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const api = useRef<TurnstileApi | null>(null);
  const [token, setToken] = useState("");
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    loadTurnstile()
      .then((t) => {
        if (cancelled || !ref.current) return;
        api.current = t;
        widgetId.current = t.render(ref.current, {
          sitekey: SITE_KEY,
          theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
          size: "flexible",
          callback: (value: string) => setToken(value),
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
        });
      })
      .catch(() => setLoadError(true));
    return () => {
      cancelled = true;
      if (widgetId.current && api.current) api.current.remove(widgetId.current);
      widgetId.current = null;
      setToken("");
    };
  }, [active]);

  // Tokens work once, so ask for a fresh one after every attempt
  const reset = useCallback(() => {
    setToken("");
    if (widgetId.current && api.current) api.current.reset(widgetId.current);
  }, []);

  return { ref, token, reset, loadError };
}
