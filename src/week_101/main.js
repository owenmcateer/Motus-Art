/**
 * Motus: Spherics Interference
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const gridCount = 9;
const gridSize = canvasSize / (gridCount + 1);
const maxPoint = gridSize;
let maxDistance;
const noiseScale = 44;
const circleSize = 60;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(30);
}


// Draw tick
function draw() {
  background(39);
  noFill();
  stroke(239);
  strokeWeight(2);
  maxDistance = dist(gridSize * gridCount, gridSize * gridCount, maxPoint, maxPoint) + gridSize;

  // Render grid
  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < gridCount; y++) {
      const xPos = gridSize * x + gridSize;
      const yPos = gridSize * y + gridSize;
      let amount = dist(xPos, yPos, maxPoint, maxPoint) / maxDistance;
      amount = easeInOutQuad(amount, 0, 1, 1);
      // Draw circle
      drawCircle(xPos, yPos, amount);
    }
  }
}


// Draw circle
function drawCircle(x, y, crazy) {
  ellipse(x, y, circleSize);
  for (let i = 0; i < 5; i++) {
    const randomX = (noise(x, y, frameCount + i) - 0.5) * noiseScale * crazy;
    const randomY = (noise(x, frameCount + i, y) - 0.5) * noiseScale * crazy;
    ellipse(x + randomX, y + randomY, circleSize);
  }
}


// Easing
function easeInOutQuad(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t + b;
  return -c/2 * ((--t)*(t-2) - 1) + b;
}
