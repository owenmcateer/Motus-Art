/**
 * Motus: Offsets of π
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;
const lines = 7;
const dotSize = 40;
const speed = -50;
const baseSize = 950;
let showing = 1;
let addingWait = 120;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours
  colours.bg = 20;
  colours.base = 0;
  colours.dot = 240;
  colours.stroke = 100;
  colours.line = 100;
}

// Draw tick
function draw() {
  background(colours.bg);

  // Centre elements
  rectMode(CENTER);
  translate(cx, cx);

  // Draw base
  fill(colours.base);
  stroke(colours.stroke);
  strokeWeight(2);
  ellipse(0, 0, baseSize + dotSize, baseSize + dotSize);

  // Draw line
  for (let i = 0; i < Math.min(showing, lines); i++) {
    rotate((PI / lines));
    noFill();
    stroke(colours.line);
    strokeWeight(2);
    line((baseSize / -2) - (dotSize / 2), 0, (baseSize / 2) + (dotSize / 2), 0);
  }

  // Draw dots
  resetMatrix();
  translate(cx, cx);
  for (let i = 0; i < Math.min(showing, lines); i++) {
    rotate((PI / lines));
    const offset = i * (PI / lines);
    const x = cos((frameCount / speed) + offset) * (baseSize / 2);

    fill(colours.dot);
    noStroke();
    ellipse(x, 0, dotSize, dotSize);
  }

  // Bring in one at a time
  if (frameCount % addingWait === 0 && showing < lines) {
    showing++;
    addingWait = Math.round(addingWait * 0.92);
  }
}
