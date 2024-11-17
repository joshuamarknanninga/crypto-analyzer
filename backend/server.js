// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('Crypto Analyzer PWA API');
});

\// Fetch Crypto Data
app.get('/api/crypto/:coinId', async (req, res) => {
  const { coinId } = req.params;
  try {
    const data = await getCryptoData(coinId);
    res.json(data);
  } catch (error) {
    console.error(`Error fetching data for ${coinId}:`, error);
    res.status(500).json({ error: 'Failed to fetch cryptocurrency data' });
  }
});

// Predict Crypto Movement
app.get('/api/crypto/predict/:coinId', async (req, res) => {
  const { coinId } = req.params;
  try {
    const data = await getCryptoData(coinId);
    // Prepare features and labels
    const prices = data.prices.map(item => item[1]);
    const features = [];
    const labels = [];
    for (let i = 10; i < prices.length; i++) {
      features.push(prices.slice(i - 10, i));
      labels.push(prices[i] > prices[i - 1] ? 1 : 0);
    }
    // Create and train model
    const model = createModel();
    await trainModel(model, features, labels);
    // Predict the next movement
    const lastFeatures = prices.slice(prices.length - 10, prices.length);
    const movement = predict(model, lastFeatures);
    res.json({ movement });
  } catch (error) {
    console.error(`Error predicting movement for ${coinId}:`, error);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

// Serve Frontend (for Production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
