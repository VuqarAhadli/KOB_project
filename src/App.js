import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./screens/Dashboard";
import { mockFinancialData } from "./data/mockFinancialData";
import Simulator from "./screens/Simulator";
import AIAdvisor from "./screens/AIAdvisor";
import Subscription from "./screens/Subscription";
import Profile from "./screens/Profile";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = useState(() => {
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  })[0];

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Main App Layout
const AppLayout = () => {
  const location = useLocation();
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setTimeout(() => setAnimateCards(true), 300);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard
                financialData={mockFinancialData}
                animateCards={animateCards}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/simulator"
          element={
            <ProtectedRoute>
              <Simulator financialData={mockFinancialData} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <AIAdvisor financialData={mockFinancialData} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
