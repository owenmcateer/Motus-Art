/**
 * Genuary Day 5
 * "Destroy a square"
 *
 * @motus_art
 *
 * I traded styles with the incredible Jason Ting, known as jzlabs.
 * https://www.instagram.com/jzlabs/
 * https://twitter.com/_jzlabs
 */
const canvasSize = 540;
const gridCount = 25;
const margin = 50;
const gridSpacing = (canvasSize - (margin * 2)) / gridCount;
const dotSize = 4;
const dotMax = gridSpacing * 7;
let timer = 0;
const speed = 0.1;
const noiseScale = 0.03;
const noiseSpeed = 0.1;


function setup() {
  createCanvas(canvasSize, canvasSize);
  rectMode(CENTER);
}

function draw() {
  background(0);
  noStroke();
  strokeCap(SQUARE);
  translate(margin, margin);

  // The grid
  for (let x = 0; x <= gridCount; x++) {
    for (let y = 0; y <= gridCount; y++) {
      const xPos = x * gridSpacing;
      const yPos = y * gridSpacing;
      blendMode(ADD);

      push();
      translate(xPos, yPos);
      rotate(PI / 4);

      // Red
      const redMovement = timer * noiseSpeed;
      const redNoise = noise(x * noiseScale + redMovement, y * noiseScale + redMovement);
      const redSize = easeInCirc(redNoise, 0, 1, 1) * dotMax;
      fill(255, 0, 0);
      rect(0, 0, dotSize, redSize);

      // Green
      const greenMovement = (timer - 1) * noiseSpeed;
      const greenNoise = noise(x * noiseScale + greenMovement, y * noiseScale + greenMovement);
      const greenSize = easeInCirc(greenNoise, 0, 1, 1) * dotMax;
      fill(0, 255, 0);
      rect(0, 0, dotSize, greenSize);

      // Blue
      const blueMovement = (timer - 2) * noiseSpeed;

      const blueNoise = noise(x * noiseScale + blueMovement, y * noiseScale + blueMovement);
      const blueSize = easeInCirc(blueNoise, 0, 1, 1) * dotMax;
      fill(0, 0, 255);
      rect(0, 0, dotSize, blueSize);

      // Fixed white dot
      blendMode(BLEND);
      fill(255, 255, 255);
      rect(0, 0, dotSize, dotSize);
      pop();
    }
  }

  blendMode(BLEND);

  // Border
  resetMatrix();
  stroke(0);
  strokeWeight(margin * 2);
  noFill();
  rect(width / 2, height / 2, width + gridSpacing, height + gridSpacing);

  // Timer
  timer += speed;
}

function easeInCirc(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
}
