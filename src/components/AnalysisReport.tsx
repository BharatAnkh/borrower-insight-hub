import React from "react";
import {
  TrendingUp,
  Wallet,
  Clock,
  Activity,
  Shield,
  Star,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import CashFlowChart from "./CashFlowChart";
import BehaviorInsights from "./BehaviorInsights";

interface AnalysisReportProps {
  borrower: any;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ borrower }) => {
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

  const getRiskLevel = (score: number) => {
    if (score >= 75)
      return { level: "Low Risk", color: "green", icon: CheckCircle };
    if (score >= 65)
      return { level: "Medium Risk", color: "yellow", icon: Shield };
    return { level: "High Risk", color: "red", icon: AlertTriangle };
  };

  const riskAssessment = getRiskLevel(borrower.creditScore);
  const RiskIcon = riskAssessment.icon;

  return (
    <div className="space-y-6">
      {/* Risk Assessment Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Comprehensive Risk Assessment - {borrower.name}
          </h3>
          <div
            className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-${riskAssessment.color}-100 dark:bg-${riskAssessment.color}-900/30`}
          >
            <RiskIcon
              className={`w-5 h-5 text-${riskAssessment.color}-600 dark:text-${riskAssessment.color}-400`}
            />
            <span
              className={`font-medium text-${riskAssessment.color}-800 dark:text-${riskAssessment.color}-300`}
            >
              {riskAssessment.level}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Credit Score */}
          <div className="text-center">
            <div
              className={`text-4xl font-bold ${getScoreColor(
                borrower.creditScore
              )} mb-2`}
            >
              {borrower.creditScore}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(
                  borrower.creditScore
                )}`}
                style={{ width: `${borrower.creditScore}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Credit Score
            </p>
          </div>

          {/* Suggested Limit */}
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              ${(borrower.suggestedLimit / 1000).toFixed(0)}K
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Suggested Limit
            </p>
            <div className="text-xs text-gray-500">
              Based on 3.2x monthly income
            </div>
          </div>

          {/* Gig Rating */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-yellow-400 mr-1" />
              <span className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                {borrower.avgRating || "4.8"}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Avg Platform Rating
            </p>
            <div className="text-xs text-gray-500">
              Across {borrower.gigPlatform}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Insights from Plaid Data */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Financial Analysis (Plaid Transactional Data)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Spending Patterns
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Essential Expenses
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  72%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Discretionary Spending
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  18%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Savings & Investments
                </span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  10%
                </span>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <p className="text-sm text-green-800 dark:text-green-300">
                <strong>Positive Indicator:</strong> {borrower.name}{" "}
                demonstrates excellent financial discipline with consistent
                savings habits and minimal discretionary spending. Transaction
                history shows regular deposits from gig work with predictable
                spending patterns.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Income Stability
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Income Volatility
                </span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  Low (12%)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Payment Delays
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  0 in 6 months
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Emergency Fund
                </span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  2.3 months
                </span>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Income Analysis:</strong> Bank transactions reveal
                consistent weekly deposits averaging $1,200-$1,400. No
                overdrafts in the past 12 months, indicating strong cash flow
                management despite variable gig income.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Behavioral Insights from Argyle */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-purple-600" />
          Gig Work Behavioral Analysis (Argyle Platform Data)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Work Consistency
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Avg Hours/Week
                </span>
                <span className="font-medium">42.5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Active Days/Month
                </span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Cancellation Rate
                </span>
                <span className="font-medium text-green-600">3.2%</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Performance Metrics
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Customer Rating
                </span>
                <span className="font-medium text-yellow-600">4.8/5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Completion Rate
                </span>
                <span className="font-medium text-green-600">96.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Peak Hour Preference
                </span>
                <span className="font-medium">Evenings</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Platform Diversity
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Primary Platform
                </span>
                <span className="font-medium">Uber (65%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Secondary
                </span>
                <span className="font-medium">Lyft (25%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Other
                </span>
                <span className="font-medium">DoorDash (10%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <p className="text-sm text-purple-800 dark:text-purple-300">
            <strong>Behavioral Assessment:</strong> Argyle data shows{" "}
            {borrower.name} maintains exceptional work consistency with
            above-average hours and minimal cancellations. Platform ratings
            indicate reliable service delivery. The diversified income across
            multiple platforms reduces dependency risk and demonstrates
            adaptability.
          </p>
        </div>
      </div>

      {/* Digital Behavior Patterns */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-orange-600" />
          Digital Behavior & App Usage Patterns
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Device Usage Patterns
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Daily Screen Time
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  6.2 hours
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Work App Usage
                </span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  72% of total
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Average Battery Life
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  14 hours
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Financial App Engagement
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Banking App Opens/Week
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  12
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Budget App Usage
                </span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  Daily
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Investment Apps
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  2 active
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
          <p className="text-sm text-orange-800 dark:text-orange-300">
            <strong>Digital Behavior Insights:</strong> Screen time analysis
            reveals a disciplined approach to device usage with 72% dedicated to
            work-related applications. Regular engagement with financial apps
            (12 weekly banking app opens) indicates active financial monitoring.
            Consistent battery management suggests reliable connectivity for gig
            work.
          </p>
        </div>
      </div>

      {/* Overall Risk Assessment */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Comprehensive Risk Summary & Lending Recommendation
        </h3>

        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">
              Positive Risk Factors
            </h4>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>
                • Consistent income streams across multiple platforms with low
                volatility (12%)
              </li>
              <li>
                • Excellent payment history with zero late payments in the past
                12 months
              </li>
              <li>
                • Strong savings discipline with 10% allocation to emergency
                funds
              </li>
              <li>
                • High gig platform ratings (4.8/5) indicating reliable service
                delivery
              </li>
              <li>
                • Active financial app engagement suggesting strong money
                management habits
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">
              Areas of Consideration
            </h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>
                • Income dependent on gig economy platforms (platform risk)
              </li>
              <li>
                • Variable income patterns require careful cash flow monitoring
              </li>
              <li>
                • Limited traditional credit history beyond gig work earnings
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
              Lending Recommendation
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>APPROVED</strong> - {borrower.name} presents a{" "}
              <strong>low-risk lending opportunity</strong> with strong
              fundamentals across all data sources. The combination of
              consistent earnings, excellent platform ratings, disciplined
              spending habits, and active financial management makes this an
              ideal candidate for the suggested $
              {borrower.suggestedLimit.toLocaleString()} credit limit. Recommend
              standard terms with potential for limit increases based on
              continued performance.
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CashFlowChart />
        <BehaviorInsights />
      </div>
    </div>
  );
};

export default AnalysisReport;
