const url = require('url');
const ttdl = require('../downloaders/ttdl');
const tweetdl = require('../downloaders/tweetdl');
const gdrive = require('../downloaders/gdrive');
const ytdl = require('../downloaders/ytdl');
const igdl = require('../downloaders/igdl');
const fbdown = require('../downloaders/fbdown');

module.exports = async (req, res) => {
  const query = url.parse(req.url, true).query;
  const targetUrl = query.url;
  if (!targetUrl) return res.status(400).json({ success: false, error: "No URL provided" });

  let result;
  if (/tiktok\.com/.test(targetUrl)) result = await ttdl(targetUrl);
  else if (/twitter\.com/.test(targetUrl)) result = await tweetdl(targetUrl);
  else if (/drive\.google\.com/.test(targetUrl)) result = await gdrive(targetUrl);
  else if (/youtube\.com|youtu\.be/.test(targetUrl)) result = await ytdl(targetUrl);
  else if (/instagram\.com/.test(targetUrl)) result = await igdl(targetUrl);
  else if (/facebook\.com|fb\.watch/.test(targetUrl)) result = await fbdown(targetUrl);
  else return res.status(400).json({ success: false, error: "Unsupported platform" });

  res.json(result);
};
