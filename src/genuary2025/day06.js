/**
 * Genuary 2025: Day 06
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let canvasScale = 1;
const gridSize = 26;
const towerChance = 0.65;
const s = 100;
const movementSpeed = 0.02;

// p5 setup
function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight), WEBGL);

  // Update canvas scale
  canvasScale = width / 1080;

  smooth();
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  canvasScale = width / 1080;
}

// Draw tick
function draw() {
  scale(canvasScale);
  background(39);
  stroke(239);
  strokeWeight(2);
  noFill();

  // Noise timing
  const t = frameCount * movementSpeed;
  const movement = (t % 1);
  const noiseInit = floor(t);

  // Camera position
  rotateY(-0.2);
  rotateX(0.06);
  translate(0, s * 1.55, movement * s);
  translate((gridSize / -2) * s, 0, (gridSize / -1.5) * s);

  // Draw the world
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      push();
      translate(x * s, 0, y * s);
      const noiseValue = noise(x, y - noiseInit);

      let distance = map(y + movement, 0, gridSize, 0, 1);
      distance = easeInQuad(distance, 0, 1, 1);
      const gray = map(noiseValue, 0, 1, 39, 255);
      fill(gray * distance + 39);
      stroke(map(distance, 0, 1, 39, 239));
      fill(39);
      rotateX(HALF_PI);
      translate(0, 0, s * 0.5);

      // Floor/ceiling
      plane(s);
      push();
      translate(0, 0, s * 3);
      plane(s);
      pop();

      // Draw a column?
      if (noiseValue > towerChance && (x <= gridSize/2 || x > gridSize / 2 + 2)) {
        translate(0, 0, s * 3 * 0.5);
        box(s * 0.3 * noiseValue, s * 0.7 * noiseValue, s * 3);
      }
      pop();
    }
  }
}

// Easing function
function easeInQuad(t, b, c, d) {
  return c*(t/=d)*t + b;
}
