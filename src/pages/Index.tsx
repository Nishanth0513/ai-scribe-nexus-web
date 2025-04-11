
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatContainer from '@/components/ChatContainer';
import Navigation from '@/components/Navigation';

interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
  file?: File;
}

interface Chat {
  id: string;
  name: string;
  snippet: string;
  timestamp: Date;
  messages: ChatMessage[];
}

const Index = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // Load chats from localStorage on initial render
  useEffect(() => {
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

  // Save chats to localStorage whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('ai-assistant-chats', JSON.stringify(chats));
    }
  }, [chats]);

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
  };

  const handleUpdateChats = (updatedChats: Chat[]) => {
    setChats(updatedChats);
    
    // If this was a new chat, update currentChatId to the new chat's ID
    if (!currentChatId && updatedChats.length > 0) {
      setCurrentChatId(updatedChats[0].id);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-background to-secondary/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.15),rgba(99,102,241,0)_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(13,148,136,0.1),rgba(13,148,136,0)_60%)] pointer-events-none"></div>
      
      <Navigation 
        chats={chats} 
        currentChatId={currentChatId} 
        onSelectChat={handleSelectChat} 
        onNewChat={handleNewChat} 
      />
      
      <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 md:pl-4">
        <main className="w-full max-w-4xl mx-auto mt-0 md:mt-0">
          {/* Add padding for mobile navigation */}
          <div className="md:hidden h-16"></div>
          
          <ChatContainer 
            chatId={currentChatId} 
            chats={chats} 
            onUpdateChats={handleUpdateChats} 
          />
        </main>
        
        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <p>© 2025 AI Assistant • Powered by Advanced AI Technology</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
