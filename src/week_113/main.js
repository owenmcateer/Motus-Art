/**
 * Motus: The Drop
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;

const boxSize = 105;
let timer = 0;
const speed = 0.004;
const numOfBoxes = 5;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  smooth();
  pixelDensity(2);
}


// Draw tick
function draw() {
  // Set viewing angle
  rotateX(3.55 + (sin(timer * TWO_PI) / 40));
  rotateY(1);

  // Styles
  background(39);
  stroke(0);
  strokeWeight(4);
  fill(255);

  // Draw falling boxes
  for (let i = 0; i < numOfBoxes; i++) {
    push();
    const timerOffset = (timer + ((1 / numOfBoxes) * i) + 1) % 1;
    const xPosition = (i * boxSize * 1.02) + (boxSize * -2);

    // Scrolling translate
    translate(0, timerOffset * -boxSize, 0);

    // Top box
    push();
    const topTransitionAmount = map(constrain(timerOffset, 0, 0.5), 0, 0.5, 0, 1);
    const topTransition = easeOutBounce(topTransitionAmount, 0, 1, 1) * -height + cx + boxSize;
    translate(xPosition, topTransition + cx, xPosition);
    box(boxSize);
    pop();

    // Bottom box
    push();
    const bottomTransition = map(constrain(timerOffset, 0.5 / 2.75, 1), 0.5 / 2.75, 1, 0, 1) * -cx * 3;
    translate(xPosition, bottomTransition, xPosition);
    box(boxSize);
    pop();

    // Close stack push()
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}


// Easing
function easeOutBounce(t, b, c, d) {
  if ((t /= d) < (1 / 2.75)) {
    return c * (7.5625 * t * t) + b;
  } else if (t < (2 / 2.75)) {
    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
  } else if (t < (2.5 / 2.75)) {
    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
  } else {
    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
  }
}
