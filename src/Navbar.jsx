import React from 'react';
import { Building } from 'lucide-react';

const Navbar = ({ onNavigate, activeTab = 'dashboard' }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'simulator', label: 'Simulyator' },
    { id: 'ai', label: 'AI Tövsiyəçi' },
    { id: 'subscription', label: 'Premium' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">MALİMAX</h1>
        </div>
        
        <nav className="flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                activeTab === item.id
                  ? 'text-blue-700 bg-blue-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
