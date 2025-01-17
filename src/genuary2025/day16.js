/**
 * Genuary 2025: Day 16
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let bandsPrev = 0;

// p5 setup
function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  frameRate(2);
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
}

// Draw tick
function draw() {
  background(0);
  stroke(0);
  strokeWeight(width * random(0.015, 0.025));
  const bands = getRandomBands();

  for (let i = 0; i < bands; i++) {
    const w = width / bands;
    const range = map(i, 0, bands, 32, 220);
    const spread = 3;
    fill(
      random(range - spread, range + spread),
      random(range - spread, range + spread),
      random(range - spread, range + spread),
    );
    rect(i * w, 0, w, height);
  }

  // Circle mask
  strokeWeight(width / 2);
  noFill();
  circle(width / 2, height / 2, width * 1.45);
}

// Get a new bands count
function getRandomBands() {
  let bands = round(random(3, 6));
  if (bands === bandsPrev) {
    bands = getRandomBands();
  }
  bandsPrev = bands;
  return bands;
}

/**
 * Thinking numbers
 * 32-36
 * 210-220
 *
 * 32-36
 * 40-60
 * 80-90
 * 110-120
*/