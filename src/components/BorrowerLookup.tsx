import React, { useState } from 'react';
import { Search, User, CreditCard, TrendingUp } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface BorrowerLookupProps {
  onBorrowerSelect: (borrower: any) => void;
  selectedBorrower: any;
}

const BorrowerLookup: React.FC<BorrowerLookupProps> = ({ onBorrowerSelect, selectedBorrower }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Enhanced mock borrower data
  const mockBorrowers = [
    {
      id: '1',
      did: 'did:ethr:0x1234...5678',
      name: 'Alex Johnson',
      age: 28,
      country: 'United States',
      gigPlatform: 'Uber/Lyft',
      creditScore: 742,
      suggestedLimit: 25000,
      shapDrivers: [
        { name: 'Payment History', value: 0.35, icon: CreditCard },
        { name: 'Income Stability', value: 0.28, icon: TrendingUp },
        { name: 'Debt Ratio', value: 0.22, icon: User }
      ],
      walletAge: '2.3 years',
      txnCount: 1247,
      avgMonthlyIncome: 5200
    },
    {
      id: '2',
      did: 'did:ethr:0xabcd...efgh',
      name: 'Maria Rodriguez',
      age: 34,
      country: 'Mexico',
      gigPlatform: 'DoorDash/Instacart',
      creditScore: 695,
      suggestedLimit: 18000,
      shapDrivers: [
        { name: 'Payment History', value: 0.31, icon: CreditCard },
        { name: 'Credit Utilization', value: 0.29, icon: TrendingUp },
        { name: 'Income Stability', value: 0.25, icon: User }
      ],
      walletAge: '1.8 years',
      txnCount: 892,
      avgMonthlyIncome: 4100
    }
  ];

  const handleSearch = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const borrower = mockBorrowers.find(b => 
        b.did.includes(searchTerm) || 
        b.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (borrower) {
        onBorrowerSelect(borrower);
        toast({
          title: "Borrower Found",
          description: `Financial passport loaded for ${borrower.name}`,
        });
      } else {
        toast({
          title: "No Results",
          description: "No borrower found with that DID or name",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Borrower Lookup
      </h3>
      
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Enter DID or search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        <button
          onClick={handleSearch}
          disabled={!searchTerm || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {isLoading ? 'Searching...' : 'Lookup Financial Passport'}
        </button>
        
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Quick Select:</p>
          <div className="space-y-2">
            {mockBorrowers.map((borrower) => (
              <button
                key={borrower.id}
                onClick={() => onBorrowerSelect(borrower)}
                className={`w-full text-left p-3 rounded-lg border transition-colors duration-200 ${
                  selectedBorrower?.id === borrower.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {borrower.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {borrower.country} • {borrower.gigPlatform}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Score: {borrower.creditScore}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Limit: ${borrower.suggestedLimit.toLocaleString()}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowerLookup;
