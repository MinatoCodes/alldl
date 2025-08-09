const handler = require("../downloaders/igdl");

module.exports = async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).json({ error: "Missing url parameter" });
        const data = await handler(url);
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message || err });
    }
};
