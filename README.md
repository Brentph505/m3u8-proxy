# M3U8 Proxy Server

Welcome to the M3U8 Proxy Server! Tired of dealing with those pesky CORS errors when trying to stream your M3U8 files? Fear not, because our proxy server is here to save the day!

## 🎯 What This Project Does

This Node.js application acts as a middleman between your requests and the M3U8 files you're trying to access. Just drop your M3U8 link into the input box, and we'll take care of the rest. Our server proxies the M3U8 file and provides you with a new link to use—free from CORS troubles.

## 🚀 Deployment

This project now supports **multiple deployment platforms**! Choose your favorite:

### Quick Deploy Buttons

- **Vercel** (Recommended)
  [![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/itzzzme/m3u8proxy)

- **Railway**
  [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new?templateUrl=https://github.com/itzzzme/m3u8proxy)

- **Render**
  [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/itzzzme/m3u8proxy)

### Supported Platforms

| Platform | Status | Notes |
|----------|--------|-------|
| [Vercel](DEPLOYMENT.md#-vercel-recommended-for-beginners) | ✅ Fully Supported | Serverless, Auto-scaling |
| [Deno Deploy](DEPLOYMENT.md#-deno-deploy) | ✅ Fully Supported | TypeScript, Edge-ready |
| [Railway](DEPLOYMENT.md#-railway) | ✅ Fully Supported | Simple setup, Free tier |
| [Render](DEPLOYMENT.md#-render) | ✅ Fully Supported | Easy deployment |
| [Docker / Docker Compose](DEPLOYMENT.md#-docker) | ✅ Fully Supported | Self-hosted |
| [Node.js (Self-hosted)](DEPLOYMENT.md#-nodejs--self-hosted) | ✅ Fully Supported | Full control |
| [Cloudflare Workers](DEPLOYMENT.md#-cloudflare-workers) | ✅ Supported | Lightweight, check `m3u8proxy(cf_worker).js` |

**👉 See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions for each platform!**

## 🚀 How It Works

1. **Enter Your M3U8 Link**: Simply input your M3U8 URL into the provided input box.
2. **Get a Proxied Link**: Our server fetches the M3U8 file and proxies it for you.
3. **Use the Proxied Link**: Replace your original link with the new proxied link in your platform.

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ or Deno

### Node.js Setup
```bash
npm install
npm run dev
```

### Deno Setup
```bash
deno task dev
```

## <span>⚙️ Environment Variables</span>

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PUBLIC_URL` | ✅ Yes | Your deployed server URL | `https://proxy.example.com` |
| `ALLOWED_ORIGINS` | ✅ Yes | Comma-separated allowed origins | `https://example.com,https://app.com` |
| `HOST` | No | Host to bind to | `0.0.0.0` |
| `PORT` | No | Port number | `8080` |

See [`.env.example`](/.env.example) for a template.


## 🕵️‍♂️ How to Use

If you want to use the proxy directly, append your M3U8 link to the following URL:

[https://<deployed_web_server>/m3u8-proxy?url={url}](https://<deployed_web_server>/m3u8-proxy?url={url})

For example, if your M3U8 link is `https://example.com/stream.m3u8`, you would use:

[https://<deployed_web_server>/m3u8-proxy?url=https://example.com/stream.m3u8](https://<deployed_web_server>/m3u8-proxy?url=https://example.com/stream.m3u8)

## 🎥 Video Demo

You can watch a demo of the proxy server in action using the MP4 video file below:

https://github.com/user-attachments/assets/ae8e74a6-176d-42a4-8590-3b7a2b7182ff



## 📹 Example Code Snippet

Here’s how you can use Video.js to play the proxied URL:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proxied M3U8 Player</title>
    <link href="https://vjs.zencdn.net/7.21.0/video-js.css" rel="stylesheet">
</head>
<body>
    <div class="video-container">
        <video id="my-video" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="640" height="360">
            <source src="PROXIED_M3U8_URL_HERE" type="application/x-mpegURL">
        </video>
    </div>

    <script src="https://vjs.zencdn.net/7.21.0/video.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/videojs-contrib-hls@latest"></script>
    <script>
        var player = videojs('my-video');
    </script>
</body>
</html>

```

## 😂 A Note About CORS

CORS, oh CORS—you're like that friend who always shows up uninvited. But don’t worry, our proxy server is the bouncer that keeps you and your streams happy and stress-free. No more unwanted guests in the form of CORS errors!

## 📜 License

This project is licensed under the MIT License. 

## 🤝 Contributing

Feel free to open issues or pull requests if you have suggestions or improvements!

<br/>

<p align="center" style="text-decoration: none;">Made by <a href="https://github.com/itzzzme" target="_blank">itzzzme 
</a>🫰</p>

