
import React, { useState } from 'react';
import { Search, DollarSign, TrendingUp, Shield, Bell } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface BorrowerListing {
  id: string;
  financialScore: number;
  requestedAmount: number;
  seekingRate: number;
  location: string;
  platform: string;
  monthlyIncome: number;
  creditUtilization: number;
  paymentHistory: number;
  timeOnPlatform: string;
  loanPurpose: string;
  riskCategory: 'low' | 'medium' | 'high';
}

const BorrowerMarketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBorrower, setSelectedBorrower] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock borrower listings data
  const borrowerListings: BorrowerListing[] = [
    {
      id: 'BRW001',
      financialScore: 742,
      requestedAmount: 25000,
      seekingRate: 8.5,
      location: 'California, US',
      platform: 'Uber/Lyft',
      monthlyIncome: 5200,
      creditUtilization: 25,
      paymentHistory: 98,
      timeOnPlatform: '2.3 years',
      loanPurpose: 'Vehicle maintenance',
      riskCategory: 'low'
    },
    {
      id: 'BRW002',
      financialScore: 695,
      requestedAmount: 18000,
      seekingRate: 9.2,
      location: 'Texas, US',
      platform: 'DoorDash/Instacart',
      monthlyIncome: 4100,
      creditUtilization: 35,
      paymentHistory: 92,
      timeOnPlatform: '1.8 years',
      loanPurpose: 'Equipment upgrade',
      riskCategory: 'medium'
    },
    {
      id: 'BRW003',
      financialScore: 718,
      requestedAmount: 22000,
      seekingRate: 8.8,
      location: 'New York, US',
      platform: 'TaskRabbit/Fiverr',
      monthlyIncome: 4800,
      creditUtilization: 30,
      paymentHistory: 95,
      timeOnPlatform: '3.1 years',
      loanPurpose: 'Business expansion',
      riskCategory: 'low'
    },
    {
      id: 'BRW004',
      financialScore: 658,
      requestedAmount: 15000,
      seekingRate: 10.5,
      location: 'Florida, US',
      platform: 'Postmates/GrubHub',
      monthlyIncome: 3600,
      creditUtilization: 45,
      paymentHistory: 88,
      timeOnPlatform: '1.2 years',
      loanPurpose: 'Debt consolidation',
      riskCategory: 'medium'
    },
    {
      id: 'BRW005',
      financialScore: 775,
      requestedAmount: 35000,
      seekingRate: 7.8,
      location: 'Washington, US',
      platform: 'Uber/Lyft Premium',
      monthlyIncome: 6800,
      creditUtilization: 20,
      paymentHistory: 99,
      timeOnPlatform: '4.2 years',
      loanPurpose: 'Property investment',
      riskCategory: 'low'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600 dark:text-green-400';
    if (score >= 650) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const handleSendInterest = async (borrowerId: string) => {
    try {
      // Mock API call - replace with actual implementation
      const response = await fetch('/api/lender/send-interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          borrowerId,
          lenderId: 'current-lender-id', // This would come from auth context
          message: 'I am interested in funding your loan request.'
        })
      });

      // Mock success response
      console.log('Interest notification sent to borrower:', borrowerId);
      
      toast({
        title: "Interest Sent!",
        description: "Your interest notification has been sent to the borrower.",
      });
    } catch (error) {
      console.error('Error sending interest:', error);
      toast({
        title: "Error",
        description: "Failed to send interest notification. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredListings = borrowerListings.filter(listing =>
    listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.loanPurpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Borrower Marketplace
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse loan requests from verified borrowers and express your interest
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by location, platform, purpose, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Borrower {listing.id}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {listing.platform}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskBadgeColor(listing.riskCategory)}`}>
                {listing.riskCategory.charAt(0).toUpperCase() + listing.riskCategory.slice(1)} Risk
              </span>
            </div>

            {/* Loan Details */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="text-xs text-gray-600 dark:text-gray-400">Requested Amount</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  ${listing.requestedAmount.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="text-xs text-gray-600 dark:text-gray-400">Seeking Rate</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {listing.seekingRate}%
                </p>
              </div>
            </div>

            {/* Financial Score */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Financial Score</span>
                <span className={`text-lg font-bold ${getScoreColor(listing.financialScore)}`}>
                  {listing.financialScore}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                  style={{ width: `${(listing.financialScore / 850) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Monthly Income</p>
                <p className="font-semibold text-green-600 dark:text-green-400">
                  ${listing.monthlyIncome.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Payment History</p>
                <p className="font-semibold text-blue-600 dark:text-blue-400">
                  {listing.paymentHistory}%
                </p>
              </div>
            </div>

            {/* Location and Purpose */}
            <div className="mb-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Location</p>
              <p className="text-sm text-gray-900 dark:text-white">{listing.location}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 mb-1">Purpose</p>
              <p className="text-sm text-gray-900 dark:text-white">{listing.loanPurpose}</p>
            </div>

            {/* Express Interest Button */}
            <button
              onClick={() => handleSendInterest(listing.id)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Bell className="w-5 h-5" />
              <span>Express Interest</span>
            </button>
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No borrowers found matching "{searchTerm}"
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Try searching by location, platform, purpose, or borrower ID
          </p>
        </div>
      )}
    </div>
  );
};

export default BorrowerMarketplace;
