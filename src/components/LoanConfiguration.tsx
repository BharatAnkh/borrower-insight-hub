import React from "react";

interface LoanConfigurationProps {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  originationFeeRate: number;
  maxLoanAmount: number;
  onLoanAmountChange: (amount: number) => void;
  onLoanTermChange: (term: number) => void;
  onInterestRateChange: (rate: number) => void;
  onOriginationFeeRateChange: (rate: number) => void;
}

const LoanConfiguration: React.FC<LoanConfigurationProps> = ({
  loanAmount,
  loanTerm,
  interestRate,
  originationFeeRate,
  maxLoanAmount,
  onLoanAmountChange,
  onLoanTermChange,
  onInterestRateChange,
  onOriginationFeeRateChange,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Loan Amount: ${loanAmount.toLocaleString()}
        </label>
        <input
          type="range"
          min="500"
          max={maxLoanAmount}
          step="100"
          value={loanAmount}
          onChange={(e) => onLoanAmountChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
          <span>$5,000</span>
          <span>${maxLoanAmount.toLocaleString()}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Loan Term
        </label>
        <select
          value={loanTerm}
          onChange={(e) => onLoanTermChange(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value={6}>6 months</option>
          <option value={12}>12 months</option>
          <option value={18}>18 months</option>
          <option value={24}>24 months</option>
          <option value={36}>36 months</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Interest Rate (%)
          </label>
          <input
            type="number"
            min="1"
            max="50"
            step="0.1"
            value={interestRate}
            onChange={(e) => onInterestRateChange(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Origination Fee (%)
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={originationFeeRate}
            onChange={(e) => onOriginationFeeRateChange(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default LoanConfiguration;
