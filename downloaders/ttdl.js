const axios = require("axios");

async function downloadTikTok(url) {
  try {
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `https://backend1.tioo.eu.org/ttdl?url=${encodedUrl}`;
    const { data } = await axios.get(apiUrl);

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
    return { error: "Failed to fetch TikTok video.", details: err.message };
  }
}

module.exports = downloadTikTok;
                                                            
