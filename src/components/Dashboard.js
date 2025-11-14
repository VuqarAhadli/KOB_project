import React from 'react';
import KpiCard from '../components/KpiCard';
import RevenueExpensesChart from '../components/RevenueExpensesChart';
import CashflowChart from '../components/CashflowChart';
import ExpensePieChart from '../components/ExpensePieChart';
import UpcomingPayments from '../components/UpcomingPayments';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

const Dashboard = ({ financialData, animateCards }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <h1>TEST - Dashboard Content</h1>
      {/* Temporarily comment these out
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => <KpiCard key={index} {...kpi} delay={animateCards ? index * 100 : 0} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <RevenueExpensesChart data={financialData.monthlyData} />
        <CashflowChart data={financialData.monthlyData} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ExpensePieChart data={financialData.expenseBreakdown} />
        <div className="lg:col-span-2">
          <UpcomingPayments payments={financialData.upcomingPayments} />
        </div>
      </div>
      */}
    </main>
  );
};

export default Dashboard;
