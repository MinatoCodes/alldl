const express = require("express");
const matchDownloader = require("./downloaders");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/alldl", async (req, res) => {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: "Missing URL" });

  const downloader = matchDownloader(url);
  if (!downloader) return res.status(400).json({ error: "Unsupported platform" });

  const result = await downloader(url);
  res.json(result);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    
