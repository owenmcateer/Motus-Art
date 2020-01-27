/**
 * Motus: Chequered brain
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const items = 8;
const boxSpacing = canvasSize / (items - 2);
// const boxSize = Math.sqrt(boxSpacing / 2 ** 2 + boxSpacing / 2 ** 2);
const boxSize = Math.sqrt(Math.pow(boxSpacing / 2, 2) + Math.pow(boxSpacing / 2, 2));

let timer = 0;
const speed = 0.003;

let rotateAmount;
let offset;


function setup() {
  createCanvas(canvasSize, canvasSize);
  noStroke();
  rectMode(CENTER);
}


function draw() {
  // Back/forth
  if (timer < 0.5) {
    fill(239);
    background(39);
    rotateAmount = (timer * 2) * HALF_PI - QUARTER_PI;
    offset = -(boxSpacing / 2);
  } else {
    fill(39);
    background(239);
    rotateAmount = (timer * 2) * -HALF_PI + QUARTER_PI;
    offset = 0;
  }

  // Draw grid
  for (let x = 0; x < items; x++) {
    for (let y = 0; y < items; y++) {
      const xpos = (x * boxSpacing) + offset;
      const ypos = (y * boxSpacing) + offset;

      push();
      translate(xpos, ypos);
      rotate(rotateAmount);
      rect(0, 0, boxSize, boxSize);
      pop();
    }
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
