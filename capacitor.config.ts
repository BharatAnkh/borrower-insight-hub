
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.e523e043110b4a1382de0d357501360c',
  appName: 'FinancialPassport',
  webDir: 'dist',
  server: {
    url: 'https://e523e043-110b-4a13-82de-0d357501360c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
