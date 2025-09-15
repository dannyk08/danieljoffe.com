'use client';

import { useEffect } from 'react';
import { setGradientTheme } from './blob.utils';

export default function BlobCSS() {
  useEffect(() => {
    // Randomly set gradient theme on mount and periodically
    const interval = setInterval(setGradientTheme, 8000);
    setGradientTheme();

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className='relative w-full h-full overflow-hidden bg-neutral-900'
      aria-hidden='true'
      role='img'
      aria-label='Decorative background animation'
    >
      {/* Main blob shape */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='blob-shape animate-float will-change-transform gpu-accelerated' />
      </div>

      {/* Floating particles */}
      <div className='absolute inset-0'>
        <div
          className='particle particle-1 animate-float'
          style={{ animationDelay: '0.25s' }}
        />
        <div
          className='particle particle-2 animate-float'
          style={{ animationDelay: '0.5s' }}
        />
        <div
          className='particle particle-3 animate-float'
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className='particle particle-4 animate-float'
          style={{ animationDelay: '2.5s' }}
        />
        <div
          className='particle particle-5 animate-float'
          style={{ animationDelay: '3.25s' }}
        />
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 5% 25%;
          }
          50% {
            background-position: 100% 90%;
          }
        }

        @keyframes morph-extreme {
          0%,
          100% {
            border-radius: 37% 63% 22% 78% / 55% 45% 80% 20%;
            transform: rotate(13deg) scale(1.2, 0.9);
          }
          10% {
            border-radius: 81% 19% 67% 33% / 24% 76% 12% 88%;
            transform: rotate(47deg) scale(0.7, 1.3);
          }
          20% {
            border-radius: 59% 41% 91% 9% / 38% 62% 53% 47%;
            transform: rotate(95deg) scale(1.5, 0.8);
          }
          30% {
            border-radius: 12% 88% 44% 56% / 77% 23% 68% 32%;
            transform: rotate(61deg) scale(0.6, 1.7);
          }
          40% {
            border-radius: 73% 27% 58% 42% / 19% 81% 35% 65%;
            transform: rotate(108deg) scale(1.1, 1.4);
          }
          50% {
            border-radius: 28% 72% 13% 87% / 92% 8% 57% 43%;
            transform: rotate(152deg) scale(0.8, 1.2);
          }
          60% {
            border-radius: 64% 36% 79% 21% / 11% 89% 25% 75%;
            transform: rotate(183deg) scale(1.6, 0.7);
          }
          70% {
            border-radius: 53% 47% 35% 65% / 62% 38% 18% 82%;
            transform: rotate(201deg) scale(0.9, 1.5);
          }
          80% {
            border-radius: 85% 15% 61% 39% / 29% 71% 49% 51%;
            transform: rotate(237deg) scale(1.3, 1.1);
          }
          90% {
            border-radius: 41% 59% 27% 73% / 84% 16% 63% 37%;
            transform: rotate(279deg) scale(0.7, 1.8);
          }
        }

        .blob-shape {
          width: 750px;
          height: 750px;
          background: linear-gradient(
            45deg,
            var(--stop-color-one, transparent),
            var(--stop-color-two, transparent),
            var(--stop-color-three, transparent),
            var(--stop-color-four, transparent),
            var(--stop-color-five, transparent),
            var(--stop-color-six, transparent),
            var(--stop-color-seven, transparent),
            var(--stop-color-eight, transparent)
          );
          /* background-size: 400% 400%; */
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          /* More extreme morphing via border-radius keyframes */
          animation: gradientShift 60s ease-in-out infinite,
            morph-extreme 180s ease-in-out infinite;
        }

        /* Smooth gradient transitions for the blob and particles */
        .blob-shape,
        .particle,
        .particle-1,
        .particle-2,
        .particle-3,
        .particle-4,
        .particle-5 {
          transition: rotate, scale, background, --stop-color-one,
            --stop-color-two, --stop-color-three, --stop-color-four,
            --stop-color-five, --stop-color-six, --stop-color-seven,
            --stop-color-eight;
          transition-duration: 7.5s;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: var(--stop-color-one);
          opacity: 0.6;
          filter: blur(2px);
        }

        .particle-1 {
          width: 1rem;
          height: 1rem;
          top: 12%;
          left: 37%;
          background: var(--stop-color-two);
        }

        .particle-2 {
          width: 1.5rem;
          height: 1.5rem;
          top: 72%;
          right: 22%;
          background: var(--stop-color-three);
        }

        .particle-3 {
          width: 0.5rem;
          height: 0.5rem;
          bottom: 18%;
          left: 55%;
          background: var(--stop-color-four);
        }

        .particle-4 {
          width: 1rem;
          height: 1rem;
          top: 33%;
          right: 41%;
          background: var(--stop-color-five);
        }

        .particle-5 {
          width: 2rem;
          height: 2rem;
          bottom: 11%;
          right: 27%;
          background: var(--stop-color-six);
        }

        @media (prefers-reduced-motion: reduce) {
          .blob-shape,
          .particle {
            animation: none;
          }

          .blob-shape {
            border-radius: 50%;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
