'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';
import CustomEase from 'gsap/CustomEase';
import CustomWiggle from 'gsap/CustomWiggle';
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
  stopDeviation,
} from './utils';

gsap.registerPlugin(MorphSVGPlugin, CustomEase, CustomWiggle, useGSAP);
export default function Blob() {
  const container = useRef<SVGSVGElement>(null);
  const blob = useRef<SVGPolygonElement>(null);

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

      function updateGradientStops() {
        const linearGradientStops = document.querySelectorAll('#rainbow stop');
        const gradientStops = Array.from(linearGradientStops).reduce(
          (acc, _, index) => {
            if (acc[index] != null) return acc;

            const prevIndex = Math.max(0, index - 1);
            const value = gsap.utils.random(
              acc[prevIndex],
              Math.max(stopDeviation * (index * (3 / 2)), stopDeviation * 2)
            );

            return [...acc, Math.min(value, 1)];
          },
          [0]
        );

        linearGradientStops.forEach((el, i) => {
          el.setAttribute('offset', gradientStops[i].toString());
        });
        gsap.delayedCall(gsap.utils.random(5, 7.5), updateGradientStops);
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

        const mainTimeline = gsap.timeline();

        mainTimeline
          .to(blob.current, {
            scale: () => gsap.utils.random(0.9, 1.1),
            transformOrigin: 'center',
            rotation: () => 'random([-=60,-=30,+=30,+=60])',
            duration: () => gsap.utils.random(9, 12),
            ease: 'random([elastic.out, circ.out, back.out])',
            repeatRefresh: true,
            repeat: -1,
          })
          .to(polygonPoints, {
            x: 'random([+=2, +=3])',
            y: 'random([+=2, +=3])',
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
      }

      gsap.delayedCall(0, createPolygonPoints);
      gsap.delayedCall(7.5, setGradientTheme);
      gsap.delayedCall(5, updateGradientStops);
    },
    { scope: container, dependencies: [blob, container] }
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      height={svgHeight}
      width={svgWidth}
      className="w-full h-full bg-[rebeccapurple]"
      ref={container}
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
          <stop offset="0" stopColor="var(--stop-color-one)" />
          <stop
            offset="0.14285714285714285"
            stopColor="var(--stop-color-two)"
          />
          <stop
            offset="0.2857142857142857"
            stopColor="var(--stop-color-three)"
          />
          <stop
            offset="0.42857142857142855"
            stopColor="var(--stop-color-four)"
          />
          <stop
            offset="0.5714285714285714"
            stopColor="var(--stop-color-five)"
          />
          <stop offset="0.7142857142857143" stopColor="var(--stop-color-six)" />
          <stop
            offset="0.8571428571428571"
            stopColor="var(--stop-color-seven)"
          />
          <stop offset="1" stopColor="var(--stop-color-eight)" />
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
      </defs>
      <polygon
        strokeWidth="0"
        strokeLinejoin="round"
        stroke="black"
        fill="url(#rainbow)"
        ref={blob}
        points=""
      />
    </svg>
  );
}
