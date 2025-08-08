// tweetdl.js
const axios = require("axios");

module.exports = async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ error: "Missing 'url' query parameter" });
        }

        // Call backend API
        const apiUrl = `https://backend1.tioo.eu.org/twitter?url=${encodeURIComponent(url)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.url) {
            return res.status(404).json({ error: "No media found" });
        }

        // HD first, fallback to SD
        let downloadUrl = null;
        if (Array.isArray(data.url) && data.url.length > 0) {
            const hdItem = data.url.find(u => u.hd);
            const sdItem = data.url.find(u => u.sd);
            downloadUrl = hdItem?.hd || sdItem?.sd || null;
        }

        if (!downloadUrl) {
            return res.status(404).json({ error: "No downloadable link found" });
        }

        res.json({
            title: data.title || null,
            creator: "Minato" || null,
            download: downloadUrl
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch Twitter video" });
    }
};
                              
