
import React from 'react';
import ChatContainer from '@/components/ChatContainer';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-background to-secondary/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.15),rgba(99,102,241,0)_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(13,148,136,0.1),rgba(13,148,136,0)_60%)] pointer-events-none"></div>
      
      <header className="mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent">
          AI Assistant
        </h1>
        <p className="text-muted-foreground max-w-md text-sm sm:text-base">
          Your intelligent companion for document search and retrieval
        </p>
      </header>
      
      <main className="w-full max-w-4xl">
        <ChatContainer />
      </main>
      
      <footer className="mt-8 text-center text-xs text-muted-foreground">
        <p>© 2025 AI Assistant • Powered by Advanced AI Technology</p>
      </footer>
    </div>
  );
};

export default Index;
