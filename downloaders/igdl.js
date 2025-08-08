const axios = require("axios");

/**
 * Instagram Downloader
 * @param {string} url Instagram post/reel URL
 * @returns {Promise<object>} Download info
 */
async function igdl(url) {
    if (!url) throw new Error("No URL provided");
    if (!/instagram\.com/.test(url)) throw new Error("Invalid Instagram URL");

    const apiUrl = `https://backend1.tioo.eu.org/igdl?url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(apiUrl);

    if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No media found");
    }

    return {
        status: true,
        platform: "Instagram",
        creator: "Minato",
        thumbnail: data[0].thumbnail,
        url: data[0].url
    };
}

module.exports = igdl;
      
