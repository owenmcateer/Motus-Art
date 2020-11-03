/**
 * Motus Art: Cube Labyrinth
 * https://owenmcateer.github.io/Motus-Art
 */
const boxSize = 40;
const boxesX = 26;
const boxesY = 13;
let timer = 0;
const speed = 0.0025;
let loop = 1;


// Setup
function setup() {
  createCanvas(540, 540, WEBGL);
  pixelDensity(2);
}


// Draw tick
function draw() {
  // Styling
  background(39);
  fill(250);
  stroke(0);
  strokeWeight(1);

  // Camera
  rotateX(HALF_PI);
  perspective(PI / 1.9, 1, 0.1, (boxesY - 3) * boxSize);
  const yMovement = timer * 2 * boxSize;
  const xMovement = timer * boxSize;
  translate(
    (boxesX / 2) * -boxSize - xMovement,
    yMovement,
    boxSize * -1.2,
  );

  // Build blocks
  const boxesTimer = sin(timer * 2 * TWO_PI - HALF_PI);
  for (let x = 0; x < boxesX; x++) {
    for (let y = 0; y < boxesY; y++) {
      for (let z = 0; z < 2; z++) {
        // Z-movement amount & timing
        const boxNoise = noise(x, y, z + loop + (floor(timer * 2) * 11)) * (boxSize / 1.6);
        let zOffset = map(boxesTimer, -1, 1, 0, boxNoise);
        if (z % 2 === 1) {
          zOffset *= -1;
        }

        push();
        translate(x * boxSize, y * boxSize, (z * 2.4) * boxSize + zOffset);
        box(boxSize);
        pop();
      }
    }
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
    loop++;
  }
}
