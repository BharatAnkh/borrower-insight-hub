
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Wallet, Users, Link, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data - will be replaced with real integrations
  const financialScore = 78;
  const connectedSources = 2;
  const totalSources = 3;
  const recentActivity = [
    { type: 'XRP Transaction', amount: '+$120', time: '2 hours ago' },
    { type: 'Gig Earnings', amount: '+$85', time: '5 hours ago' },
    { type: 'Bank Transfer', amount: '-$200', time: '1 day ago' },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Financial Score Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Financial Identity Score
            <TrendingUp className="w-6 h-6" />
          </CardTitle>
          <CardDescription className="text-blue-100">
            Based on your connected data sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{financialScore}</div>
              <div className="text-sm text-blue-100">out of 100</div>
            </div>
            <Progress value={financialScore} className="h-2" />
            <div className="text-sm text-blue-100">
              +5 points this week • Keep it up!
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Data Sources</CardTitle>
          <CardDescription>
            {connectedSources} of {totalSources} sources connected
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Wallet className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium">XRP Wallet</div>
                  <div className="text-sm text-muted-foreground">Connected</div>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium">Gig Work (Argyle)</div>
                  <div className="text-sm text-muted-foreground">Connected</div>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg opacity-60">
              <div className="flex items-center space-x-3">
                <Link className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">Bank Account (Plaid)</div>
                  <div className="text-sm text-muted-foreground">Not connected</div>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => navigate('/connect')}
              >
                Connect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium">{activity.type}</div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
                <div className={`font-semibold ${
                  activity.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {activity.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="h-16 flex-col space-y-1"
          onClick={() => navigate('/insights')}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm">View Insights</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-16 flex-col space-y-1"
          onClick={() => navigate('/marketplace')}
        >
          <Users className="w-5 h-5" />
          <span className="text-sm">Find Lenders</span>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
