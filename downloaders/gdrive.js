const axios = require('axios');

module.exports = async (url) => {
    const apiUrl = `https://backend1.tioo.eu.org/gdrive?url=${encodeURIComponent(url)}`;
    const res = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = res.data;
    return {
        success: true,
        creator: "MinatoCodes",
        platform: "gdrive",
        download_url: data.data.downloadUrl || null
    };
};
