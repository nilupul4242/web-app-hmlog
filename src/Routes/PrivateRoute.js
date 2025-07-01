
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    // If user is NOT authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children components (the protected page)
  return children;
}
