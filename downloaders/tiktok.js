const axios = require("axios");

async function fetchTikTokData(url) {
  try {
    const encoded = encodeURIComponent(url);
    const res = await axios.get(`https://backend1.tioo.eu.org/ttdl?url=${encoded}`);
    const data = res.data;

    return {
      platform: "tiktok",
      title: data.title,
      audio_title: data.title_audio,
      thumbnail: data.thumbnail,
      video: data.video,
      audio: data.audio,
      creator: data.creator
    };
  } catch (err) {
    return { error: "TikTok download failed", details: err.message };
  }
}

// This is the express handler
async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Missing 'url' query param" });

  const data = await fetchTikTokData(url);
  res.json(data);
}

// Export both matcher and handler
module.exports = {
  match: (url) => url.includes("tiktok.com"),
  handler,
};
