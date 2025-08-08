const axios = require("axios");

/**
 * TikTok Downloader
 * @param {string} url TikTok video URL
 * @returns {Promise<object>} Download info
 */
async function ttdl(url) {
    if (!url) throw new Error("No URL provided");
    if (!/tiktok\.com/.test(url)) throw new Error("Invalid TikTok URL");

    const apiUrl = `https://backend1.tioo.eu.org/ttdl?url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(apiUrl);

    return {
        status: true,
        platform: "TikTok",
        title: data.title,
        title_audio: data.title_audio,
        thumbnail: data.thumbnail,
        video: data.video,
        audio: data.audio,
        creator: data.creator
    };
}

module.exports = ttdl;
      
