
import React from 'react';
import { Calendar } from 'lucide-react';

interface LoanPreviewProps {
  loanAmount: number;
  interestRate: number;
  originationFeeRate: number;
  loanTerm: number;
  originationFee: number;
  monthlyPayment: number;
}

const LoanPreview: React.FC<LoanPreviewProps> = ({
  loanAmount,
  interestRate,
  originationFeeRate,
  loanTerm,
  originationFee,
  monthlyPayment
}) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        Loan Preview
      </h3>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Principal Amount</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ${loanAmount.toLocaleString()}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Interest Rate</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {interestRate}%
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Origination Fee ({originationFeeRate}%)</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ${originationFee.toFixed(0)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Net Disbursement</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ${(loanAmount - originationFee).toLocaleString()}
          </span>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Monthly Payment</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${monthlyPayment.toFixed(0)}
            </span>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Payment Schedule
            </span>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {loanTerm} monthly payments of ${monthlyPayment.toFixed(0)}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Total repayment: ${(monthlyPayment * loanTerm).toFixed(0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanPreview;
