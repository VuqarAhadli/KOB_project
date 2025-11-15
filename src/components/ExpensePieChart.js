import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const ExpensePieChart = ({ data }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Xərc Təhlili</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value.toLocaleString()} ₼`]} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm"
          >
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-600">{item.name}</span>
            </div>
            <span className="text-gray-900 font-medium">
              {item.value.toLocaleString()} ₼
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensePieChart;
