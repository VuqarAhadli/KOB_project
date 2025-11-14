import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './screens/Dashboard';
import { mockFinancialData } from './data/mockFinancialData'; // create this file for your mock data
import Simulator from './screens/Simulator';
import AIAdvisor from './screens/AIAdvisor';
import Subscription from './screens/Subscription';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    if (currentScreen === 'dashboard') {
      setTimeout(() => setAnimateCards(true), 300);
    }
  }, [currentScreen]);

  const handleLogin = () => {
    setUser({ name: 'Demo KOB', company: 'procrastitans' });
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen) => setCurrentScreen(screen);
  if (currentScreen === 'simulator') return <Simulator onNavigate={handleNavigate} />;
if (currentScreen === 'ai') return <AIAdvisor onNavigate={handleNavigate} />;
if (currentScreen === 'subscription') return <Subscription onNavigate={handleNavigate} />;

  if (currentScreen === 'login') return <LoginScreen onLogin={handleLogin} />;
  if (currentScreen === 'dashboard') return (
    <Dashboard 
      financialData={mockFinancialData} 
      animateCards={animateCards} 
      onNavigate={handleNavigate} 
    />
  );

  return <div>Screen not implemented yet</div>;
}

export default App;
