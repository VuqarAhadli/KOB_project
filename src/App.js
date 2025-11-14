import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import Dashboard from './screens/Dashboard';
import { mockFinancialData } from './data/mockFinancialData';
import Simulator from './screens/Simulator';
import AIAdvisor from './screens/AIAdvisor';
import Subscription from './screens/Subscription';

// Protected Route Component
function ProtectedRoute({ children, user }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Login Wrapper Component
function LoginWrapper({ onLogin }) {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    onLogin();
    navigate('/dashboard');
  };

  return <LoginScreen onLogin={handleLoginSuccess} />;
}

// Dashboard Wrapper Component
function DashboardWrapper({ financialData, animateCards, user }) {
  const navigate = useNavigate();
  return (
    <Dashboard 
      financialData={financialData} 
      animateCards={animateCards} 
      onNavigate={(screen) => navigate(`/${screen}`)}
    />
  );
}

// Simulator Wrapper Component
function SimulatorWrapper() {
  const navigate = useNavigate();
  return <Simulator onNavigate={(screen) => navigate(`/${screen}`)} />;
}

// AI Advisor Wrapper Component
function AIAdvisorWrapper() {
  const navigate = useNavigate();
  return <AIAdvisor onNavigate={(screen) => navigate(`/${screen}`)} />;
}

// Subscription Wrapper Component
function SubscriptionWrapper() {
  const navigate = useNavigate();
  return <Subscription onNavigate={(screen) => navigate(`/${screen}`)} />;
}

function App() {
  const [user, setUser] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Animate cards when user logs in
  useEffect(() => {
    if (user) {
      setTimeout(() => setAnimateCards(true), 300);
    }
  }, [user]);

  const handleLogin = () => {
    const userData = { name: 'Demo KOB', company: 'procrastitans' };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Routes>
        {/* Default route - redirect based on auth status */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
        />

        {/* Login route */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <LoginWrapper onLogin={handleLogin} />} 
        />

        {/* Protected Dashboard route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute user={user}>
              <DashboardWrapper 
                financialData={mockFinancialData} 
                animateCards={animateCards}
                user={user}
              />
            </ProtectedRoute>
          } 
        />

        {/* Protected Simulator route */}
        <Route 
          path="/simulator" 
          element={
            <ProtectedRoute user={user}>
              <SimulatorWrapper />
            </ProtectedRoute>
          } 
        />

        {/* Protected AI Advisor route */}
        <Route 
          path="/ai" 
          element={
            <ProtectedRoute user={user}>
              <AIAdvisorWrapper />
            </ProtectedRoute>
          } 
        />

        {/* Protected Subscription route */}
        <Route 
          path="/subscription" 
          element={
            <ProtectedRoute user={user}>
              <SubscriptionWrapper />
            </ProtectedRoute>
          } 
        />

        {/* 404 - Not Found route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
