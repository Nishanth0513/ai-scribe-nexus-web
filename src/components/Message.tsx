
import React from 'react';
import { cn } from '@/lib/utils';

interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp?: Date;
}

const Message = ({ content, isUser, timestamp }: MessageProps) => {
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
