
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import BorrowerMarketplace from '../components/BorrowerMarketplace';
import LoanOrigination from '../components/LoanOrigination';
import LoanManagement from '../components/LoanManagement';
import AuthScreen from '../components/AuthScreen';

const LenderPage = () => {
  const [activeSection, setActiveSection] = useState('marketplace');
  const [selectedBorrower, setSelectedBorrower] = useState(null);
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

  const handleSelectBorrower = (borrower: any) => {
    setSelectedBorrower(borrower);
    setActiveSection('origination');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'marketplace':
        return <BorrowerMarketplace onSelectBorrower={handleSelectBorrower} />;
      case 'origination':
        return <LoanOrigination selectedBorrower={selectedBorrower} />;
      case 'management':
        return <LoanManagement />;
      default:
        return <BorrowerMarketplace onSelectBorrower={handleSelectBorrower} />;
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
