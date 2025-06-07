
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wallet as WalletIcon, Copy, ArrowUpRight, ArrowDownLeft, RefreshCw } from 'lucide-react';

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  
  // Mock XRP data - will be replaced with real XRPL integration
  const mockWalletData = {
    balance: '1,247.50',
    address: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH',
    transactions: [
      {
        id: '1',
        type: 'received',
        amount: '+120.00',
        from: 'rDNvUUiyn...XRP',
        time: '2 hours ago',
        fee: '0.000012'
      },
      {
        id: '2',
        type: 'sent',
        amount: '-50.00',
        to: 'rUn84CJzdk...XRP',
        time: '1 day ago',
        fee: '0.000012'
      },
      {
        id: '3',
        type: 'received',
        amount: '+300.00',
        from: 'rLHzPsX6oQ...XRP',
        time: '3 days ago',
        fee: '0.000012'
      }
    ]
  };

  const handleConnectWallet = () => {
    // Mock wallet connection - will be replaced with real XRPL integration
    setIsConnected(true);
    console.log('Connecting to XRP Ledger wallet...');
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(mockWalletData.address);
    // Could add toast notification here
  };

  if (!isConnected) {
    return (
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader className="text-center">
            <WalletIcon className="w-16 h-16 mx-auto text-primary mb-4" />
            <CardTitle>Connect Your XRP Wallet</CardTitle>
            <CardDescription>
              Link your XRP Ledger wallet to analyze your on-chain financial behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Wallet Address</label>
              <Input
                placeholder="Enter your XRP wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleConnectWallet}
              className="w-full"
              disabled={!walletAddress}
            >
              Connect Wallet
            </Button>
            <div className="text-xs text-muted-foreground text-center">
              We only read your transaction history. We never access your private keys.
            </div>
          </CardContent>
        </Card>
        
        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Why Connect Your XRP Wallet?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <div className="font-medium">Transaction History Analysis</div>
                <div className="text-sm text-muted-foreground">We analyze your spending patterns and financial behavior</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <div className="font-medium">Credit Score Enhancement</div>
                <div className="text-sm text-muted-foreground">Regular transactions improve your financial identity score</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <div className="font-medium">Proof of Funds</div>
                <div className="text-sm text-muted-foreground">Demonstrate your financial stability to lenders</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Wallet Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            XRP Wallet
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </CardTitle>
          <CardDescription>Your XRP Ledger wallet overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{mockWalletData.balance} XRP</div>
              <div className="text-sm text-muted-foreground">≈ $751.25 USD</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="text-sm font-mono">{mockWalletData.address}</div>
              <Button variant="ghost" size="sm" onClick={copyAddress}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest XRP Ledger activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockWalletData.transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.type === 'received' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {tx.type === 'received' ? (
                      <ArrowDownLeft className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium capitalize">{tx.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {tx.type === 'received' ? `From ${tx.from}` : `To ${tx.to}`}
                    </div>
                    <div className="text-xs text-muted-foreground">{tx.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    tx.type === 'received' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.amount} XRP
                  </div>
                  <div className="text-xs text-muted-foreground">Fee: {tx.fee} XRP</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Insights</CardTitle>
          <CardDescription>Based on your XRP transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-semibold text-green-700">+15%</div>
              <div className="text-sm text-green-600">Monthly Growth</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-semibold text-blue-700">24</div>
              <div className="text-sm text-blue-600">Transactions</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-semibold text-purple-700">7 days</div>
              <div className="text-sm text-purple-600">Avg Frequency</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-lg font-semibold text-orange-700">92%</div>
              <div className="text-sm text-orange-600">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallet;
