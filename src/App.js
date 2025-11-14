import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import Dashboard from './screens/Dashboard';
import { mockFinancialData } from './data/mockFinancialData';
import Simulator from './screens/Simulator';
import AIAdvisor from './screens/AIAdvisor';
import Subscription from './screens/Subscription';
import Navbar from './Navbar';

// Protected Route Component with Navbar
function ProtectedRoute({ children, user }) {
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {children}
    </div>
  );
}

function LoginWrapper({ onLogin }) {
  const navigate = useNavigate();
  const handleLoginSuccess = () => {
    onLogin();
    navigate('/dashboard');
  };
  return <LoginScreen onLogin={handleLoginSuccess} />;
}

function DashboardWrapper({ financialData, animateCards }) {
  return <Dashboard financialData={financialData} animateCards={animateCards} />;
}

function SimulatorWrapper() {
  return <Simulator />;
}

function AIAdvisorWrapper() {
  return <AIAdvisor />;
}

function SubscriptionWrapper() {
  return <Subscription />;
}

function App() {
  const [user, setUser] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);

  // Don't use localStorage - just keep state in memory
  useEffect(() => {
    // Remove localStorage check
  }, []);

  useEffect(() => {
    if (user) setTimeout(() => setAnimateCards(true), 300);
  }, [user]);

  const handleLogin = () => {
    const userData = { name: 'Demo KOB', company: 'procrastitans' };
    setUser(userData);
    // Don't use localStorage
  };

  const handleLogout = () => {
    setUser(null);
    // Don't use localStorage
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <LoginWrapper onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <DashboardWrapper financialData={mockFinancialData} animateCards={animateCards} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/simulator"
          element={
            <ProtectedRoute user={user}>
              <SimulatorWrapper />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai"
          element={
            <ProtectedRoute user={user}>
              <AIAdvisorWrapper />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute user={user}>
              <SubscriptionWrapper />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
