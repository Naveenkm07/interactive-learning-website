const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/nhce-news', async (req, res) => {
  try {
    const { data } = await axios.get('https://newhorizoncollegeofengineering.in/news/');
    const $ = cheerio.load(data);
    const news = [];
    // Adjust selectors based on actual NHCE news page structure
    $('.elementor-post__title, .entry-title').each((i, el) => {
      const title = $(el).text().trim();
      const link = $(el).find('a').attr('href') || $(el).parent('a').attr('href');
      if (title && link) {
        news.push({ title, link });
      }
    });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Scraper running on port ${PORT}`)); 