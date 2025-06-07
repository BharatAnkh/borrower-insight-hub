
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Target } from 'lucide-react';

const Insights = () => {
  // Mock insights data - will be replaced with AI-powered analysis
  const insights = {
    scoreBreakdown: [
      { category: 'Payment History', score: 85, weight: 35 },
      { category: 'Income Stability', score: 72, weight: 30 },
      { category: 'Account Activity', score: 90, weight: 20 },
      { category: 'Employment History', score: 68, weight: 15 }
    ],
    recommendations: [
      {
        id: 1,
        type: 'positive',
        title: 'Great payment consistency!',
        description: 'You have maintained regular payments for the past 3 months.',
        impact: '+5 points'
      },
      {
        id: 2,
        type: 'improvement',
        title: 'Increase gig work frequency',
        description: 'Working more consistently could improve your income stability score.',
        impact: '+8 points potential'
      },
      {
        id: 3,
        type: 'warning',
        title: 'Low bank account balance',
        description: 'Consider maintaining a higher minimum balance for better financial health.',
        impact: '+3 points potential'
      }
    ],
    weeklyTips: [
      'Complete at least 15 gig deliveries this week',
      'Maintain your bank balance above $500',
      'Avoid late cancellations on gig platforms'
    ]
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'improvement':
        return <Target className="w-5 h-5 text-blue-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <TrendingUp className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBgColorForType = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-50 border-green-200';
      case 'improvement':
        return 'bg-blue-50 border-blue-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Financial Insights</h1>
        <p className="text-muted-foreground">
          AI-powered recommendations to improve your financial identity
        </p>
      </div>

      {/* Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
          <CardDescription>How your 78-point score is calculated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.scoreBreakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-sm text-muted-foreground">{item.score}/100</span>
                </div>
                <Progress value={item.score} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Weight: {item.weight}% of total score
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>Actions to improve your financial identity score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.recommendations.map((rec) => (
              <div key={rec.id} className={`p-4 rounded-lg border ${getBgColorForType(rec.type)}`}>
                <div className="flex items-start space-x-3">
                  {getIconForType(rec.type)}
                  <div className="flex-1 space-y-1">
                    <div className="font-medium">{rec.title}</div>
                    <div className="text-sm text-muted-foreground">{rec.description}</div>
                    <div className="text-xs font-medium text-primary">{rec.impact}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Tips */}
      <Card>
        <CardHeader>
          <CardTitle>This Week's Action Items</CardTitle>
          <CardDescription>Small steps for big improvements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.weeklyTips.map((tip, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className="w-6 h-6 border-2 border-primary rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Score Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span>Score Trend</span>
          </CardTitle>
          <CardDescription>Your progress over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>This Week</span>
              <span className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">+5</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>This Month</span>
              <span className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">+12</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Last Month</span>
              <span className="flex items-center space-x-1 text-red-600">
                <TrendingDown className="w-4 h-4" />
                <span className="font-semibold">-3</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;
