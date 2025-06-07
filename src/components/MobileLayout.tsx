
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Wallet, Link, TrendingUp, Users, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthScreen from './AuthScreen';

const MobileLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();

  const navItems = [
    { id: '', label: 'Dashboard', icon: Home },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'connect', label: 'Connect', icon: Link },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'marketplace', label: 'Lenders', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">FinancialPassport</h1>
          <p className="text-sm text-muted-foreground">Build Your Financial Identity</p>
        </div>
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-semibold">
            {user?.name?.charAt(0) || 'U'}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="grid grid-cols-6 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === `/${item.id}`;
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(`/${item.id}`)}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;
