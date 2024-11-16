import React, { useState, useEffect } from 'react';
import { Container, Header, Divider, Segment, Message } from 'semantic-ui-react';
import CryptoSelector from './components/CryptoSelector';
import CryptoChart from './components/CryptoChart';
import Prediction from './components/Prediction';
import axios from 'axios';

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/crypto/${selectedCoin}`);
        setCryptoData(response.data);
      } catch (err) {
        console.error('Error fetching crypto data:', err);
        setError('Failed to fetch cryptocurrency data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [selectedCoin]);

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as='h2' textAlign='center'>
        Cryptocurrency Analyzer PWA
      </Header>
      <Segment>
        <CryptoSelector selected={selectedCoin} onChange={setSelectedCoin} />
      </Segment>
      <Divider />
      {loading ? (
        <Message info>Loading Chart...</Message>
      ) : error ? (
        <Message negative>{error}</Message>
      ) : (
        <CryptoChart data={cryptoData} />
      )}
      <Divider />
      <Prediction coinId={selectedCoin} />
    </Container>
  );
};

export default App;