/**
 * Motus Art: 45° Random
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const border = 50;
const pallets = [
  '#349eeb',
  '#1a535c',
  '#4ecdc4',
  '#ff6b6b',
  '#ffffff',
  '#000000',
];


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(1);
  displayDensity(2);
}


// Draw tick
function draw() {
  // Randomness
  const gridCount = round(random(8, 18));
  const gridSize = (canvasSize - border) / (gridCount);
  const borderOffset = (border / 2) + (gridSize / 2);
  const half = gridSize / 2;
  const colour = random(pallets);

  // Style
  background(249);
  fill(colour);
  stroke(colour);

  // Build grid
  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < gridCount; y++) {
      // Filled Diagonals
      push();
      const offset = floor(random(4)) * HALF_PI;
      translate(x * gridSize + borderOffset, y * gridSize + borderOffset);
      rotate(offset);
      triangle(-half, -half, half, -half, half, half);
      pop();

      // Filled Diagonals (plus, full/empty)
      // const orientation = floor(random(6));
      // if (orientation < 4) {
      //   push();
      //   const offset = floor(random(4)) * HALF_PI;
      //   translate(x * gridSize + borderOffset, y * gridSize + borderOffset);
      //   rotate(offset);
      //   triangle(-half, -half, half, -half, half, half);
      //   pop();
      // }
      // else if (orientation === 4) {
      //   square(x * gridSize + borderOffset-half, y * gridSize + borderOffset-half, gridSize);
      // }
    }
  }
}