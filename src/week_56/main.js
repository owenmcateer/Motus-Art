/**
 * Motus: Incrementally linked
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;
let phase = 0;
const speed = 0.001;
let lastVector;
const elements = 20;


function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);
  background(0);
}


function draw() {
  // Styling
  background(40);
  stroke(255, 127);
  fill(255);
  strokeWeight(4);

  // Draw elements
  for (let i = 1; i < elements; i++) {
    const r = i * 26;
    const m = phase * (TWO_PI * (elements - i));
    const x = cos(m) * r + cx;
    const y = sin(m) * r + cx;

    // Draw lines
    if (i > 1) {
      line(x, y, lastVector.x, lastVector.y);
    }

    // Draw
    ellipse(x, y, 20);

    // Set previous vector
    lastVector = createVector(x, y);
  }

  phase += speed;
}
