
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

  const [showToggle, setShowToggle] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {showToggle && (
          <SideToggle>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Side Panel</h2>
              <p className="text-muted-foreground">This is a toggleable side panel that appears when you click the toggle button.</p>
              <div className="py-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowToggle(false)}
                >
                  Close Panel
                </Button>
              </div>
            </div>
          </SideToggle>
        )}
        
        <div className="fixed top-4 right-4 z-50">
          <Button 
            onClick={() => setShowToggle(!showToggle)}
            variant="secondary"
            className="shadow-md"
          >
            Toggle Side Panel
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
