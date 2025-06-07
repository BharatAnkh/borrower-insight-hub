
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import ConnectData from "./pages/ConnectData";
import Insights from "./pages/Insights";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import MobileLayout from "./components/MobileLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MobileLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="connect" element={<ConnectData />} />
              <Route path="insights" element={<Insights />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
