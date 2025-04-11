
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Navigation from '@/components/Navigation';

interface SideToggleProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

const SideToggle: React.FC<SideToggleProps> = ({ children, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState<any[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // Load chats from localStorage on initial render
  React.useEffect(() => {
    const savedChats = localStorage.getItem('ai-assistant-chats');
    if (savedChats) {
      try {
        // Parse the saved chats and convert string timestamps back to Date objects
        const parsedChats = JSON.parse(savedChats, (key, value) => {
          if (key === 'timestamp') return new Date(value);
          return value;
        });
        setChats(parsedChats);
        
        // Set current chat to the most recent one if it exists
        if (parsedChats.length > 0) {
          setCurrentChatId(parsedChats[0].id);
        }
      } catch (e) {
        console.error('Error parsing saved chats:', e);
      }
    }
  }, []);

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
    if (onClose) {
      onClose();
    }
  };

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
          <div className="min-w-72 overflow-auto p-0">
            <Navigation
              chats={chats}
              currentChatId={currentChatId}
              onSelectChat={handleSelectChat}
              onNewChat={handleNewChat}
            />
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
          <SheetContent side="left" className="w-[250px] sm:w-[300px] p-0">
            <Navigation
              chats={chats}
              currentChatId={currentChatId}
              onSelectChat={handleSelectChat}
              onNewChat={handleNewChat}
            />
            {children && <div className="p-4">{children}</div>}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default SideToggle;
