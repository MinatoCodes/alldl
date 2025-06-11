const express = require("express");
const axios = require("axios");
const axiosRetry = require("axios-retry");
const app = express();
const PORT = process.env.PORT || 3000;

const BASE_URL = "https://backend1.tioo.eu.org";
const ENDPOINT = "/aio"; // Use /aio for all requests

// Configure axios retries
axiosRetry(axios, { retries: 3, retryDelay: (retryCount) => retryCount * 1000 });

app.get("/alldl", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing url parameter" });

  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINT}`, {
      params: { url },
      timeout: 0,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
        "Accept": "application/json",
        "Referer": "https://try.tioo.eu.org",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache"
      }
    });

    let data = response.data || {};

    if (Array.isArray(data)) {
      data = data.map((item) => ({
        ...item,
        developer: "@Team-Calyx"
      }));
    } else {
      delete data.creator;
      delete data.developer;
      data.developer = "@Team-Clayx";
    }

    return res.json({
      source: "Auto", // Since /aio is used, source is always "Auto"
      data
    });
  } catch (err) {
    console.error("Error details:", err.response?.data || err.message);
    return res.status(500).json({
      error: "Failed to fetch download data.",
      details: err.response?.data || err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
