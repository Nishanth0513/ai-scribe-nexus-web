
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SideToggleProps {
  children: React.ReactNode;
}

const SideToggle: React.FC<SideToggleProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-center">
      {/* Desktop Side Toggle */}
      <div className="hidden md:block">
        <div
          className={cn(
            "h-[80vh] bg-background/90 backdrop-blur-md border border-border/40 rounded-r-lg shadow-lg transition-all duration-300 overflow-hidden flex",
            isOpen ? "w-72" : "w-0"
          )}
        >
          <div className="min-w-72 overflow-auto p-4">
            {children}
          </div>
        </div>
        
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="secondary"
          size="icon"
          className="absolute top-1/2 -translate-y-1/2 left-[calc(100%)] shadow-md rounded-full border border-border/40"
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Sheet */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="shadow-md rounded-r-lg border border-border/40"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <div className="p-4">
              {children}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default SideToggle;
