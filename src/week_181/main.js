/**
 * Interlaced pills
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
const pills_x = 16;
const pills_y = 5;
const pill_size_w = 7;
const pill_size_h = 75;
let pill_gap_x;

// Setup
function setup() {
  createCanvas(540, 540, WEBGL);
  pill_gap_x = width / pills_x - 4;
}

// Draw tick
function draw() {
  background(39);
  translate((pills_x - 1) * -0.5 * pill_gap_x, (pills_y - 1) * -0.5 * pill_size_h);

  fill(239);
  noStroke();

  const t = frameCount * -0.03;
  for (let y = 0; y < pills_y; y++) {
    for (let i = 0; i < pills_x; i++) {
      push();
      translate(i * pill_gap_x, y * pill_size_h * 1.1);
      rotateX(t + i * 0.1 + y * HALF_PI);
      cylinder(pill_size_w, pill_size_h, 12, 1);
      translate(0, pill_size_h * 0.5);
      sphere(pill_size_w, 12, 8);
      translate(0, -pill_size_h);
      sphere(pill_size_w, 12, 8);
      pop();
    }
  }
}
