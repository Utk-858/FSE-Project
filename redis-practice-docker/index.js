const express = require('express');
const Redis = require('ioredis');

const app = express();
const redis = new Redis(6379, 'redis');  // connects to localhost:6379

const mockDB = {
  '1': { id: 1, name: 'Utkarsh Bansal', role: 'Tech Lead' },
  '2': { id: 2, name: 'Niti Sharma', role: 'AI Engineer' },
};

// Cache middleware
const cache = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cached = await redis.get(`user:${id}`);
    if (cached) {
      console.log('🟢 Cache hit');
      return res.json(JSON.parse(cached));
    }
    console.log('🔴 Cache miss');
    next();
  } catch (error) {
    console.error('Error accessing Redis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Route
app.get('/user/:id', cache, async (req, res) => {
  const { id } = req.params;
  const user = mockDB[id];
  if (!user) return res.status(404).json({ error: 'User not found' });

  await redis.setex(`user:${id}`, 60, JSON.stringify(user)); // 60s TTL
  res.json(user);
});

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
