const express = require('express');
const cors = require('cors');
const { getDownloadLinks } = require('./scrape');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
app.get('/api/download', async (req, res) => {
  const videoUrl = req.query.url;
  console.log("URL received:", videoUrl);

  if (!videoUrl) {
    return res.status(400).json({ success: false, message: 'Missing url parameter' });
  }

  try {
    const links = await getDownloadLinks(videoUrl);
    console.log("Extracted links:", links);

    if (links && links.length > 0) {
      res.json({ success: true, links });
    } else {
      res.status(404).json({ success: false, message: 'No download links found' });
    }
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
    
