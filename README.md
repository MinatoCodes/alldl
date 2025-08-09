# 📥 AllDL API

**AllDL API** is a universal media downloader service built on Node.js.  
It supports multiple platforms (TikTok, Instagram, Facebook, YouTube, Twitter/X, Google Drive) and automatically selects the correct downloader based on the provided URL.

---

## 🚀 Features
- **Multi-Platform Support**:
  - TikTok (ttdl)
  - Instagram (igdl)
  - Facebook (fbdown)
  - YouTube (ytdl)
  - Twitter/X (tweetdl)
  - Google Drive (gdrive)
- **Smart URL Detection** – Automatically chooses the right script based on the URL.
- **Direct Access** – Call each downloader individually via `/api/{platform}`.
- **Fallbacks** – e.g., Twitter HD → SD fallback.
- **Custom Branding** – All responses show `creator: "Minato"`.

---

## 📂 Project Structure
