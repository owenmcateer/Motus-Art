/**
 * Motus: Plasma grid
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;

let phase = 0;
const items = 18;
const itemSpacing = Math.floor(canvasSize / (items + 2));
const edge = itemSpacing * 1.5;
const itemSize = itemSpacing * 0.9;
const speed = 0.015;
const plasmaScale = 2;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  rectMode(CENTER);
}

function draw() {
  background(40);

  // Build grid
  for (let x = 0; x < items; x++) {
    for (let y = 0; y < items; y++) {
      // Plasma math
      let size = phase * 8.0
        + y / (plasmaScale * 0.5)
        + 8.0 * sin(phase + y / (plasmaScale * 4.0)
        + 4.0 * sin(phase + x / (plasmaScale * 8.0)
        + 0.5 * sin(phase + y / (plasmaScale * 4.0))));

      // Map size range
      size %= (itemSize * 2);
      if (size > itemSize) {
        size = map(size, itemSize, itemSize * 2, itemSize - 1, 0);
      }

      // Style & render
      stroke(255);
      noFill();
      rect(x * itemSpacing + edge, y * itemSpacing + edge, size, size);
    }
  }

  // Speed control
  phase += speed;
}
