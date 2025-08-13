'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';
import CustomEase from 'gsap/CustomEase';
import CustomWiggle from 'gsap/CustomWiggle';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import './Blob.scss';
import { useRef } from 'react';
import {
  svgWidth,
  svgHeight,
  polygonSides,
  wrappedYCoordinates,
  wrappedXCoordinates,
  wrappedGradientThemes,
  gradientThemes,
} from './utils';

gsap.registerPlugin(
  MorphSVGPlugin,
  CustomEase,
  CustomWiggle,
  useGSAP,
  MotionPathPlugin
);
export default function Blob() {
  const container = useRef<SVGSVGElement>(null);
  const blob = useRef<SVGPolygonElement>(null);
  const mainTimeline = gsap.timeline();
  const orbitsTl = gsap.timeline();
  useGSAP(
    () => {
      function setGradientTheme() {
        const html = document.querySelector('html');
        html?.setAttribute(
          'data-svg-gradient',
          wrappedGradientThemes(gsap.utils.random(0, gradientThemes.length))
        );
        gsap.delayedCall(gsap.utils.random(7.5, 10), setGradientTheme);
      }

      function setOrbits() {
        const orbits = [
          {
            to: '#dwarf',
            path: '#orbit1',
            duration: 20,
          },
          {
            to: '#dwarf3',
            path: '#orbit1b',
            duration: 20,
          },
          {
            to: '#midSize',
            path: '#orbit2',
            duration: 12.5,
          },
          {
            to: '#giant',
            path: '#orbit2b',
            duration: 12.5,
          },
          {
            to: '#midSize2',
            path: '#orbit3',
            duration: 10,
          },
          {
            to: '#midSize3',
            path: '#orbit3b',
            duration: 10,
          },
          {
            to: '#small2',
            path: '#orbit4',
            duration: 15,
          },
          {
            to: '#dwarf2',
            path: '#orbit5',
            duration: 12.5,
          },
          {
            to: '#small',
            path: '#orbit5b',
            duration: 12.5,
          },
        ];

        orbits.forEach((orbit, i) => {
          const path = MotionPathPlugin.rawPathToString(
            MotionPathPlugin.getRawPath(orbit.path)
          );

          orbitsTl.to(
            orbit.to,
            {
              repeatRefresh: true,
              duration: orbit.duration,
              delay: gsap.utils.random(0.25 / (i + 0.5), 5.5 / (i + 0.5)),
              ease: 'none',
              repeat: -1,
              motionPath: {
                path: path,
                align: orbit.path,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                fromCurrent: true,
                relative: true,
              },
            },
            gsap.utils.random(0.25, 2.25)
          );
        });

        orbitsTl.to(
          '#orbits',
          {
            opacity: 0.5,
            duration: 2,
            ease: 'ease.inOut',
            delay: 2.5,
          },
          2
        );
        orbitsTl.to(
          '#planets',
          {
            opacity: 1,
            duration: 2,
            ease: 'ease.inOut',
            delay: 2.5,
          },
          2
        );
        orbitsTl.timeScale(0.5);
      }

      function createPolygonPoints() {
        const polygonPoints = Array.from(Array(polygonSides)).map(() =>
          blob.current?.points.appendItem(
            container.current?.createSVGPoint() as DOMPoint
          )
        );

        gsap.set(polygonPoints, {
          x: wrappedXCoordinates,
          y: wrappedYCoordinates,
        });

        mainTimeline
          .fromTo(
            blob.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 2,
              ease: 'ease.inOut',
            }
          )
          .to(blob.current, {
            scale: () => gsap.utils.random(0.97, 0.99),
            transformOrigin: 'center',
            rotation: () => 'random([-=60,-=30,+=30,+=60])',
            duration: () => gsap.utils.random(9, 12),
            ease: 'random([elastic.out, circ.out, back.out])',
            repeatRefresh: true,
            repeat: -1,
          })
          .to(polygonPoints, {
            x: 'random([+=1.5, +=2.5])',
            y: 'random([+=1.5, +=2.5])',
            duration: () => gsap.utils.random(1.5, 3),
            stagger: {
              each: 4 / polygonPoints.length,
              grid: [1, polygonPoints.length],
              from: 'center',
            },
            ease: CustomWiggle.create('custom', {
              type: 'ease.inOut',
              wiggles: 4,
            }),
            repeat: -1,
          });
        mainTimeline.timeScale(0.5);
      }

      gsap.delayedCall(0, createPolygonPoints);
      gsap.delayedCall(0, setOrbits);
      gsap.delayedCall(7.5, setGradientTheme);
    },
    { scope: container, dependencies: [blob, container] }
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      height={svgHeight}
      width={svgWidth}
      className="md:w-full h-full"
      ref={container}
      overflow="hidden"
    >
      <defs>
        <linearGradient
          id="rainbow"
          x1="0"
          y1="0"
          x2={svgWidth}
          y2="0"
          gradientUnits="userSpaceOnUse"
          spreadMethod="reflect"
        >
          <stop
            className="transition-[stop-color] duration-[2.5s] ease-in-out transition-[offset]"
            offset="0"
            stopColor="var(--stop-color-one)"
          />
          <stop
            className="transition-[stop-color] duration-[2.5s] ease-in-out transition-[offset]"
            offset="0.14285714285714285"
            stopColor="var(--stop-color-two)"
          />
          <stop
            className="transition-[stop-color] duration-[2.5s] ease-in-out transition-[offset]"
            offset="0.2857142857142857"
            stopColor="var(--stop-color-three)"
          />
          <stop
            className="transition-[stop-color] duration-[2.5s] ease-in-out transition-[offset]"
            offset="0.42857142857142855"
            stopColor="var(--stop-color-four)"
          />
          <stop
            className="transition-[stop-color] duration-[2.5s] ease-in-out transition-[offset]"
            offset="0.5714285714285714"
            stopColor="var(--stop-color-five)"
          />
          <stop
            className="transition-[stop-color] duration-[2.5s] ease-in-out transition-[offset]"
            offset="0.7142857142857143"
            stopColor="var(--stop-color-six)"
          />
          <stop
            className="transition-[stop-color] duration-[2.5s] ease-in-out transition-[offset]"
            offset="0.8571428571428571"
            stopColor="var(--stop-color-seven)"
          />
          <stop
            className="transition-[stop-color] duration-[2.5s] ease-in-out transition-[offset]"
            offset="1"
            stopColor="var(--stop-color-eight)"
          />
        </linearGradient>

        <filter id="shadow">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="0.075"
            edgeMode="wrap"
          ></feGaussianBlur>
          <feDropShadow
            dx="3"
            dy="3"
            stdDeviation="5"
            floodColor="var(--stop-color-eight)"
            floodOpacity=".5"
          ></feDropShadow>
          <feDropShadow
            dx="-3"
            dy="-3"
            stdDeviation="5"
            floodColor="var(--stop-color-one)"
            floodOpacity=".5"
          ></feDropShadow>
        </filter>

        <mask id="orbitClip">
          <rect height={svgHeight} width={svgWidth} fill="white" x="0" y="0" />
          <path
            d="M602.366 276C597.274 256.022 600.272 265.598 592.063 246.786C583.854 227.974 572.02 210.963 557.237 196.724C542.454 182.485 525.011 171.298 505.904 163.801C486.798 156.303 466.401 152.642 445.88 153.028C425.358 153.413 405.114 157.836 386.302 166.045C367.49 174.254 350.479 186.088 336.24 200.871C322.001 215.654 310.814 233.097 303.317 252.204C295.819 271.311 304.659 247.013 298 265.815L448.42 260.723L539.691 268.166L602.366 276Z"
            fill="black"
          />
        </mask>
      </defs>
      <polygon
        strokeWidth="0"
        strokeLinejoin="round"
        stroke="black"
        fill="url(#rainbow)"
        ref={blob}
        points=""
      />
      <g id="orbits" mask="url(#orbitClip)" opacity="0">
        <path
          id="orbit1"
          d="M1109.33 77.5287C1103.65 24.464 854.893 -37.8596 373.491 122.074C-107.911 282.007 -264.186 480.552 -241.153 525.357C-218.119 570.162 -1.82135 648.221 497.056 480.311C995.933 312.401 1115.01 130.593 1109.33 77.5287Z"
          fill="none"
          className="transition-[stroke] duration-[2.5s]"
          stroke="var(--stop-color-one)"
        />
        <path
          id="orbit1b"
          d="M1109.33 77.5287C1103.65 24.464 854.893 -37.8596 373.491 122.074C-107.911 282.007 -264.186 480.552 -241.153 525.357C-218.119 570.162 -1.82135 648.221 497.056 480.311C995.933 312.401 1115.01 130.593 1109.33 77.5287Z"
          fill="none"
          className="transition-[stroke] duration-[2.5s]"
          stroke="var(--stop-color-two)"
        />
        <path
          id="orbit2"
          d="M1087.18 583.853C1118.22 540.446 973.906 328.464 508.037 127.734C42.1671 -72.9966 -206.582 -28.6606 -219.179 20.1177C-231.777 68.8958 -122.164 271.042 362.06 477.438C846.285 683.834 1056.13 627.26 1087.18 583.853Z"
          fill="none"
          className="transition-[stroke] duration-[2.5s]"
          stroke="var(--stop-color-three)"
        />
        <path
          id="orbit2b"
          d="M1087.18 583.853C1118.22 540.446 973.906 328.464 508.037 127.734C42.1671 -72.9966 -206.582 -28.6606 -219.179 20.1177C-231.777 68.8958 -122.164 271.042 362.06 477.438C846.285 683.834 1056.13 627.26 1087.18 583.853Z"
          fill="none"
          className="transition-[stroke] duration-[2.5s]"
          stroke="var(--stop-color-four)"
        />
        <path
          id="orbit3"
          d="M879.216 248.416C883.108 213.208 732.466 138.716 401.099 176.581C69.7319 214.446 -58.6594 321.874 -50.2539 354.098C-41.8483 386.322 85.7485 466.58 429.452 425.932C773.156 385.284 875.324 283.624 879.216 248.416Z"
          fill="none"
          className="transition-[stroke] duration-[2.5s]"
          stroke="var(--stop-color-five)"
        />
        <path
          id="orbit3b"
          d="M879.216 248.416C883.108 213.208 732.466 138.716 401.099 176.581C69.7319 214.446 -58.6594 321.874 -50.2539 354.098C-41.8483 386.322 85.7485 466.58 429.452 425.932C773.156 385.284 875.324 283.624 879.216 248.416Z"
          fill="none"
          className="transition-[stroke] duration-[2.5s]"
          stroke="var(--stop-color-six)"
        />
        <path
          id="orbit4"
          d="M917.514 338.868C928.076 305.057 794.487 203.096 462.001 176.806C129.515 150.515 -17.0716 231.368 -14.9923 264.606C-12.913 297.843 96.9534 401.05 442.081 426.972C787.208 452.893 906.952 372.679 917.514 338.868Z"
          fill="none"
          className="transition-[stroke] duration-[2.5s]"
          stroke="var(--stop-color-seven)"
        />
        <path
          id="orbit5"
          d="M865.238 376.013C866.655 353.357 726.865 267.685 431.288 214.34C135.71 160.996 26.6662 202.451 36.1247 226.029C45.5831 249.608 165.002 333.668 471.503 388.079C778.004 442.49 863.82 398.669 865.238 376.013Z"
          fill="none"
          className="transition-[stroke] duration-[2.5s]"
          stroke="var(--stop-color-eight)"
        />
        <path
          id="orbit5b"
          d="M865.238 376.013C866.655 353.357 726.865 267.685 431.288 214.34C135.71 160.996 26.6662 202.451 36.1247 226.029C45.5831 249.608 165.002 333.668 471.503 388.079C778.004 442.49 863.82 398.669 865.238 376.013Z"
          fill="none"
          className="transition-[stroke] duration-[2.5s]"
          stroke="var(--stop-color-one)"
        />
      </g>
      <g id="planets" mask="url(#orbitClip)" opacity="0">
        <circle
          id="giant"
          className="transition-[fill] duration-[10s] ease-in-out"
          cx="690"
          cy="434"
          r="60"
          fill="var(--stop-color-one)"
        />
        <circle
          id="midSize"
          className="transition-[fill] duration-[10s] ease-in-out"
          cx="831"
          cy="262"
          r="35"
          fill="var(--stop-color-two)"
        />
        <circle
          id="midSize2"
          className="transition-[fill] duration-[10s] ease-in-out"
          cx="70"
          cy="419"
          r="32.5"
          fill="var(--stop-color-three)"
        />
        <circle
          id="midSize3"
          className="transition-[fill] duration-[10s] ease-in-out"
          cx="700"
          cy="178"
          r="37"
          fill="var(--stop-color-four)"
        />

        <circle
          id="dwarf"
          className="transition-[fill] duration-[10s] ease-in-out"
          cx="107.5"
          cy="278.5"
          r="12.5"
          fill="var(--stop-color-five)"
        />
        <circle
          id="dwarf2"
          className="transition-[fill] duration-[10s] ease-in-out"
          cx="27.5"
          cy="581.5"
          r="10"
          fill="var(--stop-color-six)"
        />
        <circle
          id="dwarf3"
          className="transition-[fill] duration-[10s] ease-in-out"
          cx="752.5"
          cy="303.5"
          r="11"
          fill="var(--stop-color-seven)"
        />
        <circle
          id="small"
          className="transition-[fill] duration-[10s] ease-in-out"
          cx="752.5"
          cy="30.5"
          r="15"
          fill="var(--stop-color-eight)"
        />
        <circle
          id="small2"
          className="transition-[fill] duration-[10s] ease-in-out"
          cx="234.5"
          cy="30.5"
          r="18"
          fill="var(--stop-color-one)"
        />
      </g>
    </svg>
  );
}
