const axios = require('axios');

module.exports = async (url) => {
    const apiUrl = `https://backend1.tioo.eu.org/ttdl?url=${encodeURIComponent(url)}`;
    const res = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = res.data;
    return {
        success: true,
        creator: "MinatoCodes",
        platform: "ttdl",
        download_url: data.video[0] || null
    };
};
