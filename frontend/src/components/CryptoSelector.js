// src/components/CryptoSelector.js
import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
  { key: 'bitcoin', value: 'bitcoin', text: 'Bitcoin' },
  { key: 'ethereum', value: 'ethereum', text: 'Ethereum' },
  { key: 'dogecoin', value: 'dogecoin', text: 'Dogecoin' },
  { key: 'shiba-inu', value: 'shiba-inu', text: 'Shiba Inu' },
  // Add more options as needed
];

const CryptoSelector = ({ selected, onChange }) => (
  <Dropdown
    placeholder='Select Cryptocurrency'
    fluid
    selection
    options={options}
    value={selected}
    onChange={(e, { value }) => onChange(value)}
  />
);

export default CryptoSelector;
