const axios = require('axios');

module.exports = async function(url) {
  try {
    
    const apiUrl = `https://backend1.tioo.eu.org/gdrive?url=${encodeURIComponent(url)}`;
    const res = await axios.get(apiUrl);
    const data = res.data.data;
    return {
      success: true,
      creator: "Minato",
      platform: "gdrive",
      download_url: data.downloadUrl
    };
    
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}
