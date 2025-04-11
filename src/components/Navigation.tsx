
import React from 'react';
import { History, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface Chat {
  id: string;
  name: string;
  snippet: string;
  timestamp: Date;
  messages: any[];
}

interface NavigationProps {
  chats: Chat[];
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

const Navigation = ({ chats, currentChatId, onSelectChat, onNewChat }: NavigationProps) => {
  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between p-3">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[80vh]">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Chat History</h3>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <X className="h-5 w-5" />
                    </Button>
                  </DrawerClose>
                </div>
                <div className="space-y-2">
                  <Button 
                    onClick={onNewChat} 
                    className="w-full justify-start bg-accent/20 hover:bg-accent/30"
                  >
                    <span className="mr-2">+</span> New Chat
                  </Button>
                  {chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => {
                        onSelectChat(chat.id);
                      }}
                      className={cn(
                        "w-full text-left p-3 rounded-lg flex items-center space-x-3 hover:bg-secondary/70",
                        chat.id === currentChatId ? "bg-secondary" : "bg-secondary/40"
                      )}
                    >
                      <History className="h-4 w-4 text-accent/70" />
                      <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate">{chat.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{chat.snippet}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <h1 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent">
            AI Assistant
          </h1>
          <Button variant="ghost" size="icon" className="opacity-0">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col w-72 h-screen border-r border-white/10 bg-secondary/30 backdrop-blur-md">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent">
            AI Assistant
          </h1>
          <p className="text-sm text-muted-foreground">Your document search companion</p>
        </div>
        <div className="p-3">
          <Button 
            onClick={onNewChat} 
            className="w-full justify-start mb-3 bg-accent/20 hover:bg-accent/30"
          >
            <span className="mr-2">+</span> New Chat
          </Button>
          <div className="space-y-2">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg flex items-center space-x-3 hover:bg-secondary/70 transition-colors",
                  chat.id === currentChatId ? "bg-secondary" : "bg-secondary/40"
                )}
              >
                <History className="h-4 w-4 text-accent/70" />
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{chat.name || "Untitled Chat"}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {new Date(chat.timestamp).toLocaleDateString()} · {chat.snippet}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
