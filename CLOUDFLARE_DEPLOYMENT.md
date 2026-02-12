# Cloudflare Workers Deployment Guide

## Quick Setup

1. **Install Wrangler CLI:**
```bash
npm install -g @cloudflare/wrangler
```

2. **Login to Cloudflare:**
```bash
wrangler login
```

3. **Deploy:**
```bash
wrangler deploy
```

## Configuration

The `wrangler.json` file is already configured. To customize:

1. Change the worker name:
```json
{
  "name": "your-custom-name"
}
```

2. Add custom routes (optional):
```json
{
  "routes": [
    {
      "pattern": "example.com/*",
      "zone_name": "example.com"
    }
  ]
}
```

## Usage

Once deployed, your M3U8 proxy will be available at your Cloudflare Workers URL:

```
https://m3u8-proxy.your-subdomain.workers.dev/m3u8-proxy?url=YOUR_M3U8_URL
```

## Features

✅ Proxies M3U8 files (`/m3u8-proxy?url=...`)  
✅ Proxies TS segments (`/ts-proxy?url=...`)  
✅ Custom headers support  
✅ CORS enabled on all requests  
✅ No configuration needed - works out of the box  

## Limits

Cloudflare Workers has rate limits:
- **Free tier:** 100,000 requests/day
- **Paid tier:** Unlimited requests

See [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) for more details.
