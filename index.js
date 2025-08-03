const express = require("express");
const getHandlerForUrl = require("./downloaders");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/download", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing 'url' or Search component(If Pinterest)"});

  const handler = getHandlerForUrl(url);
  if (!handler) return res.status(400).json({ error: "Unsupported platform" });

  return handler(req, res);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
