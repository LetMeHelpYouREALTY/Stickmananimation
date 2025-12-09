import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import PerformanceDemo from "./pages/PerformanceDemo";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { PerformanceDashboard } from "./components/PerformanceDashboard";
import LeadCaptureCta from "./components/ui/lead-capture-cta";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/performance" component={PerformanceDemo} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <LeadCaptureCta />
      <Toaster />
      <PerformanceDashboard />
    </QueryClientProvider>
  );
}

export default App;
