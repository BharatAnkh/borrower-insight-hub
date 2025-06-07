
import React, { useState } from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import AnalysisReport from './AnalysisReport';
import BorrowerSummary from './BorrowerSummary';
import FinancialPassport from './FinancialPassport';
import LoanConfiguration from './LoanConfiguration';
import LoanPreview from './LoanPreview';

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
        <div className="mb-6">
          <BorrowerSummary borrower={selectedBorrower} />
        </div>

        {/* Financial Passport */}
        <div className="mb-6">
          <FinancialPassport 
            borrower={selectedBorrower}
            onGenerateAnalysis={handleGenerateAnalysis}
            isGeneratingReport={isGeneratingReport}
            showAnalysisReport={showAnalysisReport}
          />
        </div>

        {/* Analysis Report */}
        {showAnalysisReport && (
          <div className="mb-6">
            <AnalysisReport borrower={selectedBorrower} />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Loan Configuration */}
          <LoanConfiguration
            loanAmount={loanAmount}
            loanTerm={loanTerm}
            interestRate={interestRate}
            originationFeeRate={originationFeeRate}
            maxLoanAmount={selectedBorrower.suggestedLimit}
            onLoanAmountChange={setLoanAmount}
            onLoanTermChange={setLoanTerm}
            onInterestRateChange={setInterestRate}
            onOriginationFeeRateChange={setOriginationFeeRate}
          />
          
          {/* Loan Preview */}
          <LoanPreview
            loanAmount={loanAmount}
            interestRate={interestRate}
            originationFeeRate={originationFeeRate}
            loanTerm={loanTerm}
            originationFee={originationFee}
            monthlyPayment={monthlyPayment}
          />
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
