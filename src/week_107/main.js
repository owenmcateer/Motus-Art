/**
 * Motus: Ontological parasitic
 */
const canvasSize = 540;
const cx = canvasSize / 2;

let lines;
const startingLines = 3;
const radius = 160;
const lineLength = 160;
let edges = 2.5;
const numberOfLines = 200;
let timer = 0;
const speed = 0.0006;
const colours = {};


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);
  pixelDensity(2);

  // Set colours
  colours.a = color(100, 230, 235, 0.4);
  colours.b = color(181, 27, 226, 0.4);
  colours.bg = 39;
  background(colours.bg);
}


// Draw tick
function draw() {
  background(colours.bg, 0.8);
  stroke(39);
  strokeWeight(8);

  // Animate lines
  if (timer <= 0.5) {
    lines = (easeInOutCubic(timer * 2, 0, 1, 1) * numberOfLines) + startingLines;
  }
  else {
    lines = (easeInOutCubic(1 - map(timer, 0.5, 1, 0, 1), 0, 1, 1) * numberOfLines) + startingLines;
  }

  // Draw lines
  const angleSteps = TWO_PI / lines;
  for (let i = 0; i < TWO_PI; i += angleSteps) {
    const x = cos(i - HALF_PI) * radius + cx;
    const y = sin(i - HALF_PI) * radius + cx;
    stroke(lerpColor(colours.a, colours.b, map(sin(i), -1, 1, 0, 1)));
    push();
    translate(x, y);
    rotate((i * edges) + (timer * TWO_PI * 2));
    line(lineLength * -0.5, 0, lineLength * 0.5, 0);
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
    edges += 0.5;

    if (edges > 6) {
      edges = 0;
    }
  }
}


// Easing
function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}
