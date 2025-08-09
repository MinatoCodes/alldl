const axios = require('axios');

module.exports = async function(url) {
  try {
    
    const apiUrl = `https://backend1.tioo.eu.org/ttdl?url=${encodeURIComponent(url)}`;
    const res = await axios.get(apiUrl);
    const data = res.data;
    return {
      success: true,
      creator: "Minato",
      platform: "ttdl",
      download_url: data.video?.[0] || data.audio?.[0] || null
    };
    
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}
