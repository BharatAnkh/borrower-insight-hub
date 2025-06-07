
import React from 'react';
import { FileText, BarChart3 } from 'lucide-react';

interface FinancialPassportProps {
  borrower: any;
  onGenerateAnalysis: () => void;
  isGeneratingReport: boolean;
  showAnalysisReport: boolean;
}

const FinancialPassport: React.FC<FinancialPassportProps> = ({
  borrower,
  onGenerateAnalysis,
  isGeneratingReport,
  showAnalysisReport
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Financial Passport NFT
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Blockchain-verified financial identity
            </p>
          </div>
        </div>
        <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
          Verified
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">DID</p>
          <p className="font-mono text-sm text-gray-900 dark:text-white break-all">
            {borrower.did}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Wallet Age</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {borrower.walletAge}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {borrower.txnCount.toLocaleString()}
          </p>
        </div>
      </div>
      
      <button
        onClick={onGenerateAnalysis}
        disabled={isGeneratingReport || showAnalysisReport}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
      >
        {isGeneratingReport ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Generating Analysis Report...</span>
          </>
        ) : showAnalysisReport ? (
          <>
            <BarChart3 className="w-5 h-5" />
            <span>Analysis Report Generated</span>
          </>
        ) : (
          <>
            <BarChart3 className="w-5 h-5" />
            <span>Generate Analysis Report</span>
          </>
        )}
      </button>
    </div>
  );
};

export default FinancialPassport;
