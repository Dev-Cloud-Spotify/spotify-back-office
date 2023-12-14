// Error.js
import React from 'react';

const Error = ({ message }) => {
  return (
    <div style={{ color: 'red', fontWeight: 'bold' }}>
      <h2>{message}</h2>
    </div>
  );
};

export default Error;
