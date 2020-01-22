/**
 * Motus: Velocity 3.14
 *
 * The first 100 digits of PI plotted in order
 * and rotating at a multiple of its value.
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;
let phase = 0;
const speed = 0.0004;
let lastVector;
const piDigits = '3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067';
const elements = piDigits.length;
const elementGap = (canvasSize - 100) / elements / 2;


function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);
}


function draw() {
  // Styling
  background(239);
  stroke(39, 27);
  fill(39, 0.85);
  strokeWeight(6);

  // Draw elements
  for (let i = 1; i < elements; i++) {
    const r = i * elementGap;
    const m = phase * (TWO_PI * (piDigits[i]));
    const x = cos(m) * r + cx;
    const y = sin(m) * r + cx;

    // Draw lines
    if (i > 1) {
      stroke(49, 0.1);
      line(x, y, lastVector.x, lastVector.y);
    }

    // Draw entity
    noStroke();
    ellipse(x, y, 30);

    // Set previous vector
    lastVector = createVector(x, y);
  }

  // Timer
  phase += speed;
  if (phase >= 1) {
    phase = 0;
  }
}
