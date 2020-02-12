/**
 * Motus: Cubes Axes
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;

const boxSize = 100;
let rotatingAxis = 'X';
const axis = ['X', 'Y', 'Z'];
let timer = 0;
const speed = 0.007;
const boxes = [
  {
    // X group
    rotates: 'YZ',
    x: 2,
    y: 0,
    z: 0,
  },
  {
    // Y group
    rotates: 'YX',
    x: 0,
    y: 0,
    z: 2,
  },
  {
    // Z group
    rotates: 'XZ',
    x: 0,
    y: 2,
    z: 0,
  },
];
const magicAngle = Math.atan(1 / Math.sqrt(2));


/**
 * Setup
 */
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  smooth();
  pixelDensity(2);

  // Isometric projection
  ortho(-cx, cx, cx, -cx, -100, canvasSize * 3);
}


/**
 * Draw tick
 */
function draw() {
  background(39);
  noStroke();
  fill(239);

  // Set viewing angle
  rotateX(magicAngle);
  rotateY(QUARTER_PI);

  // Animate+easing
  const timing = constrain(timer * 1.5, 0, 1);
  const rotateAmount = easeInOutQuart(timing, 0, 1, 1) * HALF_PI;

  // Draw boxes
  boxes.forEach((boxSet) => {
    push();

    // Rotate box set
    if (boxSet.rotates.indexOf(rotatingAxis) >= 0) {
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
    }

    // Draw box set
    translate(boxSize * boxSet.x, boxSize * boxSet.y, boxSize * boxSet.z);
    box(boxSize);
    translate(boxSize * boxSet.x * -2, boxSize * boxSet.y * -2, boxSize * boxSet.z * -2);
    box(boxSize);
    pop();
  });

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
    rotatingAxis = nextAxis();
  }
}


/**
 * Find and return the next rotating Axis
 */
function nextAxis() {
  if (axis[axis.indexOf(rotatingAxis) + 1]) {
    return axis[axis.indexOf(rotatingAxis) + 1];
  }
  return axis[0];
}


/**
 * easeInOutQuart
 */
function easeInOutQuart(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
  return -c/2 * ((t-=2)*t*t*t - 2) + b;
}
