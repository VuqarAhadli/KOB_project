import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import Dashboard from './screens/Dashboard';
import { mockFinancialData } from './data/mockFinancialData';
import Simulator from './screens/Simulator';
import AIAdvisor from './screens/AIAdvisor';
import Subscription from './screens/Subscription';
import Navbar from './components/Navbar';

function ProtectedRoute({ children, user }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function LoginWrapper({ onLogin }) {
  const navigate = useNavigate();
  const handleLoginSuccess = () => {
    onLogin();
    navigate('/dashboard');
  };
  return <LoginScreen onLogin={handleLoginSuccess} />;
}

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

function SimulatorWrapper() {
  const navigate = useNavigate();
  return <Simulator onNavigate={(screen) => navigate(`/${screen}`)} />;
}

function AIAdvisorWrapper() {
  const navigate = useNavigate();
  return <AIAdvisor onNavigate={(screen) => navigate(`/${screen}`)} />;
}

function SubscriptionWrapper() {
  const navigate = useNavigate();
  return <Subscription onNavigate={(screen) => navigate(`/${screen}`)} />;
}

function App() {
  const [user, setUser] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (user) setTimeout(() => setAnimateCards(true), 300);
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
    <>
      {user && <Navbar onLogout={handleLogout} />}
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
                <DashboardWrapper financialData={mockFinancialData} animateCards={animateCards} user={user} />
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
    </>
  );
}

export default App;
