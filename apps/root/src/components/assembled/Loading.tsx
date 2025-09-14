'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className='flex items-center justify-center min-h-[200px] w-full'>
      <div className='flex flex-col items-center gap-4 animate-fade-in'>
        <div className='relative'>
          <div className='w-12 h-12 border-4 border-neutral-200 border-t-blue-500 rounded-full animate-spin'></div>
          <div
            className='absolute inset-0 w-12 h-12 border-4 border-transparent border-t-rose-500 rounded-full animate-spin'
            style={{ animationDelay: '-0.5s' }}
          ></div>
        </div>
        <div className='flex gap-1'>
          <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce-subtle'></div>
          <div
            className='w-2 h-2 bg-rose-500 rounded-full animate-bounce-subtle'
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className='w-2 h-2 bg-blue-500 rounded-full animate-bounce-subtle'
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>
        <p className='text-sm animate-pulse'>Loading...</p>
      </div>
    </div>
  );
}
