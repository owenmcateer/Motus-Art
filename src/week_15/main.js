/**
 * Motus: Square twist
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;
let rotateCount = 0;
let canvasBg;
const speed = 0.006;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  rectMode(CENTER);

  // Colours
  colours.bg1 = [3, 205, 163];
  colours.bg2 = [1, 60, 112];
  colours.fill = [49, 124, 166, 0.5];
  colours.stroke = [139, 217, 250, 1];

  // Generate background gradient
  canvasBg = drawBackground();
}

// Draw tick
function draw() {
  // Render background
  image(canvasBg, 0, 0);
  // Square styles
  fill(colours.fill);
  stroke(colours.stroke);
  strokeWeight(10);

  // Draw first square
  translate(cx, cx);
  drawRect(750);

  // Increment speed
  rotateCount += speed;
}

// Draw square
function drawRect(s) {
  // Fractal endpoint
  if (s < 60) return;

  // Rotate and draw
  rotate(rotateCount);
  rect(0, 0, s, s);
  drawRect(s - 60);
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
