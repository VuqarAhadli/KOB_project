import React from 'react';
import KpiCard from './KpiCard';
import RevenueExpensesChart from './RevenueExpensesChart';
import CashflowChart from './CashflowChart';
import ExpensePieChart from './ExpensePieChart';
import UpcomingPayments from './UpcomingPayments';
import { TrendingUp, TrendingDown, DollarSign, Target, Building } from 'lucide-react';

const Dashboard = ({ financialData, animateCards, onNavigate }) => {
  const kpis = [
    { title: 'Aylıq Mənfəət', value: `${financialData.kpi.monthlyProfit.toLocaleString()} ₼`, icon: <TrendingUp className="w-6 h-6 text-green-500" />, change: '+12.5%', positive: true },
    { title: 'Nəqd Axını', value: `${financialData.kpi.cashflow.toLocaleString()} ₼`, icon: <DollarSign className="w-6 h-6 text-blue-500" />, change: '+8.2%', positive: true },
    { title: 'Aylıq Xərclər', value: `${financialData.kpi.totalExpenses.toLocaleString()} ₼`, icon: <TrendingDown className="w-6 h-6 text-orange-500" />, change: '+5.1%', positive: false },
    { title: 'Böyümə Dərəcəsi', value: `${financialData.kpi.growthRate}%`, icon: <Target className="w-6 h-6 text-purple-500" />, change: '+2.3%', positive: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">MALİMAX</h1>
          </div>
          <nav className="flex space-x-6">
            <button onClick={() => onNavigate('dashboard')} className="px-3 py-2 rounded-lg font-medium text-blue-700 bg-blue-100">Dashboard</button>
            <button onClick={() => onNavigate('simulator')} className="px-3 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-900">Simulyator</button>
            <button onClick={() => onNavigate('ai')} className="px-3 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-900">AI Tövsiyəçi</button>
            <button onClick={() => onNavigate('subscription')} className="px-3 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-900">Premium</button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => <KpiCard key={index} {...kpi} delay={animateCards ? index * 100 : 0} />)}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RevenueExpensesChart data={financialData.monthlyData} />
          <CashflowChart data={financialData.monthlyData} />
        </div>

        {/* Expense Pie & Upcoming Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ExpensePieChart data={financialData.expenseBreakdown} />
          <div className="lg:col-span-2">
            <UpcomingPayments payments={financialData.upcomingPayments} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
