// src/components/CryptoChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CryptoChart = ({ data }) => {
  const formattedData = data.prices.map(item => ({
    date: new Date(item[0]).toLocaleDateString(),
    price: item[1],
  }));

  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart data={formattedData}>
        <XAxis dataKey='date' />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <Line type='monotone' dataKey='price' stroke='#8884d8' />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CryptoChart;
