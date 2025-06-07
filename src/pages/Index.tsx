
import React from 'react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import BorrowerMarketplace from '../components/BorrowerMarketplace';
import LoanOrigination from '../components/LoanOrigination';
import LoanManagement from '../components/LoanManagement';
import DashboardPassports from '../components/DashboardPassports';
import { ThemeProvider } from '../contexts/ThemeContext';

const Index = () => {
  const [activeSection, setActiveSection] = useState('marketplace');
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const { user, isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">LendFlow</h1>
            <p className="text-gray-600 dark:text-gray-300">Secure Lender Dashboard</p>
          </div>
          <button
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Sign in with Auth0
          </button>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
        />
        <div className="flex-1 flex flex-col">
          <TopNav user={user} />
          <main className="flex-1 p-6 overflow-auto">
            {activeSection === 'marketplace' && (
              <BorrowerMarketplace />
            )}
            {activeSection === 'dashboard' && (
              <DashboardPassports onBorrowerSelect={(borrower) => {
                setSelectedBorrower(borrower);
                setActiveSection('origination');
              }} />
            )}
            {activeSection === 'origination' && (
              <LoanOrigination selectedBorrower={selectedBorrower} />
            )}
            {activeSection === 'management' && (
              <LoanManagement />
            )}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
