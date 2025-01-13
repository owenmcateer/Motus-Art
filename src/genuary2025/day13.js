/**
 * Genuary 2025: Day 13
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let t = 0;
const maxDepth = 15;
const startingTriangles = 64;

// p5 setup
function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
}

// Draw tick
function draw() {
  background(0);
  fill(239);
  noStroke();
  translate(width / 2, height / 2);

  // Timing
  t = frameCount * 0.005;
  const radius = width * 0.42;

  // Draw the first triangle ring
  sawtooth(radius, startingTriangles);
}

/**
 * Swirling wheel of triangles
 *
 * @param {float} radius
 * @param {int} numTriangles
 * @param {int} depth
 */
function sawtooth(radius, numTriangles, depth = 0) {
  if (depth > maxDepth) return;
  const angleStep = TWO_PI / numTriangles;

  const triangleHeight = dist(
    cos(0) * radius, sin(0) * radius, cos(angleStep) * radius,
    sin(angleStep) * radius,
  );

  // Timing offset
  let tt = t;
  if (depth % 2 === 0) {
    tt *= -1;
    tt += HALF_PI;
  }

  // Draw the triangles
  beginShape(TRIANGLES);
  for (let i = 0; i < numTriangles; i++) {
    const angle1 = i * angleStep + tt;
    const angle2 = (i + 1) * angleStep + sin(tt);

    const x1 = cos(angle1) * radius;
    const y1 = sin(angle1) * radius;
    const x2 = cos(angle2) * radius;
    const y2 = sin(angle2) * radius;
    const angle3 = angle1 + angleStep / 2;
    const x3 = cos(angle3) * (radius + triangleHeight);
    const y3 = sin(angle3) * (radius + triangleHeight);

    vertex(x1, y1);
    vertex(x2, y2);
    vertex(x3, y3);
  }
  endShape(CLOSE);

  sawtooth(radius - triangleHeight, round(numTriangles * 0.9), depth + 1);
}
