/**
 * Motus: Magnetic cubes
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;

const boxSize = 105;
let timer = 0;
const speed = 0.02;
let magicAngle;

// Boxes
const boxes = [
  // 1
  {
    x: 0,
    y: 1,
    z: 0,
  },
  // 2
  {
    x: 1,
    y: 0,
    z: 0,
  },
  // 3
  {
    x: 0,
    y: 0,
    z: 1,
  },
  {
    x: 0,
    y: -1,
    z: 0,
  },
  {
    x: -1,
    y: 0,
    z: 0,
  },
  {
    x: 0,
    y: 0,
    z: -1,
  },
];


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  smooth();
  pixelDensity(2);

  // The magic angle
  magicAngle = atan(1 / sqrt(2));

  // Isometric projection
  ortho(-cx, cx, cx, -cx, -100, canvasSize * 3);
}


// Draw tick
function draw() {
  // Set viewing angle
  rotateX(magicAngle);
  rotateY(QUARTER_PI);

  // Styles
  background(39);
  stroke(0);
  strokeWeight(4);
  fill(255);

  // Draw cubes
  boxes.forEach((boxSet, i) => {
    let iTimer = cos(timer + ((i / boxes.length) * PI));
    iTimer = map(iTimer, -1, 1, 0, 1);
    iTimer = constrain(iTimer * 2, 0.5, 1.5);
    iTimer = easeInOutSine(iTimer, 0, 1, 1);

    push();
    translate(
      boxSize * iTimer * boxSet.x * 2,
      boxSize * iTimer * boxSet.y * 2,
      boxSize * iTimer * boxSet.z * 2,
    );
    box(boxSize - 1);
    pop();
  });

  // Timer
  timer += speed;
  if (timer >= TWO_PI) {
    timer = 0;
  }
}


// Easing
function easeInOutSine(t, b, c, d) {
  return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}
