const axios = require('axios');

module.exports = async (url) => {
    const apiUrl = `https://backend1.tioo.eu.org/ytdl?url=${encodeURIComponent(url)}`;
    const res = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = res.data;
    return {
        success: true,
        creator: "MinatoCodes",
        platform: "ytdl",
        download_url: data.url || null
    };
};
