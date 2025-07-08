import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import IssueEntryPage from './pages/IssueEntryPage';
import IssueListPage from './pages/IssueListPage';
import UserAccountPage from './pages/UserAccountPage';
import UpdateIssueStatus from './pages/UpdateIssueStatus';
import PrivateRoute from './Routes/PrivateRoute';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <LanguageProvider>
      <Router>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
       
          {/* Public Route: Login */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />

          {/* Protected Routes wrapped with PrivateRoute and Layout */}
          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/IssueEntryPage"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <IssueEntryPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/IssueListPage"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <IssueListPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/UserAccountPage"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <UserAccountPage />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/UpdateIssueStatus"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Layout setIsAuthenticated={setIsAuthenticated}>
                  <UpdateIssueStatus />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Optional: catch all unmatched routes */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;