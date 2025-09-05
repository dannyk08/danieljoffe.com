'use client';

import React from 'react';
import Button from '@/components/units/Button';
import { useTransitionRouter } from 'next-transition-router';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
  errorInfo?: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error?: Error | null;
    resetError: () => void;
  }>;
}

const ErrorComponent = ({
  resetError,
  error,
}: {
  resetError: () => void;
  error: Error | null;
}) => {
  const router = useTransitionRouter();

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50'>
      <div className='max-w-md w-full mx-auto p-6'>
        <div className='bg-white rounded-lg shadow-soft p-6 text-center'>
          <div className='w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-red-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
          </div>
          <h2 className='text-xl font-semibold text-neutral-900 mb-2'>
            Something went wrong
          </h2>
          <p className='text-neutral-600 mb-6'>
            We&apos;re sorry, but something unexpected happened. Please try
            refreshing the page.
          </p>
          <div className='space-y-3'>
            <Button
              onClick={resetError}
              variant='primary'
              size='md'
              className='w-full'
            >
              Try Again
            </Button>
            <Button
              onClick={router.refresh}
              variant='secondary'
              size='md'
              className='w-full'
            >
              Refresh Page
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && error && (
            <details className='mt-4 text-left'>
              <summary className='cursor-pointer text-sm text-neutral-500 hover:text-neutral-700'>
                Error Details (Development)
              </summary>
              <pre className='mt-2 text-xs bg-neutral-100 p-3 rounded overflow-auto'>
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Send error to analytics in production
    if (
      process.env.NODE_ENV === 'production' &&
      typeof window !== 'undefined' &&
      window.gtag
    ) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      });
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error || null}
            resetError={this.resetError}
          />
        );
      }

      return (
        <ErrorComponent
          error={this.state.error || null}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
