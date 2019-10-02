/**
 * Motus: Detention forcefield
 * https://owenmcateer.github.io/Motus-Art
 *
 * Anyone remember the detention forcefield
 * from Superman II (1980) the Trial of Zod.
 */
const canvasSize = 400;
let timer = 0;
const size = 300;


function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
  frameRate(1);
}


function draw() {
  background(35);

  // Floor
  fill(20);
  noStroke();
  rect(0, 260, width, height);

  // Rings
  noFill();
  stroke(255);
  strokeWeight(20);
  let alpha;
  const beta = timer * TWO_PI;

  // Shadows drawn first
  stroke(60);
  alpha = 1.5;
  push();
  translate(width / 2, 325);
  scale(1, -1);
  applyMatrix(cos(beta), 0, -sin(alpha) * sin(beta), cos(alpha), 0, 0);
  ellipse(0, 0, size, size);
  pop();

  stroke(40);
  alpha = -1.5;
  push();
  translate(width / 2, 348);
  scale(1, -1);
  applyMatrix(cos(beta), 0, -sin(alpha) * sin(beta), cos(alpha), 0, 0);
  ellipse(0, 0, size, size);
  pop();

  // Ring 1
  stroke(255);
  alpha = 1.2;
  push();
  translate(width / 2, 140);
  scale(1, -1);
  applyMatrix(cos(beta), 0, -sin(alpha) * sin(beta), cos(alpha), 0, 0);
  ellipse(0, 0, size, size);
  pop();

  // Ring 2
  alpha = -1.2;
  push();
  translate(width / 2, 255);
  scale(1, -1);
  applyMatrix(cos(beta), 0, -sin(alpha) * sin(beta), cos(alpha), 0, 0);
  ellipse(0, 0, size, size);
  pop();

  // Timer
  timer += 0.007;
  if (timer >= 1) {
    timer = 0;
    background(255);
    noLoop();
  }
}
