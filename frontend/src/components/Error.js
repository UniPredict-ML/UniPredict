import React from 'react';

const Error = ({ message }) => (
  <div className="alert alert-danger mt-4 text-center fw-bold">
     Error: {message}
  </div>
);

export default Error;
