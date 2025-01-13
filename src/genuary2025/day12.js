/**
 * Genuary 2025: Day 02
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let canvasScale = 1;
let circleMath;

// p5 setup
function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));

  // Update canvas scale
  canvasScale = width / 1080;

  // Circle math
  circleMath = new CircleMath();

  // Sketch settings
  background(0);
  frameRate(10);
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  canvasScale = width / 1080;
  background(0);
  frameRate(10);
}

// Draw tick
function draw() {
  // Scale and position
  scale(canvasScale);
  translate(540, 540);
  rotate(HALF_PI * (frameCount % 4));

  // Styles
  fill(239, 200);
  stroke(0);
  strokeWeight(2);

  // Draw rectangles
  const thea = frameCount + random();
  rect(0, 0, cos(thea) * circleMath.radius, sin(thea) * circleMath.radius);
}
