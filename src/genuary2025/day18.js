/**
 * Genuary 2025: Day 18
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let canvasScale = 1;
let circleMath;

const ground = 1080 * 0.9;
let timer = 0;
const speed = 0.002;
const seedNumber = Math.random() * 100000;
let maxLevels;

// p5 setup
function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));

  // Update canvas scale
  canvasScale = width / 1080;

  // Circle math
  circleMath = new CircleMath();

  maxLevels = round(random(8, 12));
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  canvasScale = width / 1080;
}

// Draw tick
function draw() {
  scale(canvasScale);
  background(25);
  randomSeed(seedNumber);

  // Grow tree
  push();
  stroke(255);
  strokeCap(PROJECT);
  translate(random(480, 600), ground);
  createBranch(0);
  pop();

  // Ground
  noStroke();
  fill(255);
  ellipse(540, ground + 75, 2160, 150);

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }

  // Circle mask
  strokeWeight(540);
  noFill();
  stroke(0);
  circle(540, 540, circleMath.diameter + 540);

  stroke(249);
  strokeWeight(10);
  circle(540, 540, circleMath.diameter);
}

// Create branch
function createBranch(level) {
  if (level < maxLevels) {
    // Draw new branch
    strokeWeight(map(level, 0, maxLevels, 20, 1));
    const branchLength = (1080 * -0.07);

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
