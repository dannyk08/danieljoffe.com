'use client';

import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'skeleton';
  className?: string;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  className = '',
  text,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const renderSpinner = () => (
    <div
      className={`animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900 ${sizeClasses[size]} ${className}`}
    />
  );

  const renderDots = () => (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`bg-neutral-900 rounded-full animate-pulse ${
            size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3'
          }`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );

  const renderSkeleton = () => (
    <div className={`animate-pulse bg-neutral-300 rounded ${className}`}>
      <div className={`${sizeClasses[size]} bg-neutral-300`} />
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'skeleton':
        return renderSkeleton();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {renderContent()}
      {text && (
        <p className="text-sm text-neutral-600 animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default Loading;
