
import React, { useState } from 'react';
import { DollarSign, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface LoanOriginationProps {
  selectedBorrower: any;
}

const LoanOrigination: React.FC<LoanOriginationProps> = ({ selectedBorrower }) => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const interestRate = 8.5; // Base rate
  const originationFee = loanAmount * 0.025; // 2.5%
  const monthlyPayment = (loanAmount * (interestRate / 100 / 12)) / (1 - Math.pow(1 + (interestRate / 100 / 12), -loanTerm));

  const handleSubmitLoan = async () => {
    if (!selectedBorrower) {
      toast({
        title: "No Borrower Selected",
        description: "Please select a borrower before issuing a loan",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate GraphQL mutation
    setTimeout(() => {
      toast({
        title: "Loan Issued Successfully",
        description: `$${loanAmount.toLocaleString()} loan issued to ${selectedBorrower.name}`,
      });
      setIsSubmitting(false);
    }, 2000);
  };

  if (!selectedBorrower) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Borrower Selected
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Please select a borrower from the dashboard to proceed with loan origination.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Loan Origination
        </h2>
        
        {/* Borrower Summary */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {selectedBorrower.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Credit Score: {selectedBorrower.creditScore} | Suggested Limit: ${selectedBorrower.suggestedLimit.toLocaleString()}
              </p>
            </div>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
              Approved
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Loan Configuration */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Loan Amount: ${loanAmount.toLocaleString()}
              </label>
              <input
                type="range"
                min="5000"
                max={selectedBorrower.suggestedLimit}
                step="1000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span>$5,000</span>
                <span>${selectedBorrower.suggestedLimit.toLocaleString()}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Loan Term
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value={6}>6 months</option>
                <option value={12}>12 months</option>
                <option value={18}>18 months</option>
                <option value={24}>24 months</option>
                <option value={36}>36 months</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Interest Rate
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {interestRate}%
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Origination Fee
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  ${originationFee.toFixed(0)}
                </p>
              </div>
            </div>
          </div>
          
          {/* Loan Preview */}
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
                <span className="text-gray-600 dark:text-gray-400">Origination Fee</span>
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
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmitLoan}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <DollarSign className="w-5 h-5" />
                <span>Issue Loan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanOrigination;
