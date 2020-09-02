import React from 'react';

const ManualPage = () => {
  return (
      <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" stroke="red" fill="grey">
        <circle cx="50" cy="50" r="40" />
        <circle cx="150" cy="50" r="4" />

        <svg viewBox="0 0 10 10" x="200" width="100">
          <circle cx="5" cy="5" r="4" />
        </svg>
      </svg>
  );
};

export default ManualPage;
