/**
 * Genuary 2025: Day 02
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let canvasScale = 1;
let circleMath;

function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));

  // Update canvas scale
  canvasScale = width / 1080;

  // Circle math
  circleMath = new CircleMath();
  background(39);
  frameRate(60);
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  canvasScale = width / 1080;
  background(39);
}

// Draw tick
function draw() {
  scale(canvasScale);
  translate(circleMath.offsetX, circleMath.offsetY);

  // Random circle point and blendmode
  const newPoint = circleMath.randomPointInCircle(200);
  const b = random([
    BLEND,
    DIFFERENCE,
    OVERLAY,
    SOFT_LIGHT,
    BURN,
  ]);
  blendMode(b);

  // Draw the circle
  noStroke();
  fill(random(239, 255));
  if (random() > 0.5) {
    ellipse(newPoint.x, newPoint.y, random(100, 400));
  } else {
    rect(newPoint.x, newPoint.y, random(100, 400) / 2);
  }
}
