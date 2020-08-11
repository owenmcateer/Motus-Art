/**
 * Motus: Grids: Pentadecagon
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const gridCount = 9;
const gridSize = canvasSize / (gridCount + 1);
const maxPoint = gridSize;
let maxDistance;
const entitySize = 15;

let timer = 0;
const speed = 0.001;


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
  strokeWeight(1);
  maxDistance = dist(gridSize * gridCount, gridSize * gridCount, maxPoint, maxPoint) + gridSize;

  // Render grid
  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < gridCount; y++) {
      const xPos = gridSize * x + gridSize;
      const yPos = gridSize * y + gridSize;
      let amount = dist(xPos, yPos, maxPoint, maxPoint) / maxDistance;
      amount = easeInOutQuad(amount, 0, 1, 1);

      // const amount = (x / gridCount) * (y / gridCount);
      // Draw entity
      if (x === 0 && y === 0) {
        strokeWeight(1.1);
        ellipse(xPos, yPos, entitySize * 2);
      } else {
        drawEntity(xPos, yPos, amount, 1);
        drawEntity(xPos, yPos, amount, 2);
        drawEntity(xPos, yPos, amount, 3);
      }
    }
  }

  // Timer
  timer += speed;
  if (timer >= TWO_PI) {
    timer = 0;
  }
}


// Draw circle
function drawEntity(x, y, crazy, entityNum) {
  const mult = map(crazy, 0, 1, 0, 20);

  stroke(map(entityNum, 3, 1, 255, 100));
  strokeWeight(1);

  beginShape();
  for (let i = 0; i <= TWO_PI; i += (TWO_PI / entitySize)) {
    const pointNoiseRaw = noise(
      cos(i + entityNum) * sin(timer) * mult + 66,
      sin(i + entityNum) * cos(timer) * mult + 66,
    );
    const pointNoise = map(pointNoiseRaw, 0, 1, -mult, mult);
    const radius = entitySize + pointNoise;
    const posX = cos(i) * radius + x;
    const posY = sin(i) * radius + y;
    vertex(posX, posY);
  }
  endShape(CLOSE);
}


// Easing
function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
}
