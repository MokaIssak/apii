const express = require('express');
const axios = require('axios');
const { URL } = require('url');

const app = express();
const PORT = process.env.PORT || 3000;
const REQUEST_TIMEOUT_MS = 500;

app.get('/numbers', async (req, res) => {
  let urls = req.query.url;
  if (!urls) {
    return res.status(400).json({ error: 'No url query parameters provided' });
  }
  if (!Array.isArray(urls)) {
    urls = [urls];
  }

  // Validate URLs
  const validUrls = urls.filter((u) => {
    try {
      new URL(u);
      return true;
    } catch {
      return false;
    }
  });

  // Fetch all URLs concurrently with timeout
  const fetchPromises = validUrls.map((url) =>
    axios.get(url, { timeout: REQUEST_TIMEOUT_MS }).then(response => {
      if (response.data && Array.isArray(response.data.numbers)) {
        return response.data.numbers;
      }
      return [];
    }).catch(() => {
      // Ignore errors and timeouts
      return [];
    })
  );

  try {
    const results = await Promise.all(fetchPromises);
    // Merge, deduplicate and sort numbers
    // Convert all numbers to integers, then deduplicate and sort
    const allNumbers = results.flat().map(n => parseInt(n, 10));
    const mergedNumbers = [...new Set(allNumbers)].sort((a, b) => a - b);
    return res.json({ numbers: mergedNumbers });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`number-management-service listening on port ${PORT}`);
});
