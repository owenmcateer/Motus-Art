/**
 * Motus: Encircling
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;
let counter = 0;
const speed = 0.01;
const radius = 500;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
}


// Draw tick
function draw() {
  background(40);
  noStroke();
  fill(255, 60);

  for (let i = 1; i < 20; i++) {
    for (let j = 1; j < 16; j++) {
      const stageJ = j / 16;
      const x = sin(frameCount / (300 / (i / 2))) * (stageJ * radius) + cx;
      const y = cos(frameCount / (300)) * (stageJ * radius) + cx;
      ellipse(x, y, 16);
    }
  }

  counter += speed;
  if (counter >= PI * 7) {
    counter = 0;
  }
}
