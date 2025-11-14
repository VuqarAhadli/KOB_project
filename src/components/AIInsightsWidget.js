import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  TrendingUp,
  AlertCircle,
  Info,
  Sparkles,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { generateAIDashboardInsights } from "../services/aiService";

const AIInsightsWidget = ({ financialData, onNavigate }) => {
  const navigate = useNavigate();
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      if (!financialData) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const result = await generateAIDashboardInsights(financialData);
        setInsights(result);
      } catch (error) {
        console.error("AI Insights Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [financialData]);

  const getInsightIcon = (iconName) => {
    switch (iconName) {
      case "trending-up":
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case "alert-circle":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Brain className="w-5 h-5 text-purple-500" />;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case "positive":
        return "bg-green-50 border-green-200 text-green-800";
      case "warning":
        return "bg-orange-50 border-orange-200 text-orange-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          <span className="text-gray-600">AI təhlil edir...</span>
        </div>
      </div>
    );
  }

  if (!insights || !insights.insights || insights.insights.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-xl p-6 shadow-lg border border-purple-300 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">AI İnsights</h3>
            {insights.quickTip && (
              <p className="text-sm text-blue-100 mt-1">{insights.quickTip}</p>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            if (onNavigate) {
              onNavigate("ai");
            } else {
              navigate("/ai");
            }
          }}
          className="flex items-center space-x-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-all backdrop-blur-sm"
        >
          <span>Hamısını gör</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {insights.insights
          .slice(0, expanded ? insights.insights.length : 2)
          .map((insight, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border backdrop-blur-sm bg-white/10 ${getInsightColor(
                insight.type
              )}`}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">{getInsightIcon(insight.icon)}</div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{insight.title}</h4>
                  <p className="text-sm opacity-90">{insight.message}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {insights.insights.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 w-full text-center text-sm font-medium text-blue-100 hover:text-white transition-colors"
        >
          {expanded
            ? "Daha az göstər"
            : `+${insights.insights.length - 2} daha çox`}
        </button>
      )}
    </div>
  );
};

export default AIInsightsWidget;
