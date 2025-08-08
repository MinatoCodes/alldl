const ttdl = require("./downloaders/ttdl");
const igdl = require("./downloaders/igdl");
const fbdown = require("./downloaders/fbdown");
const ytdl = require("./downloaders/ytdl");
const tweetdl = require("./downloaders/tweetdl");
const gdrivedl = require("./downloaders/gdrivedl");

module.exports = async function alldl(url) {
    if (!url) throw new Error("No URL provided");

    const matchers = [
        // TikTok
        { regex: /tiktok\.com/i, handler: ttdl },

        // Instagram (reel, post, story)
        { regex: /instagram\.com/i, handler: igdl },

        // Facebook (fb.watch, m.facebook.com, www.facebook.com)
        { regex: /(?:facebook\.com|fb\.watch)/i, handler: fbdown },

        // YouTube (shorts, normal watch links)
        { regex: /(?:youtube\.com|youtu\.be)/i, handler: ytdl },

        // Twitter / X
        { regex: /(?:twitter\.com|x\.com)/i, handler: tweetdl },

        // Google Drive
        { regex: /drive\.google\.com/i, handler: gdrivedl }
    ];

    for (const { regex, handler } of matchers) {
        if (regex.test(url)) {
            return await handler(url);
        }
    }

    throw new Error("No suitable downloader found for this URL");
};

// Local test
if (require.main === module) {
    (async () => {
        try {
            const result = await module.exports("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
            console.log(result);
        } catch (err) {
            console.error(err.message);
        }
    })();
         }
         
