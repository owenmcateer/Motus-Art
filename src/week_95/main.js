/**
 * Motus: Star field
 * https://owenmcateer.github.io/Motus-Art
 *
 * Inspired by IG@automination
 */
const canvasSize = 540;
const cx = canvasSize / 2;
const boxSize = 80;
let rotatingAxis = 'Y';
const axis = ['Y', 'S', 'Z', 'S', 'X', 'S'];
let axisCount = 0;
let timer = 0;
const speed = 0.005;
let magicAngle;

// Boxes
const boxes = [
  // X group
  {
    x: 2,
    y: 0,
    z: 0,
  },
  // Y group
  {
    x: 0,
    y: 0,
    z: 2,
  },
  // Z group
  {
    x: 0,
    y: 2,
    z: 0,
  },
];

const patternSets = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 6,
    y: 0,
  },
  {
    x: 6,
    y: -6,
  },
  {
    x: 0,
    y: -6,
  },
];
// Stars
const starRows = [
  298,
  102,
  -94,
  -290,
];
const starColumns = [
  -289,
  -177,
  -63,
  50,
  163,
  276,
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
  // Styles
  background(39);
  noStroke();
  fill(255);

  // Set viewing angle
  rotateX(magicAngle);
  rotateY(QUARTER_PI);

  // Animation type
  if (rotatingAxis === 'S') {
    // Stars
    renderStars();
  } else {
    // Cubes
    renderCubes();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
    rotatingAxis = nextAxis();
  }
}


// Render the 3D cubes.
function renderCubes() {
  const timing = constrain(timer * 1.5, 0, 1);
  const rotateAmount = easeOutQuart(timing, 0, 1, 1) * HALF_PI;

  patternSets.forEach((pattern) => {
    push();
    translate(boxSize * pattern.x, boxSize * pattern.y, -250);
    boxes.forEach((boxSet) => {
      push();
      switch (rotatingAxis) {
        case 'Y':
          rotateY(rotateAmount);
          break;
        case 'Z':
          rotateZ(rotateAmount);
          break;
        case 'X':
          rotateX(rotateAmount);
          break;
        default:
      }

      // 1st half
      translate(boxSize * boxSet.x, boxSize * boxSet.y, boxSize * boxSet.z);
      box(boxSize);

      // 2nd half
      translate(boxSize * boxSet.x * -2, boxSize * boxSet.y * -2, boxSize * boxSet.z * -2);
      box(boxSize);
      pop();
    });
    pop();
  });
}


// What is the next Axis?
function nextAxis() {
  axisCount++;
  if (axisCount > axis.length - 1) {
    axisCount = 0;
  }
  return axis[axisCount];
}


// Easing functions
function easeOutQuart(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}
function easeOutBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}
