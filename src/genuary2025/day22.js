/**
 * Genuary 2025: Day 22
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let canvasScale = 1;
let circleMath;

// p5 setup
function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));

  // Update canvas scale
  canvasScale = width / 1080;

  // Circle math
  circleMath = new CircleMath();

  // Sketch settings
  background(0);
  frameRate(8);
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  canvasScale = width / 1080;
  background(0);
}

// Draw tick
function draw() {
  // Scale and position
  scale(canvasScale);
  translate(540, 540);

  // Square position and size
  const pointInCircle = circleMath.randomPointInCircle(50);
  pointInCircle.x -= 540;
  pointInCircle.y -= 540;
  const distance = distanceToEdge(circleMath.radius, pointInCircle.x, pointInCircle.y);
  const squareRadius = min(distance * sqrt(2), random(300, 400));
  const ammm = squareRadius / 2;

  // Styles
  fill('lime');
  let gradTexture;
  const black = random(39);
  const white = random(220, 255);
  const startAlpha = random(0.75, 1);
  const endAlpha = random(0.75, 1);

  switch(floor(random(4))) {
    case 0:
      gradTexture = drawingContext.createLinearGradient(pointInCircle.x - ammm, 0, pointInCircle.x + ammm, 0);
      break;
    case 1:
      gradTexture = drawingContext.createLinearGradient(pointInCircle.x + ammm, 0, pointInCircle.x - ammm, 0);
      break;
    case 2:
      gradTexture = drawingContext.createLinearGradient(0, pointInCircle.y - ammm, 0, pointInCircle.y + ammm);
      break;
    case 3:
      gradTexture = drawingContext.createLinearGradient(0, pointInCircle.y + ammm, 0, pointInCircle.y - ammm);
      break;
  }

  gradTexture.addColorStop(0, `rgba(${black}, ${black}, ${black}, ${startAlpha})`);
  gradTexture.addColorStop(1, `rgba(${white}, ${white}, ${white}, ${endAlpha})`);
  drawingContext.fillStyle = gradTexture;

  noStroke();
  rectMode(CENTER);
  square(pointInCircle.x, pointInCircle.y, squareRadius)
}

// Calculate distance to circle edge
function distanceToEdge(radius, x, y) {
  const distanceToCenter = Math.sqrt(x * x + y * y);
  return Math.abs(radius - distanceToCenter);
}
