/**
 * Motus: Biennial/Perennial 🌼
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;
const outerDots = 9;
let offset = 0;
let canvasBg;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours
  colours.bgTop = [241, 112, 132];
  colours.bgBottom = [15, 112, 127];
  colours.dots2 = [320, 204, 182];
  colours.dots1 = [238, 132, 48];

  // Draw background gradient
  canvasBg = drawBackground();
}

// Draw tick
function draw() {
  background(colours.bgTop);
  image(canvasBg, 0, 0);

  const glow = map(sin(frameCount / 50), -1, 1, 1, 1.3);

  for (let o = outerDots; o > 0; o--) {
    const num = Math.floor(o * 5);
    const radius = o * 60;
    let offsetPos = offset * ((outerDots - o) * 0.1);
    if (o % 2 === 0) {
      offsetPos *= -1;
    }
    const size = (140 * ((outerDots - o) * 0.05)) * glow;
    const fillColor = lerpColor(color(...colours.dots1), color(...colours.dots2), o / outerDots);

    for (let i = 0; i < num; i++) {
      noStroke();
      const angle = ((360 / num) * i) + offsetPos;
      const pointX = (cos(radians(angle)) * radius) + (cx - radius);
      const pointY = (sin(radians(angle)) * radius) + (cx - radius);
      fill(0, 0, 0, 0.1);
      ellipse(pointX + radius + 4, pointY + radius + 4, size, size);

      fill(fillColor);
      ellipse(pointX + radius, pointY + radius, size, size);
    }
  }

  offset += 0.5;
}

function drawBackground() {
  const bg = createGraphics(width, height);
  bg.background(colours.bgTop);

  // Draw gradient
  bg.noFill();
  for (let i = 0; i <= height; i++) {
    const inter = map(i, 0, height, 0, 1);
    const c = lerpColor(color(...colours.bgTop), color(...colours.bgBottom), inter);
    bg.stroke(c);
    bg.line(0, i, width, i);
  }
  return bg;
}
