// api/alldl.js
const url = require('url');
const ttdl = require('../downloaders/ttdl');
const igdl = require('../downloaders/igdl');
const fbdown = require('../downloaders/fbdown');
const ytdl = require('../downloaders/ytdl');
const tweetdl = require('../downloaders/tweetdl');
const gdrive = require('../downloaders/gdrive');

const matchers = [
    { regex: /tiktok\.com/i, handler: ttdl },
    { regex: /instagram\.com/i, handler: igdl },
    { regex: /facebook\.com|fb\.watch/i, handler: fbdown },
    { regex: /youtube\.com|youtu\.be/i, handler: ytdl },
    { regex: /twitter\.com|x\.com/i, handler: tweetdl },
    { regex: /drive\.google\.com/i, handler: gdrive }
];

module.exports = async (req, res) => {
    try {
        const queryUrl = req.query.url;
        if (!queryUrl) {
            return res.status(400).json({ success: false, error: 'Missing url parameter' });
        }

        const matched = matchers.find(m => m.regex.test(queryUrl));
        if (!matched) {
            return res.status(400).json({ success: false, error: 'Unsupported platform' });
        }

        const data = await matched.handler(queryUrl);
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message || err });
    }
};
