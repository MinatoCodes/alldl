const axios = require('axios');

module.exports = async (videoUrl) => {
    const apiUrl = `https://backend1.tioo.eu.org/ttdl?url=${encodeURIComponent(videoUrl)}`;
    const res = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = res.data;
    data.creator = "Minato";
    return data;
};