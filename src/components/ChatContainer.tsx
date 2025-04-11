
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from 'lucide-react';
import Message from './Message';
import LoadingIndicator from './LoadingIndicator';
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatContainer = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage = {
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const response = await fetch('https://parthiv9.app.n8n.cloud/webhook-test/ca3bfd71-ed86-4fb9-b2b0-59467a803b0a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      setTimeout(() => {
        setIsLoading(false);
        setMessages(prev => [
          ...prev,
          {
            content: data.response || "I'm sorry, I couldn't process your request.",
            isUser: false,
            timestamp: new Date()
          }
        ]);
      }, 1000); // Adding a delay to show the loading indicator
      
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-panel rounded-2xl flex flex-col w-full max-w-3xl h-[80vh] mx-auto">
      <div className="border-b border-white/10 p-4 text-center">
        <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
          AI Assistant
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-6">
            <div className="w-16 h-16 mb-4 rounded-full bg-accent/20 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-accent animate-pulse"></div>
            </div>
            <h3 className="text-lg font-medium mb-1">Welcome to AI Assistant</h3>
            <p className="max-w-md text-sm">
              I'm here to help you find and retrieve information. Ask me anything!
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <Message
              key={index}
              content={msg.content}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
          ))
        )}
        
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            ref={inputRef}
            placeholder="Type your message here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-secondary border border-white/10 focus:ring-accent focus:border-accent"
            disabled={isLoading}
            autoFocus
          />
          <Button 
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-primary hover:bg-primary/80 transition-colors duration-200"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
