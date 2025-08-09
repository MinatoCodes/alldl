const ttdl = require('./ttdl');
const ytdl = require('./ytdl');
const fbdown = require('./fbdown');
const tweetdl = require('./tweetdl');
const gdrive = require('./gdrive');
const igdl = require('./igdl');

const matchers = [
    { regex: /tiktok\.com/, fn: ttdl },
    { regex: /youtube\.com|youtu\.be/, fn: ytdl },
    { regex: /facebook\.com|fb\.watch/, fn: fbdown },
    { regex: /twitter\.com/, fn: tweetdl },
    { regex: /drive\.google\.com/, fn: gdrive },
    { regex: /instagram\.com/, fn: igdl }
];

module.exports = async (url) => {
    for (const m of matchers) {
        if (m.regex.test(url)) {
            return await m.fn(url);
        }
    }
    return { success: false, error: 'No matching downloader found' };
};
