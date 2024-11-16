// backend/services/cryptoService.js
const axios = require('axios');

const getCryptoData = async (coinId) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: '30', // Last 30 days
        interval: 'daily',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${coinId}:`, error);
    throw error;
  }
};

module.exports = { getCryptoData };
