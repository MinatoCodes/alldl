const axios = require("axios");

/**
 * Facebook Video Downloader
 * @param {string} url Facebook video URL
 * @returns {Promise<object>} HD video download info
 */
async function fbdown(url) {
    if (!url) throw new Error("No URL provided");
    if (!/facebook\.com/.test(url)) throw new Error("Invalid Facebook URL");

    const apiUrl = `https://backend1.tioo.eu.org/fbdown?url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.HD) {
        throw new Error("No HD video found");
    }

    return {
        status: true,
        platform: "Facebook",
        developer: "Minato",
        hd: data.HD
    };
}

module.exports = fbdown;
      
