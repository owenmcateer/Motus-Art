/**
 * Motus: Pastel Rings
 *
 * https://owenmcateer.github.io/Motus-Art
 */
let rings = [];

// Setup
function setup() {
  createCanvas(540, 540);
  pixelDensity(2);
  colorMode(HSB, 360, 100, 100, 1);
  background(0);
}

// Draw tick
function draw() {
  background(0, 0.075);
  stroke(239);
  noFill();

  // Add ring
  if (frameCount % 10 === 0 && frameCount < 60*9) {
    rings.push(new Ring());
  }

  // Render blips
  rings.forEach((r) => {
    r.update();
    r.render();
  });

  // Remove offscreen blips
  rings = rings.filter((r) => r.size < width * 3);
}
