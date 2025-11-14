import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const RevenueExpensesChart = ({ data }) => {
  // Sample data if none provided
  const sampleData = data || [
    { month: 'Yan', gelir: 45000, xerc: 32000 },
    { month: 'Fev', gelir: 52000, xerc: 35000 },
    { month: 'Mar', gelir: 48000, xerc: 38000 },
    { month: 'Apr', gelir: 61000, xerc: 42000 },
    { month: 'May', gelir: 55000, xerc: 40000 },
    { month: 'İyn', gelir: 67000, xerc: 45000 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600 capitalize">
                {entry.name === 'gelir' ? 'Gəlir' : 'Xərc'}:
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {entry.value.toLocaleString()} ₼
              </span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Fərq:</span>
              <span className={`text-sm font-semibold ${
                payload[0].value - payload[1].value >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {(payload[0].value - payload[1].value).toLocaleString()} ₼
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Gəlir vs Xərclər</h3>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-600">Gəlir</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-600">Xərc</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={sampleData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorXerc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#9ca3af"
            style={{ fontSize: '13px', fontWeight: '500' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            stroke="#9ca3af"
            style={{ fontSize: '13px' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }} />
          <Line 
            type="monotone" 
            dataKey="gelir" 
            name="gelir"
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff' }}
            fill="url(#colorGelir)"
          />
          <Line 
            type="monotone" 
            dataKey="xerc" 
            name="xerc"
            stroke="#ef4444" 
            strokeWidth={3}
            dot={{ fill: '#ef4444', r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff' }}
            fill="url(#colorXerc)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueExpensesChart;
