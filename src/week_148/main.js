/**
 * Motus: Cobweb frosting
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const radius = 250;
const hollow = 100;
const ringSize = radius - hollow;
const maxAngle = Math.PI * 0.75;
const linesPerFrame = 4;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);
  background(39);
  stroke(239, 0.1);
}


// Draw
function draw() {
  // Center
  translate(width / 2, height / 2);

  // Draw random lines
  for (let i = 0; i < linesPerFrame; i++) {
    const p1a = random(TWO_PI);
    const p1r = random(ringSize) + hollow;
    const p2a = p1a + random(-maxAngle, maxAngle);
    const p2r = random(ringSize) + hollow;

    line(
      cos(p1a) * p1r,
      sin(p1a) * p1r,
      cos(p2a) * p2r,
      sin(p2a) * p2r,
    );
  }
}
