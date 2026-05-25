'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LeadCaptureCta from '@/components/ui/lead-capture-cta';
import { PerformanceDashboard } from '@/components/PerformanceDashboard';
import { initWebVitals } from '@/services/webVitals';
import { useEffect, type ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    initWebVitals();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <LeadCaptureCta />
        <Toaster />
        <PerformanceDashboard />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
