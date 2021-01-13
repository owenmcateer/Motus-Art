/**
 * Motus: Blips
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const gridCount = 7;
const gridSize = canvasSize / (gridCount - 1);
const radius = gridSize * 0.8;
const dots = [];


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);

  // Create grid of dots.
  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < gridCount; y++) {
      dots.push(new Dot(x, y));
    }
  }
}

// Draw tick
function draw() {
  background(39);

  // More dots!
  addNewDot();

  // Draw dots
  dots.forEach((dotEntity) => {
    dotEntity.update();
    dotEntity.render();
  });
}


// Pick a random dot and bring it to life
function addNewDot() {
  random(dots).setAlive();
}
