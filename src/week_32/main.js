/**
 * Motus: Hidden patterns
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;

const rings = 20;
let rotateCount = -0.08;
const speed = Math.PI / 2000;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours
  colours.bg = [229, 228, 219];
  colours.dots = [70, 75, 81];

  // Base BG
  background(...colours.bg);
}

// Draw tick
function draw() {
  background(...colours.bg, 0.4);
  noStroke();
  translate(cx, cx);

  // Add rings
  for (let r = rings; r > 0; r--) {
    fill(...colours.dots, map(r, 0, rings, 0.8, 0.4));

    // Rotate and draw
    rotate(rotateCount);
    const pos = (r * 25) - 35;
    const dots = (r * 3) - 3;

    for (let d = 0; d < dots; d++) {
      const angle = d * (TWO_PI / dots);
      const x = cos(angle) * pos;
      const y = sin(angle) * pos;
      ellipse(x, y, 15, 15);
    }
  }

  // Increment speed
  rotateCount += speed;
}
