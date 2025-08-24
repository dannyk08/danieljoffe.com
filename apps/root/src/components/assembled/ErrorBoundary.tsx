'use client';

import React from 'react';
import { Button } from '@/components/units/Button';
import { useTransitionRouter } from 'next-transition-router';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

const ErrorComponent = ({
  error,
  resetError,
}: {
  error: Error;
  resetError: () => void;
}) => {
  const router = useTransitionRouter();

  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-100'>
      <div className='max-w-md mx-auto text-center p-6'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-neutral-900 mb-2'>
            Something went wrong
          </h1>
          <p className='text-neutral-600'>
            We&apos;re sorry, but something unexpected happened. Please try
            refreshing the page.
          </p>
        </div>

        <div className='space-y-4'>
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
          <details className='mt-6 text-left'>
            <summary className='cursor-pointer text-sm text-neutral-500 hover:text-neutral-700'>
              Error Details (Development)
            </summary>
            <pre className='mt-2 p-4 bg-neutral-200 rounded text-xs overflow-auto'>
              {error.stack}
            </pre>
          </details>
        )}
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
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: sendErrorToService(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error as Error}
            resetError={this.resetError}
          />
        );
      }

      return (
        <ErrorComponent
          error={this.state.error as Error}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
