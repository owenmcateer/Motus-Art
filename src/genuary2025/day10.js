/**
 * Genuary:
 *  TAU/TAU+TAU/TAU
 *  TAU-TAU
 *  TAU/TAU+TAU/TAU
 *  floor(TAU)-TAU/TAU
 *
 * Day: floor(TAU)*(TAU/TAU+TAU/TAU)-(TAU/TAU+TAU/TAU)
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */

let pointFour;
let pointEight;
let zero;
let one;
let two;
let three;
let ten;
let pointNine;

let angleOuterSpeed;
let angleInnerSpeed;
let angleOuter;
let angleInner;

// Setup
function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  background(TAU - TAU);

  // TAU numbers
  pointFour = sqrt(TAU) / TAU;
  pointEight = pointFour + pointFour;
  zero = TAU - TAU;
  one = TAU / TAU;
  two = one + one;
  three = TAU / two;
  ten = three * three;
  pointNine = (ten - one) / ten;

  angleOuter = TAU;
  angleInner = TAU;

  initAngles();
}

// Init angles
function initAngles() {
  background(TAU - TAU);
  angleOuterSpeed = random(one / ten);
  angleInnerSpeed = random(one / ten);
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
}

// Draw tick
function draw() {
  const mid = width / (two);
  for (let i = zero; i < two; i++) {
    // Outer point
    const outerX = mid + (cos(angleOuter) * (mid * pointNine));
    const outerY = mid + (sin(angleOuter) * (mid * pointNine));
    angleOuter += angleOuterSpeed;

    // Inner point
    const innerX = mid + (cos(angleInner) * (mid * pointEight));
    const innerY = mid + (sin(angleInner) * (mid * pointEight));
    angleInner += angleInnerSpeed;

    // Draw lines
    stroke(TAU * TAU * TAU, TAU * (TAU+TAU));
    line(innerX, innerY, outerX, outerY);
  }

  // Reset
  if (frameCount % round(ten * ten * ten) === TAU - TAU) {
    initAngles();
  }
}
