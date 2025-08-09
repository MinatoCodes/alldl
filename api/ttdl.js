const ttdl = require('../downloaders/ttdl');

module.exports = async (req, res) => {
  const url = require('url').parse(req.url, true).query.url;
  if (!url) return res.status(400).json({ success: false, error: "No URL provided" });
  const result = await ttdl(url);
  res.json(result);
};
