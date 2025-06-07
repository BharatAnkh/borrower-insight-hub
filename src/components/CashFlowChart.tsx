
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const CashFlowChart: React.FC = () => {
  const cashFlowData = [
    { month: 'Jan', income: 5200, expenses: 3800, net: 1400 },
    { month: 'Feb', income: 5400, expenses: 3900, net: 1500 },
    { month: 'Mar', income: 5100, expenses: 4200, net: 900 },
    { month: 'Apr', income: 5600, expenses: 3700, net: 1900 },
    { month: 'May', income: 5300, expenses: 3950, net: 1350 },
    { month: 'Jun', income: 5500, expenses: 4100, net: 1400 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Cash Flow Analysis
      </h3>
      
      <div className="space-y-6">
        {/* Line Chart for Trends */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Income vs Expenses</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                className="text-gray-600 dark:text-gray-400" 
                fontSize={12}
              />
              <YAxis 
                className="text-gray-600 dark:text-gray-400" 
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Income"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#EF4444" 
                strokeWidth={3}
                name="Expenses"
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Bar Chart for Net Flow */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Net Cash Flow</h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                className="text-gray-600 dark:text-gray-400" 
                fontSize={12}
              />
              <YAxis 
                className="text-gray-600 dark:text-gray-400" 
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="net" 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                name="Net Flow"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CashFlowChart;
