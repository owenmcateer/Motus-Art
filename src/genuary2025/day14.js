/**
 * Genuary 2025: Day 14
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */

let canvasScale = 1;
let circleMath;
const cubeDensity = 11.3;
const cubes = [];
let boxSize;

function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));

  // Update canvas scale
  canvasScale = width / 1080;

  // Circle math
  circleMath = new CircleMath();

  // Create cubes
  const radius = circleMath.radius;
  boxSize = radius / cubeDensity;
  for (let y = -radius; y <= radius; y += boxSize) {
    for (let x = -radius; x <= radius; x += boxSize) {
      if (dist(0, 0, x, y) <= radius) {
        cubes.push({ x, y, dist: dist(0, 0, x, y) });
      }
    }
  }

  // Order cubes by distance from center
  cubes.sort((a, b) => a.dist - b.dist);
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  canvasScale = width / 1080;
}

function draw() {
  scale(canvasScale);
  background(0);

  const t = frameCount * 0.1;
  translate(1080 / 2, 1080 / 2);
  rectMode(CENTER);

  // Circle cubes
  stroke(255);
  strokeWeight(4);
  fill(0);
  cubes.forEach((cube) => {
    push();
    let phase = ((t + random()) % 1);
    phase = (t * 0.1 + cube.dist * 0.01);
    translate(cube.x, cube.y);
    rotate(QUARTER_PI + phase);
    rect(0, 0, boxSize * 1.4);
    rect(0, 0, boxSize * 1.1);
    pop();
  });
}
