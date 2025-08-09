const axios = require('axios');

module.exports = async (url) => {
    const apiUrl = `https://backend1.tioo.eu.org/twitter?url=${encodeURIComponent(url)}`;
    const res = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = res.data;
    data.creator = "Minato";

    if (!data.url[0].hd && data.url[0].sd) {
        data.url[0].hd = data.url[0].sd;
    }

    return data;
};