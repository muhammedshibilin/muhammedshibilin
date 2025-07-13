'use client';

import { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({ 
  content, 
  children, 
  position = 'top' 
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 transform -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 transform -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 transform -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 transform -translate-y-1/2',
  };

  const arrowClasses = {
    top: 'top-full -translate-x-1/2 left-1/2 -mt-1',
    bottom: 'bottom-full -translate-x-1/2 left-1/2 -mb-1',
    left: 'left-full -translate-y-1/2 top-1/2 -ml-1',
    right: 'right-full -translate-y-1/2 top-1/2 -mr-1',
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          className={`absolute ${positionClasses[position]} px-3 py-2 text-sm text-white bg-gray-900 rounded-lg whitespace-nowrap z-50 shadow-lg backdrop-blur-sm`}
        >
          {content}
          <div 
            className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${arrowClasses[position]}`}
          />
        </div>
      )}
    </div>
  );
};