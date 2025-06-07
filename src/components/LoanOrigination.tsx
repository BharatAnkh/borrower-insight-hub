
import React, { useState } from 'react';
import { DollarSign, Calendar, TrendingUp, AlertCircle, User, MapPin, Briefcase, FileText, BarChart3 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import AnalysisReport from './AnalysisReport';

interface LoanOriginationProps {
  selectedBorrower: any;
}

const LoanOrigination: React.FC<LoanOriginationProps> = ({ selectedBorrower }) => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [interestRate, setInterestRate] = useState(8.5);
  const [originationFeeRate, setOriginationFeeRate] = useState(2.5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnalysisReport, setShowAnalysisReport] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const { toast } = useToast();

  const originationFee = loanAmount * (originationFeeRate / 100);
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
    
    setTimeout(() => {
      toast({
        title: "Loan Issued Successfully",
        description: `$${loanAmount.toLocaleString()} loan issued to ${selectedBorrower.name}`,
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleGenerateAnalysis = async () => {
    setIsGeneratingReport(true);
    
    setTimeout(() => {
      setShowAnalysisReport(true);
      setIsGeneratingReport(false);
      toast({
        title: "Analysis Report Generated",
        description: "Financial analysis report has been generated successfully",
      });
    }, 3000);
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
        
        {/* Enhanced Borrower Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {selectedBorrower.name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Age</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {selectedBorrower.age || '28 years'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Country</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {selectedBorrower.country || 'United States'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Primary Platform</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {selectedBorrower.gigPlatform || 'Uber/Lyft'}
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
                  {selectedBorrower.creditScore}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Limit: ${selectedBorrower.suggestedLimit.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Passport */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-6 mb-6">
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
                {selectedBorrower.did}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Wallet Age</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedBorrower.walletAge}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedBorrower.txnCount.toLocaleString()}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleGenerateAnalysis}
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

        {/* Analysis Report */}
        {showAnalysisReport && (
          <div className="mb-6">
            <AnalysisReport borrower={selectedBorrower} />
          </div>
        )}
        
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
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
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
                  onChange={(e) => setInterestRate(Number(e.target.value))}
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
                  onChange={(e) => setOriginationFeeRate(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
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
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmitLoan}
            disabled={isSubmitting || !showAnalysisReport}
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
