const express = require('express');
const cacheManager = require('cache-manager');
const axios = require('axios');
const app = express();
const port = 3000;

// Initialize in-memory cache with cache-manager
const memoryCache = cacheManager.caching({ store: 'memory', max: 100, ttl: 60 /*seconds*/ });

// Fetch posts from an external API
const fetchPosts = async () => {
  console.log('Fetching posts from external API...');
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
};

// Middleware to check if posts are already in cache
const checkCache = async (req, res, next) => {
  memoryCache.get('posts', async (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Server error');
    }
    
    if (result) {
      console.log('Fetching posts from cache...');
      return res.json(result);
    } else {
      next();
    }
  });
};

// Fetch posts and cache them
app.get('/api/posts', checkCache, async (req, res) => {
  try {
    const posts = await fetchPosts();
    memoryCache.set('posts', posts);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to fetch posts');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
