import gsap from 'gsap';

export const polygonSides = 180;
export const svgWidth = 900;
export const svgHeight = 600;

export const gradientThemes = [
  'theme-one',
  'theme-two',
  'theme-three',
  'theme-four',
  'theme-five',
  'theme-six',
  'theme-seven',
  'theme-eight',
  'theme-nine',
];

const circleRadius = 60;
const xCoordinatesArray: number[] = [];
const yCoordinatesArray: number[] = [];

const getAngle = (index: number) => (2 * Math.PI * index) / polygonSides;
const getCircleCoordinates = (angle: number) => {
  const x = svgWidth / 2 + circleRadius * Math.cos(angle);
  const y = svgHeight / 2 + circleRadius * Math.sin(angle);
  return { x, y };
};

Array.from({ length: polygonSides }, (_, i) => {
  const angle = getAngle(i);
  const { x, y } = getCircleCoordinates(angle);
  xCoordinatesArray.push(x);
  yCoordinatesArray.push(y);
});

export const wrappedXCoordinates = gsap.utils.wrap(xCoordinatesArray);
export const wrappedYCoordinates = gsap.utils.wrap(yCoordinatesArray);
export const wrappedGradientThemes = gsap.utils.wrap(gradientThemes);
