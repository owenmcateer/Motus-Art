/**
 * Motus: Rotating stack
 * https://owenmcateer.github.io/Motus-Art
 */
let timer = 0;
const speed = 0.002;
const numOfBlocks = 11;

// Setup
function setup() {
  createCanvas(540, 540, WEBGL);
  pixelDensity(2);
}


// draw tick
function draw() {
  background(0);

  // Floor
  push();
  fill(40);
  noStroke();
  rotateX(HALF_PI);
  translate(0, -500, -241);
  plane(2500, 2500);
  pop();

  rotateX(HALF_PI);
  const globalFloat = sin(timer * TWO_PI + HALF_PI) * 15;

  // Blocks
  for (let i = 1; i <= numOfBlocks; i++) {
    const phase = i / numOfBlocks;

    // Shadows
    push();
    noStroke();
    fill(32);
    translate(0, 0, -240 + phase);
    rotateZ(timer * PI * i);
    plane(200 * 1.2, 100 * 1.2);
    pop();

    // Blocks
    push();
    const hOffset = i * 0.2;
    const hTimer = constrain(timer * 20, hOffset, 1 + hOffset) - hOffset;
    const hSpring = sin(hTimer * PI) * 20;
    const h = i * 35 + hSpring;
    translate(0, 0, h - 200 + globalFloat);
    rotateZ(timer * PI * i);
    box(200, 100, 25);
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
