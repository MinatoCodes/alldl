const express = require('express');
const cors = require('cors');
const { getDownloadLinks } = require('./scrape');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ SaveFrom Downloader API is up and running!');
});

app.post('/api/download', async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: 'Missing video URL.' });

  const links = await getDownloadLinks(url);

  if (links && links.length > 0) {
    res.json({ success: true, links });
  } else {
    res.status(500).json({ success: false, message: 'Could not fetch links. Try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
                                       
