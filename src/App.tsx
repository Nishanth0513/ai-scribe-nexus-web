
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SideToggle from "./components/SideToggle";
import { Button } from "./components/ui/button";

const App = () => {
  // Create a client instance that persists across re-renders
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60000, // 1 minute
        retry: 1
      }
    }
  }));

  const [showToggle, setShowToggle] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {showToggle && (
          <SideToggle onClose={() => setShowToggle(false)}>
            {/* The SideToggle component will now automatically include the Navigation component */}
          </SideToggle>
        )}
        
        <div className="fixed top-4 right-4 z-50">
          <Button 
            onClick={() => setShowToggle(!showToggle)}
            variant="secondary"
            className="shadow-md"
          >
            Toggle Chat History
          </Button>
        </div>
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
