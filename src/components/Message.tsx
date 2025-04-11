
import React from 'react';
import { cn } from '@/lib/utils';
import { FileIcon } from 'lucide-react';

interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp?: Date;
  file?: File;
}

const Message = ({ content, isUser, timestamp, file }: MessageProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div 
      className={cn(
        "flex w-full my-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
          isUser 
            ? "bg-primary/20 text-foreground border border-primary/30" 
            : "bg-secondary text-foreground/90 border border-accent/20"
        )}
      >
        {!isUser && <div className="font-medium text-accent mb-1">Here is the information</div>}
        <div className="whitespace-pre-wrap">{content}</div>
        
        {file && (
          <div className="mt-2 p-2 bg-secondary/50 rounded-lg flex items-center">
            <div className="bg-accent/20 p-2 rounded-lg mr-2">
              <FileIcon className="h-5 w-5 text-accent" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white/90 truncate">{file.name}</p>
              <p className="text-xs text-white/70">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        )}
        
        {timestamp && (
          <div className="text-xs opacity-70 text-right mt-1">
            {formatTime(timestamp)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
