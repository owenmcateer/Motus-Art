/**
 * Genuary Day 9
 * "800x80"
 *
 * @motus_art
 */
const magicAngle = Math.atan(1 / Math.sqrt(2));
const planeSize = 120;
const numOfPlanes = 80;
const gap = planeSize * 0.2;
const midPoint = (numOfPlanes * gap) / 2;
let timer = 0;
const speed = 0.004;


// Setup
function setup() {
  createCanvas(800, 80, WEBGL);
  frameRate(50);

  // Isometric projection
  ortho(-width, width, height, -height, width * -2, width * 2);
}


// Draw tick
function draw() {
  // Set viewing angle
  rotateX(magicAngle);
  rotateY(QUARTER_PI);

  // Style
  background(39);
  stroke(239);
  strokeWeight(2);
  noFill();

  translate(-midPoint, midPoint * 0.5, 0);
  for (let i = 0; i < numOfPlanes; i++) {
    const offset = i / numOfPlanes;

    // Rotate Z
    let rotZ = constrain(((timer * 4) + offset) % 4, 0, 1);
    rotZ = easeInOutSine(rotZ, 0, 1, 1);

    // Rotate Y
    let rotY = constrain(((timer * 4) + offset) % 4, 2, 3) - 2;
    rotY = easeInOutSine(rotY, 0, 1, 1);

    push();
    translate(i * gap, i * gap * -0.5, 0);
    rotateZ(rotZ * HALF_PI);
    rotateY(rotY * PI);
    box(planeSize, planeSize, 1);
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}


// Easing
function easeInOutSine(t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}
