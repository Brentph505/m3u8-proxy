import { serve } from "https://deno.land/std@0.210.0/http/server.ts";

// Load environment variables from Deno runtime
const env = Deno.env.toObject();

const HOST = env["HOST"] || "127.0.0.1";
const PORT = parseInt(env["PORT"] || "8080");
const PUBLIC_URL = env["PUBLIC_URL"] || `http://${HOST}:${PORT}`;
const ALLOWED_ORIGINS = env["ALLOWED_ORIGINS"]
  ? env["ALLOWED_ORIGINS"].split(",")
  : [];

interface ProxyOptions {
  originBlacklist: string[];
  originWhitelist: string[];
}

const options: ProxyOptions = {
  originBlacklist: ["*"],
  originWhitelist: ALLOWED_ORIGINS,
};

const isOriginAllowed = (origin: string, opts: ProxyOptions): boolean => {
  if (opts.originWhitelist.includes("*")) {
    return true;
  }
  if (opts.originWhitelist.length && !opts.originWhitelist.includes(origin)) {
    return false;
  }
  if (opts.originBlacklist.length && opts.originBlacklist.includes(origin)) {
    return false;
  }
  return true;
};

const handleCors = (req: Request): Response | null => {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  });

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }
  return null;
};

async function handleM3U8Proxy(
  req: Request,
  _path: string
): Promise<Response> {
  const url = new URL(req.url);
  const targetUrl = url.searchParams.get("url");
  const headersParam = url.searchParams.get("headers") || "{}";

  if (!targetUrl) {
    return new Response("Missing URL parameter", { status: 400 });
  }

  try {
    const customHeaders = JSON.parse(headersParam);
    const requestHeaders = new Headers(customHeaders);
    requestHeaders.set("User-Agent", "M3U8 Proxy");

    const response = await fetch(targetUrl, {
      headers: requestHeaders,
      redirect: "follow",
    });

    if (!response.ok) {
      return new Response(`Error: ${response.statusText}`, {
        status: response.status,
      });
    }

    const content = await response.text();
    const baseUrl = new URL(targetUrl);
    const modifiedContent = content.replace(/^(?!https?:\/\/|\/)/gm, (match) => {
      return baseUrl.origin + baseUrl.pathname.substring(0, baseUrl.pathname.lastIndexOf("/") + 1) + match;
    });

    const headers = new Headers({
      "Content-Type": "application/vnd.apple.mpegurl",
      "Access-Control-Allow-Origin": "*",
    });

    return new Response(modifiedContent, { headers });
  } catch (error) {
    console.error("Error proxying M3U8:", error);
    return new Response("Error proxying request", { status: 500 });
  }
}

async function handleTsProxy(
  req: Request,
  _path: string
): Promise<Response> {
  const url = new URL(req.url);
  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing URL parameter", { status: 400 });
  }

  try {
    const response = await fetch(targetUrl, {
      redirect: "follow",
    });

    if (!response.ok) {
      return new Response(`Error: ${response.statusText}`, {
        status: response.status,
      });
    }

    const buffer = await response.arrayBuffer();
    const headers = new Headers({
      "Content-Type": "video/mp2t",
      "Access-Control-Allow-Origin": "*",
      "Content-Length": buffer.byteLength.toString(),
    });

    return new Response(buffer, { headers });
  } catch (error) {
    console.error("Error proxying TS:", error);
    return new Response("Error proxying request", { status: 500 });
  }
}

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const origin = req.headers.get("origin") || "";

  // CORS check
  if (!isOriginAllowed(origin, options)) {
    return new Response(
      `The origin "${origin}" was blacklisted by the operator of this proxy.`,
      { status: 403 }
    );
  }

  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) {
    return corsResponse;
  }

  // Route handling
  if (url.pathname === "/m3u8-proxy") {
    return handleM3U8Proxy(req, url.pathname);
  } else if (url.pathname === "/ts-proxy") {
    return handleTsProxy(req, url.pathname);
  } else if (url.pathname === "/" || url.pathname === "") {
    // Serve a welcome page
    return new Response("Welcome to M3U8 Proxy\n\nUse /m3u8-proxy?url=YOUR_M3U8_URL to proxy an M3U8 file.", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response("Not Found", { status: 404 });
}

console.log(
  `🚀 M3U8 Proxy Server running on http://${HOST}:${PORT}`
);
await serve(handler, { hostname: HOST, port: PORT });
