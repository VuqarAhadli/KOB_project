import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, Users, Building, Target, Brain, Calculator, CreditCard } from 'lucide-react';

const KOBFinancePlatform = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    if (currentScreen === 'dashboard') {
      setTimeout(() => setAnimateCards(true), 300);
    }
  }, [currentScreen]);

  // Mock data
  const mockFinancialData = {
    monthlyData: [
      { month: 'Yan', gelir: 43400, xerc: 32000, balance: 13000 },
      { month: 'Fev', gelir: 52000, xerc: 35000, balance: 30000 },
      { month: 'Mar', gelir: 48000, xerc: 31000, balance: 47000 },
      { month: 'Apr', gelir: 58000, xerc: 38000, balance: 67000 },
      { month: 'May', gelir: 62000, xerc: 42000, balance: 87000 },
      { month: 'İyn', gelir: 55000, xerc: 39000, balance: 103000 },
      { month: 'İyl', gelir: 60000, xerc: 40000, balance: 123000 },
      { month: 'Avq', gelir: 61000, xerc: 45000, balance: 143000 },
      { month: 'Sen', gelir: 56000, xerc: 48000, balance: 165000 },
      { month: 'Okt', gelir: 62000, xerc: 50000, balance: 187000 },
      { month: 'Noy', gelir: 70000, xerc: 52000, balance: 210000 },
      { month: 'Dek', gelir: 59000, xerc: 51000, balance: 235000 }

    ],
    expenseBreakdown: [
      { name: 'Əməkhaqqı', value: 15000, color: '#8884d8' },
      { name: 'İcarə', value: 8000, color: '#82ca9d' },
      { name: 'Utilities', value: 3000, color: '#ffc658' },
      { name: 'Marketing', value: 7000, color: '#ff7300' },
      { name: 'Digər', value: 6000, color: '#00ff88' }
    ],
    kpi: {
      monthlyProfit: 20000,
      cashflow: 87000,
      totalExpenses: 39000,
      growthRate: 12.5
    },
    upcomingPayments: [
      { title: 'Əməkhaqqı', amount: 15000, date: '2025-10-01', type: 'expense' },
      { title: 'Vergi ödənişi', amount: 5500, date: '2025-10-15', type: 'tax' },
      { title: 'İcarə', amount: 8000, date: '2025-10-01', type: 'expense' }
    ]
  };

  const scenarios = {
    revenue_drop: {
      title: 'Gəlirin 20% azalması',
      description: 'Müştəri itkisi və ya bazar durgunluğu',
      impact: {
        currentBalance: 87000,
        projectedBalance: 52000,
        monthsUntilCritical: 8,
        recommendation: 'Xərcləri azaltmaq və yeni müştərilər tapmaq lazımdır'
      }
    },
    expense_increase: {
      title: 'Xərclərin 15% artması',
      description: 'İnflasiya və ya əməkhaqqı artımı',
      impact: {
        currentBalance: 87000,
        projectedBalance: 71000,
        monthsUntilCritical: 12,
        recommendation: 'Qiymət strategiyasını yenidən nəzərdən keçirin'
      }
    },
    new_loan: {
      title: 'Yeni kredit 50,000 AZN',
      description: 'Genişlənmə üçün investisiya',
      impact: {
        currentBalance: 87000,
        projectedBalance: 125000,
        monthsUntilCritical: null,
        recommendation: 'Güclü nəqd axını ilə kredit ödənişi mümkündür'
      }
    }
  };

  const aiRecommendations = [
    {
      icon: <Target className="w-5 h-5 text-blue-500" />,
      title: 'Xərc Optimizasiyası',
      description: 'Marketing xərclərini 15% azaltmaqla aylıq 1,050 AZN qənaət edə bilərsiniz',
      priority: 'Yüksək',
      savings: 1050
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      title: 'Gəlir Artırma',
      description: 'Premium xidmət paketini təklif etməklə gəlirinizi 25% artıra bilərsiniz',
      priority: 'Orta',
      potential: 12500
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-orange-500" />,
      title: 'Nəqd Axını Riski',
      description: 'Oktyabr ayında ödəniş gecikmələri ehtimalı var. Rezerv yaradın',
      priority: 'Yüksək',
      action: 'Reserve Fund'
    }
  ];

  const LoginScreen = () => (
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
          onClick={() => {
            setUser({ name: 'Demo KOB', company: 'Tech Solutions MMC' });
            setCurrentScreen('dashboard');
          }}
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

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">MALİMAX</h1>
          </div>
          <nav className="flex space-x-6">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${currentScreen === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setCurrentScreen('simulator')}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${currentScreen === 'simulator' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Simulyator
            </button>
            <button 
              onClick={() => setCurrentScreen('ai')}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${currentScreen === 'ai' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'}`}
            >
              AI Tövsiyəçi
            </button>
            <button 
              onClick={() => setCurrentScreen('subscription')}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${currentScreen === 'subscription' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Premium
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Aylıq Mənfəət', value: `${mockFinancialData.kpi.monthlyProfit.toLocaleString()} ₼`, icon: <TrendingUp className="w-6 h-6 text-green-500" />, change: '+12.5%', positive: true },
            { title: 'Nəqd Axını', value: `${mockFinancialData.kpi.cashflow.toLocaleString()} ₼`, icon: <DollarSign className="w-6 h-6 text-blue-500" />, change: '+8.2%', positive: true },
            { title: 'Aylıq Xərclər', value: `${mockFinancialData.kpi.totalExpenses.toLocaleString()} ₼`, icon: <TrendingDown className="w-6 h-6 text-orange-500" />, change: '+5.1%', positive: false },
            { title: 'Böyümə Dərəcəsi', value: `${mockFinancialData.kpi.growthRate}%`, icon: <Target className="w-6 h-6 text-purple-500" />, change: '+2.3%', positive: true }
          ].map((kpi, index) => (
            <div key={index} className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 transform transition-all duration-500 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  {kpi.icon}
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${kpi.positive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                  {kpi.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{kpi.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue vs Expenses Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gəlir vs Xərclər</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockFinancialData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} ₼`]} />
                <Line type="monotone" dataKey="gelir" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="xerc" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Cash Flow */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nəqd Axını Balansı</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockFinancialData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} ₼`]} />
                <Bar dataKey="balance" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Expense Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Xərc Təhlili</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={mockFinancialData.expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {mockFinancialData.expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value.toLocaleString()} ₼`]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {mockFinancialData.expenseBreakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value.toLocaleString()} ₼</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Payments */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gələcək Ödənişlər</h3>
            <div className="space-y-4">
              {mockFinancialData.upcomingPayments.map((payment, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${payment.type === 'tax' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                      {payment.type === 'tax' ? 
                        <AlertCircle className="w-5 h-5 text-orange-500" /> : 
                        <CreditCard className="w-5 h-5 text-blue-500" />
                      }
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{payment.title}</h4>
                      <p className="text-sm text-gray-500">{payment.date}</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{payment.amount.toLocaleString()} ₼</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  const CashflowSimulator = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Pul Axını Simulyatoru</h1>
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">"Nə olarsa?" Ssenariləri</h2>
          <p className="text-gray-600">Müxtəlif ssenarilərə görə maliyyə vəziyyətinizin necə dəyişəcəyini görün</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(scenarios).map(([key, scenario]) => (
            <div 
              key={key}
              className={`bg-white rounded-xl p-6 shadow-sm border-2 cursor-pointer transition-all duration-300 ${selectedScenario === key ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'}`}
              onClick={() => setSelectedScenario(selectedScenario === key ? null : key)}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{scenario.title}</h3>
              <p className="text-gray-600 mb-4">{scenario.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Təsir görmək üçün klik edin</span>
                <Calculator className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {selectedScenario && (
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Ssenaril Təhlili</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Hazırki Balans</span>
                    <span className="text-xl font-bold text-green-600">
                      {scenarios[selectedScenario].impact.currentBalance.toLocaleString()} ₼
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Proqnozlaşdırılan Balans (6 ay sonra)</span>
                    <span className={`text-xl font-bold ${scenarios[selectedScenario].impact.projectedBalance > scenarios[selectedScenario].impact.currentBalance ? 'text-green-600' : 'text-red-600'}`}>
                      {scenarios[selectedScenario].impact.projectedBalance.toLocaleString()} ₼
                    </span>
                  </div>
                  {scenarios[selectedScenario].impact.monthsUntilCritical && (
                    <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <span className="text-gray-600">Kritik həddə qədər</span>
                      <span className="text-xl font-bold text-orange-600">
                        {scenarios[selectedScenario].impact.monthsUntilCritical} ay
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">AI Tövsiyəsi</h3>
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Brain className="w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Tövsiyə</h4>
                      <p className="text-blue-800">{scenarios[selectedScenario].impact.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );

  const AIAdvisor = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">AI Maliyyə Tövsiyəçisi</h1>
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ağıllı Maliyyə Optimizasiyası</h2>
          <p className="text-gray-600">AI əsaslı tövsiyələr və avtomatik təhlillər</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {aiRecommendations.map((rec, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  {rec.icon}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  rec.priority === 'Yüksək' ? 'bg-red-100 text-red-700' : 
                  rec.priority === 'Orta' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-green-100 text-green-700'
                }`}>
                  {rec.priority}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{rec.title}</h3>
              <p className="text-gray-600 mb-4">{rec.description}</p>
              
              {rec.savings && (
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <span className="text-green-700 font-semibold">Potensial qənaət: {rec.savings.toLocaleString()} ₼/ay</span>
                </div>
              )}
              
              {rec.potential && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <span className="text-blue-700 font-semibold">Potensial gəlir: +{rec.potential.toLocaleString()} ₼/ay</span>
                </div>
              )}
              
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Tətbiq et
              </button>
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-8 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-8 h-8" />
            <h3 className="text-xl font-bold">AI Insights</h3>
          </div>
          <p className="text-blue-100 mb-6">Son verilənlər əsasında AI təhlili</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">Trend Analizi</h4>
              <p className="text-sm text-blue-100">Gəliriniz son 3 ayda 15% artmışdır. Bu tempi saxlamaq üçün marketinq xərclərini optimallaşdırın.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">Risk Qiymətləndirməsi</h4>
              <p className="text-sm text-blue-100">Nəqd axınında orta səviyyədə risk. Ehtiyat fondunu artırmaq tövsiyə olunur.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">Prognoz</h4>
              <p className="text-sm text-blue-100">Növbəti 6 ay ərzində 25% böyümə proqnozlaşdırılır.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  const SubscriptionScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Premium Paketlər</h1>
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Biznesiniz üçün uyğun planı seçin</h2>
          <p className="text-xl text-gray-600">Güclü maliyyə idarəetmə alətləri ilə KOB-unuzu böyüdün</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Freemium Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Freemium</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">Pulsuz</div>
              <p className="text-gray-600">Əsas funksiyalar</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <span className="text-gray-700">Əsas dashboard və qrafiklər</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <span className="text-gray-700">Ödəniş xatırlatmaları</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
                <span className="text-gray-700">Əsas maliyyə hesabatları</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                </div>
                <span className="text-gray-400">AI tövsiyələr</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                </div>
                <span className="text-gray-400">Pul axını simulyatoru</span>
              </li>
            </ul>
            
            <button className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
              Hazırda aktiv
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
              Populyar
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <div className="text-4xl font-bold mb-1">29 ₼</div>
              <p className="text-blue-100">aylıq</p>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                </div>
                <span>Bütün Freemium funksiyalar</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                </div>
                <span>AI maliyyə tövsiyəçisi</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                </div>
                <span>Pul axını simulyatoru</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                </div>
                <span>Detallı proqnozlar</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                </div>
                <span>Prioritet dəstək</span>
              </li>
            </ul>
            
            <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Premium-a keç
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Ödəniş üsulları</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-blue-500" />
              <div>
                <h4 className="font-semibold text-gray-900">Bank kartı</h4>
                <p className="text-sm text-gray-600">Visa, MasterCard</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-center space-x-3">
              <Building className="w-6 h-6 text-green-500" />
              <div>
                <h4 className="font-semibold text-gray-900">Bank köçürməsi</h4>
                <p className="text-sm text-gray-600">SWIFT, lokal köçürmə</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // Main render logic
  if (currentScreen === 'login') return <LoginScreen />;
  if (currentScreen === 'simulator') return <CashflowSimulator />;
  if (currentScreen === 'ai') return <AIAdvisor />;
  if (currentScreen === 'subscription') return <SubscriptionScreen />;
  return <Dashboard />;
};

export default KOBFinancePlatform;