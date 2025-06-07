
import React, { useState } from 'react';
import { Calendar, DollarSign, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const LoanManagement: React.FC = () => {
  const [loans, setLoans] = useState([
    {
      id: '1',
      borrowerName: 'Alex Johnson',
      borrowerDid: 'did:ethr:0x1234...5678',
      amount: 25000,
      balance: 18500,
      monthlyPayment: 2150,
      nextPayment: '2024-01-15',
      status: 'CURRENT',
      term: 12,
      remainingTerm: 9,
      interestRate: 8.5
    },
    {
      id: '2',
      borrowerName: 'Maria Rodriguez',
      borrowerDid: 'did:ethr:0xabcd...efgh',
      amount: 18000,
      balance: 0,
      monthlyPayment: 1650,
      nextPayment: '2023-12-28',
      status: 'REPAID',
      term: 12,
      remainingTerm: 0,
      interestRate: 7.8
    },
    {
      id: '3',
      borrowerName: 'James Wilson',
      borrowerDid: 'did:ethr:0x9876...4321',
      amount: 15000,
      balance: 12300,
      monthlyPayment: 1350,
      nextPayment: '2024-01-20',
      status: 'LATE',
      term: 18,
      remainingTerm: 11,
      interestRate: 9.2
    }
  ]);
  
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    const styles = {
      CURRENT: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      LATE: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      REPAID: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      DEFAULT: 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
    };
    
    const icons = {
      CURRENT: CheckCircle,
      LATE: AlertTriangle,
      REPAID: CheckCircle,
      DEFAULT: TrendingDown
    };
    
    const Icon = icons[status as keyof typeof icons];
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  const handleRepayment = async (loanId: string) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;

    // Simulate GraphQL mutation
    setTimeout(() => {
      setLoans(prev => prev.map(l => 
        l.id === loanId 
          ? { ...l, balance: Math.max(0, l.balance - l.monthlyPayment), status: l.balance - l.monthlyPayment <= 0 ? 'REPAID' : l.status }
          : l
      ));
      
      toast({
        title: "Payment Processed",
        description: `Payment of $${loan.monthlyPayment.toLocaleString()} processed for ${loan.borrowerName}`,
      });
    }, 1000);
  };

  const totalPortfolioValue = loans.reduce((sum, loan) => sum + loan.balance, 0);
  const activeLoans = loans.filter(loan => loan.status !== 'REPAID').length;
  const lateLoans = loans.filter(loan => loan.status === 'LATE').length;

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Portfolio</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${totalPortfolioValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Loans</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeLoans}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Late Payments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {lateLoans}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loans Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Loan Portfolio
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Borrower
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Loan Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Monthly Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Next Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {loan.borrowerName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {loan.borrowerDid}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    ${loan.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      ${loan.balance.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {loan.remainingTerm} payments left
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    ${loan.monthlyPayment.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {loan.status !== 'REPAID' ? loan.nextPayment : '-'}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(loan.status)}
                  </td>
                  <td className="px-6 py-4">
                    {loan.status !== 'REPAID' && (
                      <button
                        onClick={() => handleRepayment(loan.id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        Process Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanManagement;
