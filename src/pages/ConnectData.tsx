
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, CreditCard, Users, CheckCircle, Circle } from 'lucide-react';

const ConnectData = () => {
  // Mock connection states - will be replaced with real integrations
  const dataSources = [
    {
      id: 'plaid',
      name: 'Bank Account',
      description: 'Connect your bank account via Plaid for transaction history and income verification',
      provider: 'Plaid',
      icon: CreditCard,
      connected: false,
      benefits: ['Transaction categorization', 'Income stability analysis', 'Spending pattern insights']
    },
    {
      id: 'argyle',
      name: 'Gig Work History',
      description: 'Link your gig work accounts (Uber, DoorDash, etc.) for employment verification',
      provider: 'Argyle',
      icon: Users,
      connected: true,
      benefits: ['Employment verification', 'Earnings history', 'Performance metrics']
    },
    {
      id: 'employment',
      name: 'Traditional Employment',
      description: 'Verify your traditional employment history and income',
      provider: 'Argyle',
      icon: Building2,
      connected: false,
      benefits: ['Job history verification', 'Salary verification', 'Employment tenure']
    }
  ];

  const handleConnect = (sourceId: string) => {
    console.log(`Connecting to ${sourceId}...`);
    // Mock API call - will be replaced with real integration
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Connect Your Data</h1>
        <p className="text-muted-foreground">
          Link your financial and employment data to build a comprehensive identity
        </p>
      </div>

      <div className="space-y-4">
        {dataSources.map((source) => {
          const Icon = source.icon;
          return (
            <Card key={source.id} className={source.connected ? 'border-green-200' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      source.connected ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        source.connected ? 'text-green-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <div className="font-semibold">{source.name}</div>
                      <div className="text-sm text-muted-foreground">via {source.provider}</div>
                    </div>
                  </div>
                  {source.connected ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </CardTitle>
                <CardDescription>{source.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Benefits:</div>
                    <ul className="space-y-1">
                      {source.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {source.connected ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Connected</span>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => handleConnect(source.id)}
                      className="w-full"
                    >
                      Connect {source.name}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div className="space-y-1">
              <div className="font-medium text-blue-900">Your Data is Secure</div>
              <div className="text-sm text-blue-700">
                All data is encrypted and you control who can access it. We never store your login credentials.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectData;
