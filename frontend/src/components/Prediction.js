// src/components/Prediction.js
import React, { useEffect, useState } from 'react';
import { Segment, Header, Loader, Message } from 'semantic-ui-react';
import axios from 'axios';

const Prediction = ({ coinId }) => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/crypto/predict/${coinId}`);
        setPrediction(response.data.movement);
      } catch (err) {
        console.error('Error fetching prediction:', err);
        setError('Failed to fetch prediction.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [coinId]);

  return (
    <Segment>
      <Header as='h3'>Prediction</Header>
      {loading ? (
        <Loader active inline='centered' />
      ) : error ? (
        <Message negative>{error}</Message>
      ) : (
        `The model predicts the price will go ${prediction}`
      )}
    </Segment>
  );
};

export default Prediction;
