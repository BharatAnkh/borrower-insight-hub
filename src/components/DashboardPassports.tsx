import React, { useState } from "react";
import {
  FileText,
  MapPin,
  Briefcase,
  DollarSign,
  TrendingUp,
  Search,
} from "lucide-react";

interface DashboardPassportsProps {
  onBorrowerSelect: (borrower: any) => void;
}

const DashboardPassports: React.FC<DashboardPassportsProps> = ({
  onBorrowerSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const mockBorrowers = [
    {
      id: "1",
      did: "did:ethr:0x1234...5678",
      name: "Alex Johnson",
      age: 28,
      country: "United States",
      gigPlatform: "Uber/Lyft",
      creditScore: 742,
      suggestedLimit: 25000,
      monthlyEarnings: 5200,
      monthlySpending: 3950,
      savingsRate: 24,
      stabilityScore: 8.2,
      avgRating: 4.8,
      shapDrivers: [
        { name: "Payment History", value: 0.35, icon: FileText },
        { name: "Income Stability", value: 0.28, icon: TrendingUp },
        { name: "Debt Ratio", value: 0.22, icon: DollarSign },
      ],
      walletAge: "2.3 years",
      txnCount: 1247,
      avgMonthlyIncome: 5200,
    },
    {
      id: "2",
      did: "did:ethr:0xabcd...efgh",
      name: "Maria Rodriguez",
      age: 34,
      country: "Mexico",
      gigPlatform: "DoorDash/Instacart",
      creditScore: 695,
      suggestedLimit: 18000,
      monthlyEarnings: 4100,
      monthlySpending: 3200,
      savingsRate: 22,
      stabilityScore: 7.5,
      avgRating: 4.6,
      shapDrivers: [
        { name: "Payment History", value: 0.31, icon: FileText },
        { name: "Credit Utilization", value: 0.29, icon: TrendingUp },
        { name: "Income Stability", value: 0.25, icon: DollarSign },
      ],
      walletAge: "1.8 years",
      txnCount: 892,
      avgMonthlyIncome: 4100,
    },
    {
      id: "3",
      did: "did:ethr:0xdef0...1234",
      name: "James Chen",
      age: 31,
      country: "United States",
      gigPlatform: "TaskRabbit/Fiverr",
      creditScore: 718,
      suggestedLimit: 22000,
      monthlyEarnings: 4800,
      monthlySpending: 3400,
      savingsRate: 29,
      stabilityScore: 7.8,
      avgRating: 4.9,
      shapDrivers: [
        { name: "Payment History", value: 0.33, icon: FileText },
        { name: "Income Diversity", value: 0.27, icon: TrendingUp },
        { name: "Spending Patterns", value: 0.24, icon: DollarSign },
      ],
      walletAge: "3.1 years",
      txnCount: 2156,
      avgMonthlyIncome: 4800,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-500";
    if (score >= 65) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 75) return "from-green-500 to-green-600";
    if (score >= 65) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const filteredBorrowers = mockBorrowers.filter(
    (borrower) =>
      borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.gigPlatform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.did.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Financial Passports
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Click on any passport to proceed with loan origination
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, country, platform, or DID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBorrowers.map((borrower) => (
          <div
            key={borrower.id}
            onClick={() => onBorrowerSelect(borrower)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {borrower.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Financial Passport NFT
                  </p>
                </div>
              </div>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                Verified
              </span>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {borrower.country}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {borrower.gigPlatform}
                </span>
              </div>
            </div>

            {/* Credit Score */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Credit Score
                </span>
                <span
                  className={`text-lg font-bold ${getScoreColor(
                    borrower.creditScore
                  )}`}
                >
                  {borrower.creditScore}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(
                    borrower.creditScore
                  )}`}
                  style={{ width: `${(borrower.creditScore / 850) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Financial Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Monthly Earnings
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  ${borrower.monthlyEarnings.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Monthly Spending
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  ${borrower.monthlySpending.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Scores */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Savings Rate
                </p>
                <p className="font-semibold text-green-600 dark:text-green-400">
                  {borrower.savingsRate}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Stability Score
                </p>
                <p className="font-semibold text-blue-600 dark:text-blue-400">
                  {borrower.stabilityScore}/10
                </p>
              </div>
            </div>

            {/* Suggested Limit */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Suggested Limit
              </p>
              <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                ${borrower.suggestedLimit.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredBorrowers.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No passports found matching "{searchTerm}"
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Try searching by name, country, platform, or DID
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardPassports;
