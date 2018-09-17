/**
 * Motus: Electric Arc
 * https://owenmcateer.github.io/Motus-Art
 *
 * Simulation of high voltage electric arc randomly jumping across a Perfboard.
 * Inspired by Drake Anthony's real word creation with 100kV+
 * https://youtu.be/5MISuVItKgo?t=1m34s
 */
const canvas = 1080;
const colours = [];

// Grid vars
const dotWidth = 15;
const dotGutter = 30;
const spacer = dotWidth + dotGutter;
const offset = spacer / 2;
const grid = {
  w: 24,
  h: 18,
};
const offsetY = (((canvas / spacer) - grid.h) / 2) * spacer;


let path = [];

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  ellipseMode(CENTER);

  // Colours
  colours.bg = [21, 22, 30, 0.1];
  colours.blue = [175, 241, 253, 0.5];
  colours.dots = [40, 35, 63];

}

// Draw tick
function draw() {
  background(colours.bg);

  // Grid
  noStroke();
  fill(colours.dots);
  for (let x = 0; x < grid.w; x++) {
    for (let y = 0; y < grid.h; y++) {
      ellipse((spacer * x) + offset, (spacer * y) + offset + offsetY, dotWidth, dotWidth);
    }
  }

  // Gen path
  drawPath();

  // Render line
  noFill();
  stroke(colours.blue);
  strokeWeight(dotWidth);
  for (let i = 0; i < path.length; i += 2) {
    line(
      (path[i] * spacer) + offset,
      (path[i + 1] * spacer) + offsetY + offset,
      (path[i + 2] * spacer) + offset,
      (path[i + 3] * spacer) + offsetY + offset,
    );
  }
}

// Test line
function drawPath() {
  path = [0, 0];
  let end = false;

  while (!end) {
    // At end?
    end = (path[path.length - 2] >= grid.w - 1 && path[path.length - 1] >= grid.h - 1);

    // Right
    if (path[path.length - 2] < grid.w - 1 && random() < 0.5) {
      path.push(round(random(path[path.length - 2], grid.w - 1)), path[path.length - 1]);
    }
    else if (path[path.length - 1] < grid.h - 1) {
      path.push(path[path.length - 2], round(random(path[path.length - 1], grid.h - 1)));
    }
  }
}
