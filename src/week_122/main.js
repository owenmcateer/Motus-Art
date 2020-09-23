/**
 * Motus: Infinite
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;
let timer = 0;
const speed = 0.05;

const a = 1;
const b = 2;

const numOfLines = 150;
const outerSize = cx * 0.9;
const infiniteSize = cx * 0.4;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);
  background(15);
  pixelDensity(2);
}


// Draw tick
function draw() {
  background(15, 0.8);
  stroke(239, 0.7);

  // Formula from https://en.wikipedia.org/wiki/Lissajous_curve
  // a = 1, b = 2 (1:2)
  const x = b * sin(timer / b + PI);
  const y = sin(timer / a);
  const centerX = x * infiniteSize + cx;
  const centerY = y * infiniteSize + cx;

  // Draw lines
  for (let i = 0; i < numOfLines; i++) {
    const ii = (TWO_PI / numOfLines) * i;
    const outerX = cos(ii) * outerSize + cx;
    const outerY = sin(ii) * outerSize + cx;
    line(outerX, outerY, centerX, centerY);
  }

  // Timer
  timer += speed;
}
