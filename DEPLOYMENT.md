# Deployment Guide

This M3U8 Proxy can be deployed on multiple platforms. Choose the one that suits your needs.

## 🔵 Vercel (Recommended for Beginners)

### Option 1: Using the Deploy Button
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/itzzzme/m3u8proxy)

### Option 2: Using Vercel CLI
```bash
npm install -g vercel
vercel
```

### Environment Variables
Set these in your Vercel dashboard:
```
PUBLIC_URL=https://your-vercel-domain.vercel.app
ALLOWED_ORIGINS=https://example.com,https://example2.com
```

**Note:** The Vercel deployment uses the `/api/index.js` serverless function.

---

## 🦕 Deno Deploy

### Quick Deploy
1. Sign up at [Deno Deploy](https://deno.com/deploy)
2. Connect your GitHub repository
3. Set the entry point to `deno_main.ts`
4. Add environment variables in the dashboard

### Local Development
```bash
deno task dev
```

### Deployment via GitHub Actions
Push to your repository and the included GitHub Actions workflow will auto-deploy.

---

## 🚂 Railway

### Quick Deploy
1. Click the button below:
   [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new?templateUrl=https://github.com/itzzzme/m3u8proxy)

2. Or use Railway CLI:
```bash
npm install -g railway
railway link
railway up
```

### Environment Variables
Set in Railway dashboard:
```
PUBLIC_URL=https://your-railway-app.railway.app
ALLOWED_ORIGINS=https://example.com,https://example2.com
HOST=0.0.0.0
PORT=8080
```

---

## 🐳 Docker

### Build and Run Locally
```bash
docker build -t m3u8proxy .
docker run -p 8080:8080 \
  -e PUBLIC_URL=http://localhost:8080 \
  -e ALLOWED_ORIGINS=* \
  m3u8proxy
```

### Deploy to Docker Hub
```bash
docker tag m3u8proxy your-username/m3u8proxy
docker push your-username/m3u8proxy
```

---

## 🟦 Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables

---

## 🌐 Cloudflare Workers

1. Create a new Worker in your Cloudflare dashboard
2. Copy the code from `m3u8proxy(cf_worker).js` into the Worker editor
3. Deploy

**Note:** This is a lightweight alternative but has request size limitations.

---

## 📦 Node.js / Self-Hosted

### Development
```bash
npm install
npm run dev
```

### Production
```bash
npm install --production
npm start
```

### Environment Variables
Create a `.env` file or set environment variables:
```
HOST=0.0.0.0
PORT=8080
PUBLIC_URL=https://your-domain.com
ALLOWED_ORIGINS=https://example.com,https://example2.com
```

---

## 🔧 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `PUBLIC_URL` | Yes | Your deployed server URL |
| `ALLOWED_ORIGINS` | Yes | Comma-separated list of allowed origins |
| `HOST` | No | Host to bind to (default: 127.0.0.1) |
| `PORT` | No | Port to listen on (default: 8080) |

---

## 🆘 Troubleshooting

### "ALLOWED_ORIGINS is not set"
Make sure you've set the `ALLOWED_ORIGINS` environment variable. Use `*` to allow all origins (not recommended for production).

### CORS errors
1. Check that `PUBLIC_URL` matches your actual deployment URL
2. Verify `ALLOWED_ORIGINS` includes your frontend domain

### Connection timeout
- For Vercel/Railway: Check if the service is running
- For Deno Deploy: Ensure deno_main.ts is configured as entry point
