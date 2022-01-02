/**
 * Genuary Day 1
 * "Draw 10,000 of something."
 *
 * 10,000 radiating circles with void.
 * @motus_art
 */
const centralVoid = 55;

function setup() {
  createCanvas(540, 540);
  colorMode(RGB, 255, 255, 255, 1);

  background(0);
  translate(width / 2, height / 2);
  noFill();
  strokeWeight(1);

  // Circles
  for (let i = 0; i < 10000; i++) {
    const p = random();
    const r = p * (width);
    const x = (random() - 0.5) * 2 * 100 * p;
    const y = (random() - 0.5) * 2 * 100 * p;
    stroke((1 - p) * 255, 0.05);
    ellipse(x, y, r);
  }

  // Draw the void
  fill(0);
  noStroke();
  ellipse(0, 0, centralVoid * 1.1);
}
