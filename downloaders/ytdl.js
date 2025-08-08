const axios = require("axios");

module.exports = async function ytdl(url) {
    if (!url) throw new Error("You must provide a YouTube video URL");

    try {
        const apiUrl = `https://backend1.tioo.eu.org/youtube?url=${encodeURIComponent(url)}`;
        const { data } = await axios.get(apiUrl);

        if (!data) throw new Error("Invalid response from YouTube API");

        // Prefer MP4, fallback to MP3
        const downloadUrl = data.mp4;
        if (!downloadUrl) throw new Error("No downloadable media found");

        return {
            title: data.title || "Untitled",
            thumbnail: data.thumbnail || null,
            author: "Minato" || null,
            url: downloadUrl
        };
    } catch (err) {
        throw new Error(`YouTube download failed: ${err.message}`);
    }
};
                                                                   
