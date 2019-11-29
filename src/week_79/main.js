/**
 * Motus: Low-res ocean
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
let timer = 0;
const blockSize = 40;
const waveStrength = 2;
const waveHeight = 20;


function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  colorMode(RGB, 255, 255, 255, 1);
  smooth();
}


function draw() {
  background(40);

  // Styles
  stroke(139);
  strokeWeight(2);
  fill(40);

  // Position camera
  rotateX(radians(70));
  rotateY(radians(0));
  rotateZ(radians(30));
  translate(-270, -260, 0);

  for (let x = 0; x < 15; x++) {
    for (let y = 0; y < 15; y++) {
      const zPos = sin(x / waveStrength + timer) * cos(y / waveStrength + timer) * waveHeight;
      const xPos = x * blockSize;
      const yPos = y * blockSize;

      push();
      translate(xPos, yPos, zPos);
      box(blockSize * 0.8);
      pop();
    }
  }

  fill(40, 0.6);
  noStroke();
  push();
  rotateX(radians(90));
  rotateY(radians(90));
  translate(200, 50, 100);
  plane(500, 150);
  translate(0, 0, -blockSize);
  plane(500, 150);
  pop();

  push();
  rotateX(radians(90));
  translate(230, 30, -20);
  plane(550, 150);
  translate(0, 0, -40);
  plane(550, 150);
  pop();

  push();
  rotateX(radians(90));
  rotateY(radians(-45));
  translate(160, 200, 0);
  fill(57);
  plane(width * 2, 400);
  pop();

  // Timer
  timer += 0.01;
  if (timer >= TWO_PI) {
    timer = 0;
  }
}
