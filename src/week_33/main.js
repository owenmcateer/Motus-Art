/**
 * Motus: Sticks in the wind
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const colours = [];

const pixel = canvasSize / 14;
const offset = pixel / 2;
const plasmaScale = 2;
let cols;
let rows;

// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);

  // Grid
  cols = Math.ceil(width / pixel);
  rows = Math.ceil(height / pixel);

  // Colours
  colours.bg = [194,185,176];
  colours.line = [88,72,62];

  strokeCap(ROUND);
}

function draw() {
  colorMode(RGB, 255, 255, 255, 1);
  background(colours.bg);

  noFill();
  stroke(colours.line);
  strokeWeight(10);

  // Phase
  const phase = millis() * 0.005;

  // Loop X&Y
  for (let y = 0; y < rows; ++y) {
    for (let x = 0; x < cols; ++x) {
      // Plasma animation
      const hue = phase * 8.0
        + y / (plasmaScale * 0.5)
        + 8.0 * sin(phase + y / (plasmaScale * 4.0)
        + 4.0 * sin(phase + x / (plasmaScale * 8.0)
        + 0.5 * sin(phase + y / (plasmaScale * 4.0))));

      // Get vlaue from colour HUE
      colorMode(HSB, 255);
      const c = color(hue % 255, 255, 255);
      const r = map(blue(c), 0, 255, 0, PI);
      drawLine(x, y, r);
    }
  }
}

// Draw rotating line
function drawLine(x, y, r) {
  x = x * pixel + offset;
  y = y * pixel + offset;
  r = r + PI * 1.25;

  translate(x, y);
  rotate(r);
  line(0, pixel * -0.3, 0, pixel * 0.3);
  resetMatrix();
}
