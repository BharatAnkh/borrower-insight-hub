
import React from 'react';
import { Clock, DollarSign, TrendingUp, Briefcase } from 'lucide-react';

const BehaviorInsights: React.FC = () => {
  const insights = [
    {
      icon: Clock,
      label: 'Avg Work Hours/Week',
      value: '42.5',
      trend: '+5%',
      trendUp: true,
      color: 'blue'
    },
    {
      icon: DollarSign,
      label: 'Spending Ratio',
      value: '73%',
      trend: '-2%',
      trendUp: false,
      color: 'green'
    },
    {
      icon: Briefcase,
      label: 'Gig Diversity',
      value: '3.2',
      trend: '+0.8',
      trendUp: true,
      color: 'purple'
    },
    {
      icon: TrendingUp,
      label: 'Income Volatility',
      value: 'Low',
      trend: 'Stable',
      trendUp: true,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Behavioral Insights
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${getColorClasses(insight.color)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-sm font-medium ${
                  insight.trendUp 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {insight.trend}
                </span>
              </div>
              
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {insight.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {insight.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Additional Insights */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Key Observations</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Consistent work patterns indicate stable income potential
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Decreasing spending ratio shows improving financial discipline
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Diversified income sources reduce default risk
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehaviorInsights;
