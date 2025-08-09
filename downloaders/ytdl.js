const axios = require('axios');

module.exports = async function(url) {
  try {
    
    const apiUrl = `https://backend1.tioo.eu.org/ytdl?url=${encodeURIComponent(url)}`;
    const res = await axios.get(apiUrl);
    const data = res.data;
    return {
      success: true,
      creator: "Minato",
      platform: "ytdl",
      download_url: data.url || null
    };
    
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}
