/**
 * Motus: Apex depth
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;

let canvasBg;
const triangles = {
  count: 6,
  min: 100,
  max: 800,
};

const steps = 'GRLRLCS';
let step = 0;

let zPhase = 0;
let xPhase = 0;
const zSpeed = 0.02;
const xSpeed = 0.05;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours
  colours.bg1 = [44, 42, 87];
  colours.bg2 = [33, 23, 49];
  colours.triangle = [225, 38, 123];

  // Generate background gradient
  canvasBg = drawBackground();
}

// Draw tick
function draw() {
  // Draw background
  background(...colours.bg2);
  image(canvasBg, 0, 0, canvasBg.width, canvasBg.height);

  // Set shape centre
  translate(cx, canvas * 0.6);

  // Animation steps
  switch (steps[step]) {
    // Grow
    case 'G':
      if (zPhase < 1) {
        zPhase += zSpeed;
      } else {
        nextStep();
      }
      break;

    // Shrink
    case 'S':
      if (zPhase > 0) {
        zPhase -= zSpeed;
      } else {
        nextStep();
      }
      break;

    // Move right
    case 'R':
      if (xPhase > -1) {
        xPhase -= xSpeed;
      } else {
        nextStep();
      }
      break;

    // Move left
    case 'L':
      if (xPhase < 1) {
        xPhase += xSpeed;
      } else {
        nextStep();
      }
      break;

    // Centre
    case 'C':
      if (xPhase < (0 - xSpeed)) {
        xPhase += xSpeed;
      } else if (xPhase > (0 + xSpeed)) {
        xPhase -= xSpeed;
      } else {
        nextStep();
      }
      break;

    default:
  }

  // Add triangles
  for (let i = 0; i <= triangles.count; i++) {
    push();
    const triangleZPhase = map(i - 3, -3, 3, -1, 1) * easeInOutCubic(zPhase, 0, 1, 1);
    const xMovement = 50 * (i - 3) * (easeInOutExpo(xPhase + 1, 0, 2, 2) - 1);
    const zMovement = map(triangleZPhase, -1, 1, triangles.min, triangles.max) + triangles.min;
    // Position
    translate(xMovement, map(triangleZPhase, -1, 1, 0, -40));

    // Styling
    stroke(...colours.triangle, map(triangleZPhase, -1, 1, 0.2, 0.9));
    noFill();
    strokeWeight(map(triangleZPhase, -1, 1, 10, 30));

    // Triangle math
    const thisTriangleSize = zMovement;
    const w = thisTriangleSize / 2;
    const h = (w) * sqrt(3);
    const hh = h / 3;

    // Draw triangle
    triangle(w, hh,
      -w, hh,
      0, hh * -2,
    );
    pop();
  }
}

// Next step/restart
function nextStep() {
  step++;
  if (step >= steps.length) {
    step = 0;
  }
}

// Draw background gradient
function drawBackground() {
  const bg = createGraphics(width, height);
  bg.background(colours.bg1);

  // Draw gradient bg
  bg.noFill();
  for (let i = 0; i <= height; i++) {
    const c = lerpColor(color(...colours.bg1), color(...colours.bg2), i / height);
    bg.stroke(c);
    bg.line(0, i, width, i);
  }
  return bg;
}

// Easing functions
function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}
function easeInOutExpo(t, b, c, d) {
  if (t==0) return b;
  if (t==d) return b+c;
  if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
  return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
}
