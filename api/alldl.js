const matchers = [
    { pattern: /tiktok\.com/i, script: require("../downloaders/ttdl") },
    { pattern: /instagram\.com/i, script: require("../downloaders/igdl") },
    { pattern: /facebook\.com|fb\.watch/i, script: require("../downloaders/fbdown") },
    { pattern: /youtube\.com|youtu\.be/i, script: require("../downloaders/ytdl") },
    { pattern: /twitter\.com|x\.com/i, script: require("../downloaders/tweetdl") },
    { pattern: /drive\.google\.com/i, script: require("../downloaders/gdrive") }
];

module.exports = async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).json({ error: "Missing url parameter" });

        const match = matchers.find(m => m.pattern.test(url));
        if (!match) return res.status(400).json({ error: "Unsupported URL" });

        const data = await match.script(url);
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message || err });
    }
};
