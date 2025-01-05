/**
 * Genuary 2025: Day 05
 * Isometric Art (No vanishing points).
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let canvasScale = 1;
let circleMath;
let magicAngle;

function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight), WEBGL);

  // Update canvas scale
  canvasScale = width / 1080;

  // Circle math
  circleMath = new CircleMath();

  // The magic angle
  magicAngle = atan(1 / sqrt(2));

  // Isometric projection
  ortho(width * -0.5, height * 0.5, width * 0.5, height * -0.5, -1000, width * 3);
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  canvasScale = width / 1080;
}

// Easing function
function easeOutExpo(t, b, c, d) {
  return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}

function draw() {
  randomSeed(1);
  scale(canvasScale);
  const t = frameCount * 0.006;

  // Set viewing angle
  rotateX(magicAngle);
  rotateY(-QUARTER_PI);
  rotateY(t);

  // Styling
  background(0);
  stroke(0);
  strokeWeight(2);
  fill(239);

  // Circle cubes
  const radius = circleMath.radius;
  const boxSize = radius / 9.25;
  for (let y = -radius; y <= radius; y += boxSize) {
    for (let x = -radius; x <= radius; x += boxSize) {
      if (dist(0, 0, x, y) <= radius) {
        push();
        let phase = ((t + random()) % 1);
        phase = easeOutExpo(phase, 0, 1, 1);
        const h = phase * -300 + 300;
        fill(239, phase * 255);
        stroke(0, phase * 255);
        translate(x, h, y);
        box(boxSize);
        pop();
      }
    }
  }
}
