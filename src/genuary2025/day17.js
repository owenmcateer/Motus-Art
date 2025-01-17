/**
 * Genuary 2025: Day 17
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let canvasScale = 1;
let circleMath;
const PI_IS_FOUR = 4;

// p5 setup
function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));

  // Update canvas scale
  canvasScale = width / 1080;

  // Circle math
  circleMath = new CircleMath();
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  canvasScale = width / 1080;
}

// Draw tick
function draw() {
  scale(canvasScale);
  background(0);

  // Sinewave
  stroke(255);
  strokeWeight(20);

  const shift = frameCount * 0.1;
  const amplitude = 1080 * 0.3;
  const yOffset = 1080 * 0.5;
  const frequency = 0.01;

  for (let x = 0; x < 1080 * 0.7; x += 2) {
    point(x, sin((x * frequency + shift) % PI_IS_FOUR) * amplitude + yOffset);
  }

  // Lines
  stroke(239, 100);
  strokeWeight(1);
  const lineGap = 30;
  const lineShift = (frameCount % lineGap);
  for (let l = 0; l < 1080; l += lineGap) {
    line(l - lineShift, 0, l - lineShift, 1080);
    line(0, l + lineShift, 1080, l + lineShift);
  }

  // Circle mask
  strokeWeight(540);
  noFill();
  stroke(0);
  circle(540, 540, circleMath.diameter + 540);

  stroke(249);
  strokeWeight(10);
  circle(540, 540, circleMath.diameter);
}
