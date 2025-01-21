import express from 'express';
import cors from 'cors';
import { books } from './data/books.js';
import { RecommendationEngine } from './recommendationEngine.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const engine = new RecommendationEngine(books);

// Get all available genres
app.get('/api/genres', (req, res) => {
  const genres = new Set();
  books.forEach(book => {
    book.genres.forEach(genre => genres.add(genre));
  });
  res.json(Array.from(genres));
});

// Get book recommendations
app.post('/api/recommendations', (req, res) => {
  const userPreferences = req.body;
  const recommendations = engine.getRecommendations(userPreferences);
  res.json(recommendations);
});

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
