const axios = require('axios');

module.exports = async (url) => {
    const apiUrl = `https://backend1.tioo.eu.org/igdl?url=${encodeURIComponent(url)}`;
    const res = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = res.data;
    return {
        success: true,
        creator: "MinatoCodes",
        platform: "igdl",
        download_url: data.url || null
    };
};
