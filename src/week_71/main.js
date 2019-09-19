/**
 * Motus: Skewed disks
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;
let counter = 0;


function setup() {
  createCanvas(canvasSize, canvasSize);
}


function draw() {
  background(40);
  stroke(250);
  strokeWeight(10);
  noFill();

  // Rings
  for (let i = 0; i < 8; i++) {
    const size = (i * 35) + 200;
    const aDelay = i * 0.05;
    const bDelay = i * 0.03;

    // Range: 0 - TWO_PI
    const aConstrain = map(constrain(counter, aDelay, 1), aDelay, 1, 0, 1);
    const bConstrain = map(constrain(counter, bDelay, 1), bDelay, 1, 0, 1);
    const aEase = easeOutSine(aConstrain, 0, 1, 1);
    const bEase = easeOutSine(bConstrain, 0, 1, 1);
    const a = aEase * TWO_PI;
    const b = bEase * TWO_PI;

    push();
    // Set origin at center of canvas
    translate(cx, cx);
    // Flip Y-axis to point up instead of down
    scale(1, -1);
    // Apply 2x2 transformation matrix, in column-major order
    // Learn more: https://math.stackexchange.com/a/3361015/599209
    applyMatrix(
      cos(b), 0, -sin(a) * sin(b),
      cos(a), 0, 0,
    );
    ellipse(0, 0, size, size);
    pop();
  }

  // Timer
  counter += 0.0025;
  if (counter > 1) {
    counter = 0;
  }
}

function easeOutSine(t, b, c, d) {
  return c * Math.sin(t / d * (Math.PI / 2)) + b;
}
