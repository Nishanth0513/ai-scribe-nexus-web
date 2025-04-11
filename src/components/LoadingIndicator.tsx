
import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex items-center space-x-1.5 text-accent animate-pulse-slow my-4">
      <div className="h-2.5 w-2.5 rounded-full bg-accent"></div>
      <div className="h-2.5 w-2.5 rounded-full bg-accent animation-delay-150"></div>
      <div className="h-2.5 w-2.5 rounded-full bg-accent animation-delay-300"></div>
      <span className="ml-2 text-sm text-muted-foreground">Processing...</span>
    </div>
  );
};

export default LoadingIndicator;
