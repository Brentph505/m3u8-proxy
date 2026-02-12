import dotenv from "dotenv";
import getHandler from "../src/lib/getHandler.js";
import httpProxy from "http-proxy";

dotenv.config();

const httpProxyOptions = {
  xfwd: false,
  secure: process.env.NODE_TLS_REJECT_UNAUTHORIZED !== "0",
};

const proxyServer = httpProxy.createProxyServer(httpProxyOptions);
const requestHandler = getHandler(
  {
    originBlacklist: ["*"],
    originWhitelist: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",")
      : [],
    requireHeader: [],
    removeHeaders: [
      "cookie",
      "cookie2",
      "x-request-start",
      "x-request-id",
      "via",
      "connect-time",
      "total-route-time",
    ],
    redirectSameOrigin: true,
    httpProxyOptions,
  },
  proxyServer
);

const handleCors = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return true;
  }
  return false;
};

const isOriginAllowed = (origin, options) => {
  if (options.originWhitelist.includes("*")) {
    return true;
  }
  if (
    options.originWhitelist.length &&
    !options.originWhitelist.includes(origin)
  ) {
    return false;
  }
  if (
    options.originBlacklist.length &&
    options.originBlacklist.includes(origin)
  ) {
    return false;
  }
  return true;
};

// Vercel Serverless Function
export default function handler(req, res) {
  const origin = req.headers.origin || "";

  if (
    !isOriginAllowed(origin, {
      originBlacklist: ["*"],
      originWhitelist: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : [],
    })
  ) {
    res.writeHead(403, "Forbidden");
    res.end(
      `The origin "${origin}" was blacklisted by the operator of this proxy.`
    );
    return;
  }

  if (handleCors(req, res)) return;
  requestHandler(req, res);
}
