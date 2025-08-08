// downloader/gdrivedl.js
const axios = require("axios");

module.exports = async function gdrivedl(url) {
    if (!url) throw new Error("You must provide a Google Drive file link");

    try {
        const apiUrl = `https://backend1.tioo.eu.org/gdrive?url=${encodeURIComponent(url)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status) throw new Error("Google Drive API returned an error");

        return {
            Creator: "Minato",
            filename: data.data.filename,
            filesize: data.data.filesize,
            download: data.data.downloadUrl
        };
    } catch (err) {
        throw new Error(`Google Drive download failed: ${err.message}`);
    }
};
