import React from 'react';
import { Building } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">MALİMAX</h1>
          <p className="text-blue-200">Maliyyə idarəetmə platforması</p>
        </div>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-blue-200 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
              placeholder="sizin@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-2">Şifrə</label>
            <input 
              type="password" 
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button 
          onClick={onLogin}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
        >
          Daxil ol
        </button>

        <div className="mt-6 text-center">
          <p className="text-blue-200 text-sm">Demo üçün istənilən məlumat daxil edin</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
