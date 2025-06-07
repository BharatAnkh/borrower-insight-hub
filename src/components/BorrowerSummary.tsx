
import React from 'react';
import { User, MapPin, Briefcase } from 'lucide-react';

interface BorrowerSummaryProps {
  borrower: any;
}

const BorrowerSummary: React.FC<BorrowerSummaryProps> = ({ borrower }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {borrower.name}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Age</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {borrower.age || '28 years'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Country</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {borrower.country || 'United States'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Primary Platform</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {borrower.gigPlatform || 'Uber/Lyft'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
              Verified Identity
            </span>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">
              Active Gig Worker
            </span>
            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm">
              Multi-Platform
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 dark:text-gray-400">Credit Score</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {borrower.creditScore}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Limit: ${borrower.suggestedLimit.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowerSummary;
