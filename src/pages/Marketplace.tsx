
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Building2, Search, Star, Users, DollarSign, Clock } from 'lucide-react';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock lenders data - will be replaced with real marketplace data
  const lenders = [
    {
      id: 1,
      name: 'GigCredit',
      type: 'Gig Worker Specialist',
      logo: '🚗',
      rating: 4.8,
      reviews: 1250,
      minScore: 65,
      maxLoan: 5000,
      apr: '8.9% - 24.9%',
      term: '3-24 months',
      features: ['No collateral required', 'Fast approval', 'Gig-friendly'],
      description: 'Specialized loans for gig workers and freelancers'
    },
    {
      id: 2,
      name: 'CryptoLend',
      type: 'Crypto-Backed Loans',
      logo: '₿',
      rating: 4.6,
      reviews: 890,
      minScore: 70,
      maxLoan: 25000,
      apr: '6.5% - 18.9%',
      term: '6-36 months',
      features: ['Crypto collateral', 'Global access', 'Low rates'],
      description: 'Use your crypto assets as collateral for traditional loans'
    },
    {
      id: 3,
      name: 'FlexiFund',
      type: 'Personal Loans',
      logo: '💰',
      rating: 4.7,
      reviews: 2100,
      minScore: 60,
      maxLoan: 15000,
      apr: '7.2% - 22.5%',
      term: '2-60 months',
      features: ['Flexible terms', 'Quick decisions', 'Multiple use cases'],
      description: 'Personal loans for various financial needs'
    },
    {
      id: 4,
      name: 'StartupBoost',
      type: 'Business Loans',
      logo: '🚀',
      rating: 4.5,
      reviews: 650,
      minScore: 75,
      maxLoan: 100000,
      apr: '5.9% - 16.9%',
      term: '12-84 months',
      features: ['Business focus', 'Growth capital', 'Mentorship'],
      description: 'Funding for small businesses and startups'
    }
  ];

  const filteredLenders = lenders.filter(lender =>
    lender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lender.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (lenderId: number, lenderName: string) => {
    console.log(`Applying to ${lenderName} (ID: ${lenderId})`);
    // Mock API call - will be replaced with real application process
  };

  const handleExpressInterest = (lenderId: number, lenderName: string) => {
    console.log(`Expressing interest to ${lenderName} (ID: ${lenderId})`);
    // Mock API call - will be replaced with real interest expression
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Lender Marketplace</h1>
        <p className="text-muted-foreground">
          Find the right lender for your financial needs
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search lenders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Your Score Banner */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Your Financial Score: 78</div>
              <div className="text-sm text-blue-100">
                You qualify for {filteredLenders.filter(l => l.minScore <= 78).length} lenders
              </div>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </CardContent>
      </Card>

      {/* Lenders List */}
      <div className="space-y-4">
        {filteredLenders.map((lender) => (
          <Card key={lender.id} className={`${lender.minScore <= 78 ? 'border-green-200' : 'opacity-75'}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{lender.logo}</div>
                  <div>
                    <CardTitle className="text-lg">{lender.name}</CardTitle>
                    <CardDescription>{lender.type}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{lender.rating}</span>
                  <span className="text-xs text-muted-foreground">({lender.reviews})</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{lender.description}</p>
                
                {/* Key Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span>Up to ${lender.maxLoan.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Min score: {lender.minScore}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{lender.term}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-orange-600" />
                    <span>APR: {lender.apr}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {lender.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  {lender.minScore <= 78 ? (
                    <>
                      <Button 
                        onClick={() => handleApply(lender.id, lender.name)}
                        className="flex-1"
                      >
                        Apply Now
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleExpressInterest(lender.id, lender.name)}
                      >
                        Express Interest
                      </Button>
                    </>
                  ) : (
                    <div className="flex-1">
                      <Button disabled className="w-full">
                        Score Too Low (Need {lender.minScore}+)
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        Improve your score by {lender.minScore - 78} points to qualify
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLenders.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-muted-foreground">
              No lenders found matching your search criteria
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Marketplace;
