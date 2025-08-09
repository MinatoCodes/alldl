const axios = require('axios');

module.exports = async function(url) {
  try {
    
    const apiUrl = `https://backend1.tioo.eu.org/twitter?url=${encodeURIComponent(url)}`;
    const res = await axios.get(apiUrl);
    const data = res.data;
    return {
      success: true,
      creator: "Minato",
      platform: "tweetdl",
      download_url: (data.url?.[0]?.hd) || (data.url?.[0]?.sd) || null
    };
    
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}
