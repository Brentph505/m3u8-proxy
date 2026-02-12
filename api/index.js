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
    originBlacklist: [],
    originWhitelist: ["*"], // Allow all origins by default
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

// Vercel Serverless Function
export default function handler(req, res) {
  // Handle CORS preflight
  if (handleCors(req, res)) return;
  
  // Process the proxy request
  requestHandler(req, res);
}
