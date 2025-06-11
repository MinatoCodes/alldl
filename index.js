const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

const BASE_URL = "https://backend1.tioo.eu.org";

const endpointMap = [
  { match: /tiktok\.com/, path: "/tiktok", name: "TikTok" },
  { match: /instagram\.com/, path: "/igdl", name: "Instagram" },
  { match: /fb\.watch|facebook\.com/, path: "/fbdown", name: "Facebook" },
  { match: /twitter\.com|x\.com/, path: "/twitter", name: "Twitter" },
  { match: /youtube\.com|youtu\.be/, path: "/youtube", name: "YouTube" },
  { match: /mediafire\.com/, path: "/mediafire", name: "Mediafire" },
  { match: /capcut\.com/, path: "/capcut", name: "CapCut" },
  { match: /drive\.google\.com/, path: "/gdrive", name: "Google Drive" },
  { match: /pinterest\.com/, path: "/pinterest", name: "Pinterest" },
];

app.get("/alldl", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing url parameter" });

  const matched = endpointMap.find((entry) => entry.match.test(url));
  const endpoint = matched?.path || "/aio";
  const sourceName = matched?.name || "Auto";

  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: { url },
      timeout: 0,
    });

    let data = response.data || {};

   
    if (Array.isArray(data)) {
      data = data.map((item) => ({
        ...item,
        developer: "@Team-Calyx", 
      }));
    } else {
      
      delete data.creator;
      delete data.developer;
      data.developer = "@Team-Clayx";
    }

    return res.json({
      source: sourceName,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch download data.",
      details: err.response?.data || err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
