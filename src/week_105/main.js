/**
 * Motus: Worley spikes
 *
 * Using Worley noise in a 3D space to control
 * the spike height on each point on the grid
 * with some added noise.
 * It's also a seamless pingpong loop.
 */
const canvasSize = 540;
const gridCount = canvasSize / 20;
const gridSize = Math.floor(canvasSize / gridCount);
const poi = [];
const scanDistance = 100;
let timer = 0;
const speed = 0.015;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
  frameRate(30);

  // Create random POI in 3D space
  for (let i = 0; i < 12; i++) {
    poi.push(createVector(random(gridCount), random(gridCount), random(gridCount)));
  }
}

// Draw tick
function draw() {
  background(229);
  stroke(160);
  noFill();
  strokeWeight(3);

  // Draw grid
  for (let y = 0; y < gridCount + 1; y++) {
    beginShape();
    for (let x = 0; x < gridCount + 1; x++) {
      // Get Z pos and compare POIs
      const distances = [];
      const z = map(sin(timer), -1, 1, 0, gridCount);
      poi.forEach((p) => {
        distances.push(dist(x, y, z, p.x, p.y, p.z));
      });

      // Order and pick first two.
      sort(distances);
      const [d0, d1] = distances;

      // Caluate height
      const cap = constrain(d0 * d1, 0, scanDistance);
      let heightOffset = map(scanDistance - cap, 0, scanDistance, 0, gridSize);

      // X Offset
      if (x % 2 === 0) {
        heightOffset *= -1;
      }

      // Add noise
      heightOffset *= sin((timer * 6) + y + x);

      // Add vertex
      vertex(x * gridSize, y * gridSize + heightOffset);
    }
    endShape();
  }

  // Timer
  timer += speed;
  if (timer >= TWO_PI) {
    timer = 0;
  }
}
