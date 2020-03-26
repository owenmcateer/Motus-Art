/**
 * Motus: Blink
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const items = 8;
const boxSpacing = canvasSize / (items - 2);
const boxSize = boxSpacing;
let timer = 0;
const speed = 0.0018;

// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  rectMode(CENTER);
}

// Draw tick
function draw() {
  // Styling
  background(39);
  fill(239);
  noStroke();

  // Boxes
  const rotateAmount = sin(timer * TWO_PI - HALF_PI) * HALF_PI;
  for (let x = 0; x < items; x++) {
    for (let y = 0; y < items; y++) {
      const xpos = (x * boxSpacing);
      const ypos = (y * boxSpacing);

      push();
      translate(xpos, ypos);
      rotate(rotateAmount);
      rect(0, 0, boxSize - 4, boxSize - 4);
      pop();
    }
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
