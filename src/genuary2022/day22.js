/**
 * Genuary Day 22
 * "Make something that will look completely different in a year."
 *
 * @motus_art
 *
 * Inspiration and recursive tree values from:
 * mtchl https://editor.p5js.org/mtchl/sketches/ryyW2U5Fx
 */
const canvasSize = 540;
const ground = canvasSize * 0.9;

let maxLevels = 0;
let timer = 0;
const speed = 0.0035;

// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(30);

  const now = new Date();
  const year = now.getFullYear();
  const timePassed = parseInt(`${year}${daysThisYear()}`, 10);
  maxLevels = min(map(timePassed, 202201, 202301, 9, 14), 17);
}

// Draw tick
function draw() {
  background(39);
  randomSeed(10);

  // Grow tree
  push();
  stroke(255);
  strokeCap(PROJECT);
  translate(width / 2, ground);
  createBranch(0);
  pop();

  // Ground
  noStroke();
  fill(255);
  ellipse(width / 2, ground + 75, width * 2, 150);

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}

// Create branch
function createBranch(level) {
  if (level < maxLevels) {
    // Draw new branch
    strokeWeight(map(level, 0, maxLevels, 20, 1));
    const branchLength = (height * -0.08);

    // Wind
    rotate(sin(timer * TWO_PI) * 0.02);

    // Draw branch
    line(0, 0, 0, branchLength);

    // Shift to end of branch and point in new direction
    translate(0, branchLength);
    rotate(random(-0.05, 0.05));

    // Create a new level?
    if (random() < 0.5) {
      scale(0.8);

      // Branch left
      rotate(-0.3);
      push();
      createBranch(level + 1);
      pop();

      // Branch right
      rotate(0.6);
      push();
      createBranch(level + 1);
      pop();
    }
    else {
      // Continue
      createBranch(level);
    }
  }
}

// Number of days so far this year
function daysThisYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}
