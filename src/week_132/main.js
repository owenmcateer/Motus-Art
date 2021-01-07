/**
 * Motus: Love of Colour
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;
const numLines = 123;
const speed = 0.01;
let timer = 0;


function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(HSB, 360, 100, 100, 1);
}


function draw() {
  background(0);
  strokeWeight(4);
  const rotation = sin(timer);

  for (let i = 0; i < TWO_PI; i += (TWO_PI / numLines)) {
    // Outer circle
    const outerX = cos(i + rotation) * (cx - 20) + cx;
    const outerY = sin(i + rotation) * (cx - 20) + cx;

    // Inner heart
    const theta = i + HALF_PI + rotation;
    const R2 = map(sin(timer * 4), -1, 1, 5, 11);
    const innerY = -R2 * (13.0 * cos(theta) - 5.0 * cos(2.0 * theta) - 2.0 * cos(3 * theta) - cos(4 * theta)) + cx;
    const innerX = 16 * R2 * sin(theta) * sin(theta) * sin(theta) + cx;

    // Draw lines
    stroke(((i + timer + TWO_PI) % TWO_PI) / TWO_PI * 360, 100, 100);
    line(outerX, outerY, innerX, innerY);
  }

  // Timer
  timer += speed;
  if (timer >= TWO_PI) {
    timer = 0;
  }
}
