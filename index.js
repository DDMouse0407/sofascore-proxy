require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/api/sofascore', async (req, res) => {
  const { sport } = req.query;
  const urlMap = {
    nba: 'https://www.sofascore.com/basketball/nba',
    mlb: 'https://www.sofascore.com/baseball/usa/mlb',
    kbo: 'https://www.sofascore.com/baseball/south-korea/kbo',
    npb: 'https://www.sofascore.com/baseball/japan/pro-yakyu-npb',
    soccer: 'https://www.sofascore.com/football',
  };

  const targetUrl = urlMap[sport];
  if (!targetUrl) return res.status(400).json({ error: 'Invalid sport parameter' });

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
      },
    });
    res.send(response.data);
  } catch (error) {
    console.error('Fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch from SofaScore' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
