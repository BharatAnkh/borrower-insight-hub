
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../hooks/useAuth';
import { Shield, Smartphone, TrendingUp } from 'lucide-react';

const AuthScreen = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">FinancialPassport</h1>
          <p className="text-gray-600">Build your verifiable financial identity</p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Connect Your Data</h3>
              <p className="text-sm text-gray-600">Link your wallet, bank, and gig work accounts</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Build Your Score</h3>
              <p className="text-sm text-gray-600">Generate a unified financial identity score</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Access Credit</h3>
              <p className="text-sm text-gray-600">Connect with lenders for fair opportunities</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Sign in to begin building your financial identity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={login} 
              className="w-full h-12 text-base font-semibold"
            >
              Sign in with Auth0
            </Button>
          </CardContent>
        </Card>

        <p className="text-xs text-gray-500 text-center">
          Your data is encrypted and you control who sees it
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
