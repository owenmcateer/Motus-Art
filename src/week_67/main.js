/**
 * Motus: Bubble Wrap
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;

let timer = 0;
const speed = 0.004;
const gridSize = 12;
const gridBox = Math.round(canvasSize / gridSize);


function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
}


function draw() {
  background(40);
  noStroke();

  const noiseX = cos(timer * TWO_PI) * 1 + cx;
  const noiseY = sin(timer * TWO_PI) * 1 + cx;

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const col = noise(noiseX + x, noiseY + y);
      fill((col * 155) + 40);
      ellipse(
        x * gridBox + (gridBox / 2),
        y * gridBox + (gridBox / 2),
        (gridBox - 2) * map(col, 0, 1, 0.6, 1),
      );
    }
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
    background(255);
    noLoop();
  }
}
