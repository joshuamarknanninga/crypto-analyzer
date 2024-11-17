// src/components/CryptoSelector.js
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const options = [
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'dogecoin', label: 'Dogecoin' },
  { value: 'shiba-inu', label: 'Shiba Inu' },
  // Add more options as needed
];

const CryptoSelector = ({ selected, onChange }) => (
  <FormControl fullWidth>
    <InputLabel id="crypto-select-label">Select Cryptocurrency</InputLabel>
    <Select
      labelId="crypto-select-label"
      value={selected}
      label="Select Cryptocurrency"
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default CryptoSelector;
