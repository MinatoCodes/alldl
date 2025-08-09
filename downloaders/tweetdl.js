const axios = require('axios');

module.exports = async function tweetdl(url) {
    try {
        const res = await axios.get('https://backend1.tioo.eu.org/twitter', {
            params: { url },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            }
        });
        return res.data;
    } catch (err) {
        throw err.response ? err.response.data : err;
    }
};
