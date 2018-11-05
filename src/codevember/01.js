/**
 * Motus: #codevember - 1 - Infinity
 * https://owenmcateer.github.io/Motus-Art
 *
 * https://en.wikipedia.org/wiki/Lissajous_curve
 * a = 1, b = 2 (1:2)
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;
let t;
const a = 1;
const b = 2;
const scale = canvas / 4.5;
const offset = cx;
const size = 100;

const steps = 4;
const speed = 0.1;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(HSB);

  // Colours
  colours.bg = [0];
  colours.line = [100];

  background(colours.bg);

  // Init
  t = 1;
  fill(colours.line);
  noStroke();
}

// Draw tick
function draw() {
  // Step loop
  for (let s = 0; s < steps; s++) {
    // Overlay for fade
    background(0, 0.03);

    // Colour
    const tt = t % (PI * 4);
    fill((tt / (PI * 4)) * 360, 100, 100);

    // Formula from https://en.wikipedia.org/wiki/Lissajous_curve
    // a = 1, b = 2 (1:2)
    const x = b * sin(t / b + PI);
    const y = sin(t / a);

    // Draw dot
    ellipse(x * scale + offset, y * scale + offset, size, size);

    // Increase counter
    t += (speed / steps);
  }
}
