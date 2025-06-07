
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Share2, Download, Eye, Copy, ExternalLink } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user, logout } = useAuth();
  const [profileUrl] = useState('https://financialpassport.app/profile/abc123');
  
  // Mock profile data - will be replaced with real user data
  const profileData = {
    score: 78,
    verifiedSources: ['XRP Wallet', 'Gig Work History'],
    lastUpdated: '2 hours ago',
    profileViews: 12,
    lenderInterests: 3,
    completeness: 85,
    badges: [
      { name: 'Crypto Verified', color: 'blue' },
      { name: 'Gig Worker', color: 'green' },
      { name: 'Consistent Earner', color: 'purple' }
    ]
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Financial Identity',
        text: 'Check out my verified financial profile',
        url: profileUrl
      });
    } else {
      navigator.clipboard.writeText(profileUrl);
      // Could add toast notification here
    }
  };

  const handleDownloadReport = () => {
    console.log('Downloading financial identity report...');
    // Mock download - will be replaced with real PDF generation
  };

  const copyProfileUrl = () => {
    navigator.clipboard.writeText(profileUrl);
    // Could add toast notification here
  };

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <CardTitle>{user?.name || 'User'}</CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{profileData.score}</div>
              <div className="text-xs text-muted-foreground">Identity Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{profileData.completeness}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{profileData.profileViews}</div>
              <div className="text-xs text-muted-foreground">Profile Views</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
          <CardDescription>Your connected and verified data sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {profileData.verifiedSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="font-medium">{source}</span>
                <Badge variant="default" className="bg-green-600">
                  Verified
                </Badge>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg opacity-60">
              <span className="font-medium">Bank Account</span>
              <Badge variant="secondary">
                Not Connected
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Achievement Badges</CardTitle>
          <CardDescription>Recognition for your financial behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profileData.badges.map((badge, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="px-3 py-1"
              >
                {badge.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Share Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Share Your Financial Identity</CardTitle>
          <CardDescription>
            Share your verified profile with lenders and financial institutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
              <div className="flex-1 text-sm font-mono">{profileUrl}</div>
              <Button variant="ghost" size="sm" onClick={copyProfileUrl}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Link
              </Button>
              <Button variant="outline">
                <QrCode className="w-4 h-4 mr-2" />
                QR Code
              </Button>
            </div>
            
            <Button onClick={handleDownloadReport} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Analytics</CardTitle>
          <CardDescription>See how your profile is performing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Profile Views</span>
              </div>
              <span className="font-semibold">{profileData.profileViews}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4 text-green-600" />
                <span className="text-sm">Lender Interests</span>
              </div>
              <span className="font-semibold">{profileData.lenderInterests}</span>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Last updated: {profileData.lastUpdated}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={logout} className="w-full">
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
