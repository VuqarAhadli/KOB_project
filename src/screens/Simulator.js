import React, { useState, createContext, useContext, useReducer, useMemo } from 'react';
import { Calculator, Brain, TrendingUp, TrendingDown, AlertTriangle, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Financial Context (same as previous)
const ACTIONS = {
  SET_MONTHLY_DATA: 'SET_MONTHLY_DATA',
  ADD_MONTH_DATA: 'ADD_MONTH_DATA',
  UPDATE_MONTH_DATA: 'UPDATE_MONTH_DATA',
  SET_EXPENSE_CATEGORIES: 'SET_EXPENSE_CATEGORIES',
  SET_USER_INFO: 'SET_USER_INFO',
  RESET_DATA: 'RESET_DATA'
};

const initialState = {
  user: null,
  monthlyData: [
    { month: 'Yan', gelir: 43400, xerc: 32000, date: '2025-01' },
    { month: 'Fev', gelir: 52000, xerc: 35000, date: '2025-02' },
    { month: 'Mar', gelir: 48000, xerc: 31000, date: '2025-03' },
    { month: 'Apr', gelir: 58000, xerc: 38000, date: '2025-04' },
    { month: 'May', gelir: 62000, xerc: 42000, date: '2025-05' },
    { month: 'İyn', gelir: 55000, xerc: 39000, date: '2025-06' },
    { month: 'İyl', gelir: 60000, xerc: 40000, date: '2025-07' },
    { month: 'Avq', gelir: 61000, xerc: 45000, date: '2025-08' },
    { month: 'Sen', gelir: 56000, xerc: 48000, date: '2025-09' },
    { month: 'Okt', gelir: 62000, xerc: 50000, date: '2025-10' },
    { month: 'Noy', gelir: 70000, xerc: 52000, date: '2025-11' },
    { month: 'Dek', gelir: 59000, xerc: 51000, date: '2025-12' }
  ],
  expenseCategories: [
    { name: 'Əməkhaqqı', percentage: 38.5, color: '#8884d8' },
    { name: 'İcarə', percentage: 20.5, color: '#82ca9d' },
    { name: 'Utilities', percentage: 7.7, color: '#ffc658' },
    { name: 'Marketing', percentage: 17.9, color: '#ff7300' },
    { name: 'Digər', percentage: 15.4, color: '#00ff88' }
  ]
};

const financialReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_MONTHLY_DATA:
      return { ...state, monthlyData: action.payload };
    case ACTIONS.ADD_MONTH_DATA:
      return { ...state, monthlyData: [...state.monthlyData, action.payload] };
    case ACTIONS.UPDATE_MONTH_DATA:
      return {
        ...state,
        monthlyData: state.monthlyData.map(month =>
          month.date === action.payload.date ? { ...month, ...action.payload } : month
        )
      };
    case ACTIONS.SET_EXPENSE_CATEGORIES:
      return { ...state, expenseCategories: action.payload };
    case ACTIONS.SET_USER_INFO:
      return { ...state, user: action.payload };
    case ACTIONS.RESET_DATA:
      return initialState;
    default:
      return state;
  }
};

const FinancialContext = createContext();

const FinancialProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financialReducer, initialState);

  const calculations = useMemo(() => {
    const { monthlyData, expenseCategories } = state;
    
    let runningBalance = 0;
    const monthlyDataWithBalance = monthlyData.map(month => {
      const profit = month.gelir - month.xerc;
      runningBalance += profit;
      return { ...month, profit, balance: runningBalance };
    });

    const currentMonth = monthlyDataWithBalance[monthlyDataWithBalance.length - 1];
    const previousMonth = monthlyDataWithBalance[monthlyDataWithBalance.length - 2];
    
    const monthlyProfit = currentMonth ? currentMonth.profit : 0;
    const cashflow = currentMonth ? currentMonth.balance : 0;
    const totalExpenses = currentMonth ? currentMonth.xerc : 0;
    
    const growthRate = previousMonth && currentMonth 
      ? ((currentMonth.gelir - previousMonth.gelir) / previousMonth.gelir) * 100
      : 0;

    const expenseBreakdown = expenseCategories.map(category => ({
      ...category,
      value: Math.round((totalExpenses * category.percentage) / 100)
    }));

    const lastThreeMonths = monthlyDataWithBalance.slice(-3);
    const avgRevenue = lastThreeMonths.reduce((sum, month) => sum + month.gelir, 0) / lastThreeMonths.length;
    const avgExpenses = lastThreeMonths.reduce((sum, month) => sum + month.xerc, 0) / lastThreeMonths.length;
    const avgProfit = avgRevenue - avgExpenses;

    return {
      monthlyDataWithBalance,
      kpi: { monthlyProfit, cashflow, totalExpenses, growthRate },
      expenseBreakdown,
      trends: { avgRevenue, avgExpenses, avgProfit }
    };
  }, [state.monthlyData, state.expenseCategories]);

  return (
    <FinancialContext.Provider value={{ state, dispatch, calculations, actions: ACTIONS }}>
      {children}
    </FinancialContext.Provider>
  );
};

const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
};

// Custom Scenario Builder Component
export const CustomScenarioBuilder = ({ onScenarioChange }) => {
  const [scenario, setScenario] = useState({
    revenueChange: 0,
    expenseChange: 0,
    oneTimeIncome: 0,
    oneTimeExpense: 0,
    loanAmount: 0,
    loanTerm: 12,
    interestRate: 5
  });

  const handleChange = (field, value) => {
    const newScenario = { ...scenario, [field]: parseFloat(value) || 0 };
    setScenario(newScenario);
    if (onScenarioChange) {
      onScenarioChange(newScenario);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Öz Ssenarinizi Yaradın</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue and Expense Changes */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Aylıq Dəyişikliklər</h4>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Gəlir dəyişikliyi (%)
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={scenario.revenueChange}
              onChange={(e) => handleChange('revenueChange', e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>-50%</span>
              <span className="font-medium">{scenario.revenueChange}%</span>
              <span>+50%</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Xərc dəyişikliyi (%)
            </label>
            <input
              type="range"
              min="-30"
              max="30"
              step="1"
              value={scenario.expenseChange}
              onChange={(e) => handleChange('expenseChange', e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>-30%</span>
              <span className="font-medium">{scenario.expenseChange}%</span>
              <span>+30%</span>
            </div>
          </div>
        </div>

        {/* One-time Events */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Birdəfəlik Hadisələr</h4>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Birdəfəlik gəlir (₼)
            </label>
            <input
              type="number"
              value={scenario.oneTimeIncome}
              onChange={(e) => handleChange('oneTimeIncome', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Birdəfəlik xərc (₼)
            </label>
            <input
              type="number"
              value={scenario.oneTimeExpense}
              onChange={(e) => handleChange('oneTimeExpense', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        {/* Loan Parameters */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-medium text-gray-700">Kredit Parametrləri</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Kredit məbləği (₼)
              </label>
              <input
                type="number"
                value={scenario.loanAmount}
                onChange={(e) => handleChange('loanAmount', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Müddət (ay)
              </label>
              <input
                type="number"
                value={scenario.loanTerm}
                onChange={(e) => handleChange('loanTerm', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
                max="120"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Faiz dərəcəsi (%)
              </label>
              <input
                type="number"
                value={scenario.interestRate}
                onChange={(e) => handleChange('interestRate', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="50"
                step="0.1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Scenario Results Component
export const ScenarioResults = ({ scenario }) => {
  const { calculations } = useFinancial();
  
  const results = useMemo(() => {
    if (!scenario) return null;

    const { trends, kpi } = calculations;
    const currentBalance = kpi.cashflow;
    
    // Calculate new monthly values
    const newMonthlyRevenue = trends.avgRevenue * (1 + scenario.revenueChange / 100);
    const newMonthlyExpenses = trends.avgExpenses * (1 + scenario.expenseChange / 100);
    
    // Calculate loan payment if applicable
    let monthlyLoanPayment = 0;
    if (scenario.loanAmount > 0 && scenario.loanTerm > 0) {
      const monthlyRate = scenario.interestRate / 100 / 12;
      if (monthlyRate > 0) {
        monthlyLoanPayment = (scenario.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, scenario.loanTerm)) / 
                           (Math.pow(1 + monthlyRate, scenario.loanTerm) - 1);
      } else {
        monthlyLoanPayment = scenario.loanAmount / scenario.loanTerm;
      }
    }

    const newMonthlyProfit = newMonthlyRevenue - newMonthlyExpenses - monthlyLoanPayment;
    
    // Project 6 months forward
    const projectedBalance = currentBalance + scenario.oneTimeIncome - scenario.oneTimeExpense + 
                           scenario.loanAmount + (newMonthlyProfit * 6);

    // Calculate months until critical (balance < 0)
    let monthsUntilCritical = null;
    if (newMonthlyProfit < 0) {
      const adjustedBalance = currentBalance + scenario.oneTimeIncome - scenario.oneTimeExpense + scenario.loanAmount;
      monthsUntilCritical = Math.floor(adjustedBalance / Math.abs(newMonthlyProfit));
    }

    // Generate projections for chart
    const projections = [];
    let runningBalance = currentBalance + scenario.oneTimeIncome - scenario.oneTimeExpense + scenario.loanAmount;
    
    for (let i = 0; i < 12; i++) {
      runningBalance += newMonthlyProfit;
      projections.push({
        month: `Ay ${i + 1}`,
        originalProjection: kpi.cashflow + (trends.avgProfit * (i + 1)),
        scenarioProjection: runningBalance,
        monthlyProfit: newMonthlyProfit
      });
    }

    return {
      currentBalance,
      projectedBalance: Math.round(projectedBalance),
      newMonthlyRevenue: Math.round(newMonthlyRevenue),
      newMonthlyExpenses: Math.round(newMonthlyExpenses),
      newMonthlyProfit: Math.round(newMonthlyProfit),
      monthlyLoanPayment: Math.round(monthlyLoanPayment),
      monthsUntilCritical,
      projections,
      impactAnalysis: {
        revenueImpact: Math.round((newMonthlyRevenue - trends.avgRevenue) * 12),
        expenseImpact: Math.round((newMonthlyExpenses - trends.avgExpenses) * 12),
        profitImpact: Math.round((newMonthlyProfit - trends.avgProfit) * 12)
      }
    };
  }, [scenario, calculations]);

  if (!results || !scenario) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Nəticələri görmək üçün ssenairi konfiqurasiya edin</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ssenaril Nəticələri</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <DollarSign className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Hazırki Balans</p>
            <p className="text-xl font-bold text-gray-900">{results.currentBalance.toLocaleString()} ₼</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">6 ay sonra</p>
            <p className={`text-xl font-bold ${results.projectedBalance >= results.currentBalance ? 'text-green-600' : 'text-red-600'}`}>
              {results.projectedBalance.toLocaleString()} ₼
            </p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Calculator className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Aylıq Mənfəət</p>
            <p className={`text-xl font-bold ${results.newMonthlyProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {results.newMonthlyProfit.toLocaleString()} ₼
            </p>
          </div>
        </div>

        {/* Risk Warning */}
        {results.monthsUntilCritical && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <div>
                <h4 className="font-semibold text-red-800">Risk Xəbərdarlığı</h4>
                <p className="text-red-700">
                  Bu ssenaridə {results.monthsUntilCritical} ay sonra balans mənfi olacaq
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Monthly Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Aylıq Gəlir & Xərclər</h4>
            <div className="flex justify-between">
              <span className="text-gray-600">Yeni aylıq gəlir:</span>
              <span className="font-medium">{results.newMonthlyRevenue.toLocaleString()} ₼</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Yeni aylıq xərclər:</span>
              <span className="font-medium">{results.newMonthlyExpenses.toLocaleString()} ₼</span>
            </div>
            {results.monthlyLoanPayment > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Kredit ödənişi:</span>
                <span className="font-medium">{results.monthlyLoanPayment.toLocaleString()} ₼</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">İllik Təsir</h4>
            <div className="flex justify-between">
              <span className="text-gray-600">Gəlir dəyişikliyi:</span>
              <span className={`font-medium ${results.impactAnalysis.revenueImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {results.impactAnalysis.revenueImpact >= 0 ? '+' : ''}{results.impactAnalysis.revenueImpact.toLocaleString()} ₼
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Xərc dəyişikliyi:</span>
              <span className={`font-medium ${results.impactAnalysis.expenseImpact <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {results.impactAnalysis.expenseImpact >= 0 ? '+' : ''}{results.impactAnalysis.expenseImpact.toLocaleString()} ₼
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Net mənfəət dəyişikliyi:</span>
              <span className={`font-medium ${results.impactAnalysis.profitImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {results.impactAnalysis.profitImpact >= 0 ? '+' : ''}{results.impactAnalysis.profitImpact.toLocaleString()} ₼
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Projection Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">12 Aylıq Proyeksiya</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={results.projections}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip formatter={(value, name) => [
              `${value.toLocaleString()} ₼`, 
              name === 'originalProjection' ? 'Orijinal prognoz' : 'Ssenaril prognoz'
            ]} />
            <Line 
              type="monotone" 
              dataKey="originalProjection" 
              stroke="#94a3b8" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="originalProjection"
            />
            <Line 
              type="monotone" 
              dataKey="scenarioProjection" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="scenarioProjection"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Complete Scenario Simulator
export const Simulator  = ({ onNavigate }) =>   {
  const [currentScenario, setCurrentScenario] = useState(null);

  return (
    <FinancialProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200 mb-6">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Maliyyə Ssenaril Simulyatoru</h1>
              <p className="text-gray-600">Müxtəlif ssenarilərə görə maliyyə vəziyyətinizi analiz edin</p>
            </div>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              ← Geri
            </button>
          </div>
        </header>


        <main className="max-w-7xl mx-auto px-4 pb-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div>
              <CustomScenarioBuilder onScenarioChange={setCurrentScenario} />
            </div>
            <div className="xl:col-span-2">
              <ScenarioResults scenario={currentScenario} />
            </div>
          </div>
        </main>
      </div>
    </FinancialProvider>
  );
};

export default Simulator;