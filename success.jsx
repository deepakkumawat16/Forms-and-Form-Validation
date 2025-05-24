import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Success() {
  const { state } = useLocation();

  return (
    <div className="container">
      <h1>Submission Successful</h1>
      <div className="success">
        {Object.entries(state).map(([key, value]) => (
          <p key={key}><strong>{key}:</strong> {value}</p>
        ))}
      </div>
      <Link to="/">Back to form</Link>
    </div>
  );
}
