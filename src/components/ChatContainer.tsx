
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import Message from './Message';
import LoadingIndicator from './LoadingIndicator';
import { useToast } from "@/hooks/use-toast";

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

interface ChatContainerProps {
  chatId: string | null;
  chats: Chat[];
  onUpdateChats: (chats: Chat[]) => void;
}

const ChatContainer = ({ chatId, chats, onUpdateChats }: ChatContainerProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Find the current chat or use empty messages if no chat is selected
  const currentChat = chats.find(chat => chat.id === chatId) || { 
    id: '',
    name: '',
    snippet: '',
    timestamp: new Date(),
    messages: [] 
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat.messages]);

  useEffect(() => {
    // Focus input when chat changes
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatId]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim() && !selectedFile) return;
    
    const userMessage = {
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
      file: selectedFile || undefined
    };
    
    // Create new chat if needed or update existing one
    let updatedChats: Chat[] = [...chats];
    let updatedChatId = chatId;
    
    if (!chatId) {
      // Create a new chat
      const newChatId = uuidv4();
      updatedChatId = newChatId;
      updatedChats.unshift({
        id: newChatId,
        name: inputValue.slice(0, 20) || "New Chat",
        snippet: inputValue || "Empty chat",
        timestamp: new Date(),
        messages: [userMessage]
      });
    } else {
      // Update existing chat
      updatedChats = updatedChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            snippet: inputValue || chat.snippet,
            timestamp: new Date(),
            messages: [...chat.messages, userMessage]
          };
        }
        return chat;
      });
    }
    
    // Update the chats
    onUpdateChats(updatedChats);
    
    setInputValue('');
    setSelectedFile(null);
    setIsLoading(true);
    
    try {
      // Create form data to send both message and file
      const formData = new FormData();
      formData.append('message', inputValue);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      
      const response = await fetch('https://parthiv9.app.n8n.cloud/webhook-test/ca3bfd71-ed86-4fb9-b2b0-59467a803b0a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: inputValue,
          fileName: selectedFile ? selectedFile.name : null 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      setTimeout(() => {
        setIsLoading(false);
        
        // Create AI response message
        const aiMessage = {
          content: data.response || "I'm sorry, I couldn't process your request.",
          isUser: false,
          timestamp: new Date()
        };
        
        // Update the chat with AI response
        const finalUpdatedChats = updatedChats.map(chat => {
          if (chat.id === updatedChatId) {
            return {
              ...chat,
              messages: [...chat.messages, aiMessage]
            };
          }
          return chat;
        });
        
        onUpdateChats(finalUpdatedChats);
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      toast({
        title: "File selected",
        description: `${file.name} is ready to upload.`,
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="glass-panel rounded-2xl flex flex-col w-full max-w-3xl h-[80vh] mx-auto">
      <div className="border-b border-white/10 p-4 text-center">
        <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
          {chatId ? currentChat.name || "AI Assistant" : "New Chat"}
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentChat.messages.length === 0 ? (
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
          currentChat.messages.map((msg, index) => (
            <Message
              key={index}
              content={msg.content}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
              file={msg.file}
            />
          ))
        )}
        
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-white/10">
        {selectedFile && (
          <div className="flex items-center mb-2 p-2 bg-secondary/50 rounded-md">
            <div className="flex-1 truncate text-sm">
              <span className="text-accent font-medium mr-1">File:</span>
              {selectedFile.name}
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-6 w-6 rounded-full hover:bg-accent/20"
              onClick={removeSelectedFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-secondary border border-white/10 focus:ring-accent focus:border-accent pl-4 pr-10"
              disabled={isLoading}
              autoFocus
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={triggerFileInput}
              disabled={isLoading}
            >
              <Paperclip className="h-4 w-4 text-muted-foreground" />
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileSelect}
            />
          </div>
          <Button 
            type="submit"
            disabled={isLoading || (!inputValue.trim() && !selectedFile)}
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
