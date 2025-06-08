import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, DollarSign, TrendingUp, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BorrowerListing {
  id: string;
  basicDetails: {
    age: number;
    location: string;
    occupation: string;
    platform: string;
  };
  loanAmount: number;
  seekingRate: number;
  financialScore: number;
  riskCategory: "Low" | "Medium" | "High";
}

interface BorrowerMarketplaceProps {
  onSelectBorrower?: (borrower: any) => void;
}

// Mock API call for fetching borrower listings
const fetchBorrowerListings = async (): Promise<BorrowerListing[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      basicDetails: {
        age: 28,
        location: "Lagos, Nigeria",
        occupation: "Driver",
        platform: "Uber",
      },
      loanAmount: 50000,
      seekingRate: 8.5,
      financialScore: 75,
      riskCategory: "Low",
    },
    {
      id: "2",
      basicDetails: {
        age: 35,
        location: "Nairobi, Kenya",
        occupation: "Delivery Partner",
        platform: "Bolt",
      },
      loanAmount: 75000,
      seekingRate: 9.2,
      financialScore: 68,
      riskCategory: "Medium",
    },
    {
      id: "3",
      basicDetails: {
        age: 42,
        location: "Accra, Ghana",
        occupation: "Freelancer",
        platform: "Upwork",
      },
      loanAmount: 100000,
      seekingRate: 7.8,
      financialScore: 82,
      riskCategory: "Low",
    },
    {
      id: "4",
      basicDetails: {
        age: 31,
        location: "Cape Town, South Africa",
        occupation: "Ride Driver",
        platform: "Uber",
      },
      loanAmount: 60000,
      seekingRate: 10.1,
      financialScore: 62,
      riskCategory: "High",
    },
  ];
};

// Mock API call for expressing interest
const expressInterest = async (
  borrowerId: string
): Promise<{ success: boolean; message: string }> => {
  console.log(`Expressing interest in borrower: ${borrowerId}`);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Interest notification sent to borrower successfully",
  };
};

const BorrowerMarketplace: React.FC<BorrowerMarketplaceProps> = ({
  onSelectBorrower,
}) => {
  const [borrowers, setBorrowers] = useState<BorrowerListing[]>([]);
  const [filteredBorrowers, setFilteredBorrowers] = useState<BorrowerListing[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBorrower, setSelectedBorrower] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  React.useEffect(() => {
    const loadBorrowers = async () => {
      try {
        const data = await fetchBorrowerListings();
        setBorrowers(data);
        setFilteredBorrowers(data);
      } catch (error) {
        console.error("Error loading borrowers:", error);
        toast({
          title: "Error",
          description: "Failed to load borrower listings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadBorrowers();
  }, [toast]);

  React.useEffect(() => {
    const filtered = borrowers.filter(
      (borrower) =>
        borrower.basicDetails.location
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        borrower.basicDetails.occupation
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        borrower.basicDetails.platform
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredBorrowers(filtered);
  }, [searchTerm, borrowers]);

  const handleSelectBorrower = (borrower: BorrowerListing) => {
    // Convert borrower listing to the format expected by LoanOrigination
    const selectedBorrowerData = {
      id: borrower.id,
      name: `${borrower.basicDetails.occupation} from ${borrower.basicDetails.location}`,
      age: borrower.basicDetails.age,
      location: borrower.basicDetails.location,
      country:
        borrower.basicDetails.location.split(", ")[1] ||
        borrower.basicDetails.location,
      occupation: borrower.basicDetails.occupation,
      gigPlatform: borrower.basicDetails.platform,
      creditScore: borrower.financialScore,
      suggestedLimit: borrower.loanAmount,
      avgRating: 4.8,
      riskCategory: borrower.riskCategory,
      monthlyIncome: Math.round(borrower.loanAmount / 3.2), // Reverse calculate from suggested limit
      requestedAmount: borrower.loanAmount,
      seekingRate: borrower.seekingRate,
      // Add missing properties for FinancialPassport component
      did: `did:ethr:0x${Math.random().toString(16).substr(2, 40)}`,
      walletAge: `${Math.floor(Math.random() * 24) + 12} months`,
      txnCount: Math.floor(Math.random() * 1000) + 500,
    };

    if (onSelectBorrower) {
      onSelectBorrower(selectedBorrowerData);
    }
  };

  const handleExpressInterest = async (borrowerId: string) => {
    try {
      const result = await expressInterest(borrowerId);
      if (result.success) {
        toast({
          title: "Interest Expressed",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error expressing interest:", error);
      toast({
        title: "Error",
        description: "Failed to send interest notification",
        variant: "destructive",
      });
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Borrower Marketplace
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover borrowers seeking loans based on their financial passports
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search by location, occupation, or platform..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Borrower Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBorrowers.map((borrower) => (
          <Card
            key={borrower.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedBorrower === borrower.id ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() =>
              setSelectedBorrower(
                selectedBorrower === borrower.id ? null : borrower.id
              )
            }
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">
                  Anonymous Borrower
                </CardTitle>
                <Badge className={getRiskBadgeColor(borrower.riskCategory)}>
                  {borrower.riskCategory} Risk
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Basic Details */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Age:</span>
                  <span className="font-medium">
                    {borrower.basicDetails.age}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Location:
                  </span>
                  <span className="font-medium">
                    {borrower.basicDetails.location}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Occupation:
                  </span>
                  <span className="font-medium">
                    {borrower.basicDetails.occupation}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Platform:
                  </span>
                  <span className="font-medium">
                    {borrower.basicDetails.platform}
                  </span>
                </div>
              </div>

              {/* Loan Details */}
              <div className="border-t pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Loan Amount:
                  </span>
                  <span className="font-bold text-lg">
                    ₦{borrower.loanAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Seeking Rate:
                  </span>
                  <span className="font-bold text-green-600">
                    {borrower.seekingRate}%
                  </span>
                </div>
              </div>

              {/* Financial Score (shown when clicked) */}
              {selectedBorrower === borrower.id && (
                <div className="border-t pt-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      Financial Score:
                    </span>
                    <span className="font-bold text-xl text-blue-600">
                      {borrower.financialScore}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectBorrower(borrower);
                  }}
                  className="flex-1"
                  variant="default"
                >
                  Select for Loan
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpressInterest(borrower.id);
                  }}
                  variant="outline"
                >
                  Express Interest
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBorrowers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No borrowers found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default BorrowerMarketplace;
