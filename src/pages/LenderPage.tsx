
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import BorrowerMarketplace from '../components/BorrowerMarketplace';
import AuthScreen from '../components/AuthScreen';

const LenderPage = () => {
  const [activeSection, setActiveSection] = useState('marketplace');
  const { user, isAuthenticated, loading } = useAuth();

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

  const renderContent = () => {
    switch (activeSection) {
      case 'marketplace':
        return <BorrowerMarketplace />;
      case 'origination':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Loan Origination</h2>
            <p>Loan origination functionality will be implemented here.</p>
          </div>
        );
      case 'management':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Loan Management</h2>
            <p>Loan management functionality will be implemented here.</p>
          </div>
        );
      default:
        return <BorrowerMarketplace />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col">
        <TopNav user={user} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default LenderPage;
