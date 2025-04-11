
import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 text-accent animate-pulse-slow my-4">
      <div className="h-2 w-2 rounded-full bg-accent"></div>
      <div className="h-2 w-2 rounded-full bg-accent animation-delay-150"></div>
      <div className="h-2 w-2 rounded-full bg-accent animation-delay-300"></div>
    </div>
  );
};

export default LoadingIndicator;
