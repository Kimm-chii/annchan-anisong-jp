// Cloudflare Worker: annchan-messages
// Paste into Workers & Pages > annchan-messages > Edit code.
// Needs two secrets in Settings > Variables and Secrets:
//   N8N_WEBHOOK_URL       (already set)
//   TURNSTILE_SECRET_KEY  (Turnstile widget secret key)

const allowedOrigins = [
  "https://annchan-anisong-jp.pages.dev",
  "http://localhost:3000",
];

export default {
  async fetch(request, env) {
    const requestOrigin = request.headers.get("Origin");
    const isAllowedOrigin = allowedOrigins.includes(requestOrigin);
    const allowedOrigin = isAllowedOrigin ? requestOrigin : allowedOrigins[0];

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Only accept POST
    if (request.method !== "POST") {
      return jsonResponse({ success: false, error: "Method not allowed." }, 405, allowedOrigin);
    }

    // Only accept requests sent from the site itself
    if (!isAllowedOrigin) {
      return jsonResponse({ success: false, error: "Not allowed." }, 403, allowedOrigin);
    }

    // Parse request
    let data;
    try {
      data = await request.json();
    } catch {
      return jsonResponse({ success: false, error: "Invalid request." }, 400, allowedOrigin);
    }

    const name = cleanMentions(String(data.name || "").trim());
    const message = cleanMentions(String(data.message || "").trim());
    const honeypot = String(data.phone || "").trim();
    const token = String(data.turnstileToken || "");

    // Honeypot: pretend the submission succeeded so bots don't retry.
    if (honeypot !== "") {
      return jsonResponse({ success: true }, 200, allowedOrigin);
    }

    // Required fields
    if (!name || !message) {
      return jsonResponse({ success: false, error: "Name and message are required." }, 400, allowedOrigin);
    }

    // Length limits
    if (name.length > 50) {
      return jsonResponse({ success: false, error: "Name is too long." }, 400, allowedOrigin);
    }
    if (message.length > 500) {
      return jsonResponse({ success: false, error: "Message is too long." }, 400, allowedOrigin);
    }

    // Turnstile: every letter needs a fresh, single-use token from a real browser visit
    if (!token) {
      return jsonResponse({ success: false, error: "Please complete the check and try again." }, 403, allowedOrigin);
    }
    const verified = await verifyTurnstile(token, request, env);
    if (!verified) {
      return jsonResponse({ success: false, error: "Check failed. Please refresh and try again." }, 403, allowedOrigin);
    }

    // Send to n8n
    const n8nResponse = await fetch(env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });

    if (!n8nResponse.ok) {
      return jsonResponse({ success: false, error: "Unable to send message." }, 500, allowedOrigin);
    }

    return jsonResponse({ success: true }, 200, allowedOrigin);
  },
};

async function verifyTurnstile(token, request, env) {
  if (!env.TURNSTILE_SECRET_KEY) return false;

  const body = new FormData();
  body.append("secret", env.TURNSTILE_SECRET_KEY);
  body.append("response", token);
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) body.append("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const outcome = await res.json();
    return outcome.success === true;
  } catch {
    return false;
  }
}

// Stop Discord pings even if someone posts to the Worker directly
function cleanMentions(text) {
  return text
    .replace(/@everyone/gi, "@ everyone")
    .replace(/@here/gi, "@ here")
    .replace(/<@/g, "< @");
}

function jsonResponse(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
