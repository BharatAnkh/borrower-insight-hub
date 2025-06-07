
import React from 'react';
import { TrendingUp, Wallet, Clock, Activity } from 'lucide-react';
import CashFlowChart from './CashFlowChart';
import BehaviorInsights from './BehaviorInsights';

interface AnalysisReportProps {
  borrower: any;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ borrower }) => {
  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-500';
    if (score >= 650) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 750) return 'from-green-500 to-green-600';
    if (score >= 650) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Financial Passport Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Financial Passport - {borrower.name}
          </h3>
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
            NFT Verified
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Credit Score */}
          <div className="space-y-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(borrower.creditScore)} mb-2`}>
                {borrower.creditScore}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(borrower.creditScore)}`}
                  style={{ width: `${(borrower.creditScore / 850) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Credit Score</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Suggested Limit</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${borrower.suggestedLimit.toLocaleString()}
              </p>
            </div>
          </div>
          
          {/* SHAP Drivers */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Top Risk Factors</h4>
            <div className="space-y-3">
              {borrower.shapDrivers.map((driver: any, index: number) => {
                const Icon = driver.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {driver.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-blue-600"
                          style={{ width: `${driver.value * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {(driver.value * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* On-Chain Behavior */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          On-Chain Behavior
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Wallet Age</p>
              <p className="font-semibold text-gray-900 dark:text-white">{borrower.walletAge}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Activity className="w-8 h-8 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
              <p className="font-semibold text-gray-900 dark:text-white">{borrower.txnCount.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Monthly Income</p>
              <p className="font-semibold text-gray-900 dark:text-white">${borrower.avgMonthlyIncome.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CashFlowChart />
        <BehaviorInsights />
      </div>
    </div>
  );
};

export default AnalysisReport;
