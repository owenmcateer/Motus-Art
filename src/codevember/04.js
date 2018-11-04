/**
 * Motus: #codevember 04 Sunset Sky
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;

let canvasSky;
let canvasSea;
let sun;
let sunY = 0;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours
  colours.black = [0];
  colours.skyTop = [147, 82, 127];
  colours.skyBottom = [245, 130, 132];
  colours.skyBottom = [245, 130, 132];
  colours.seaTop = [198, 109, 144];
  colours.seaBottom = [67, 33, 73];
  colours.sunInner = [255, 213, 170];
  colours.sunOuter = [255, 180, 174];

  canvasSky = gradient(width, cx, colours.skyTop, colours.skyBottom);
  canvasSea = gradient(width, cx, colours.seaTop, colours.seaBottom);
  sun = radialGradient(cx, cx, 600, 600, colours.sunInner, colours.sunOuter);
}
// Draw tick
function draw() {
  background(255);

  image(canvasSky, 0, 0);
  image(sun, 0, sunY);
  image(canvasSea, 0, cx);

  fill(...colours.black, map(sunY, 0, sun.height / 3, 0, 0.2));
  rect(0, 0, width, height);
  sunY += 0.2;
  if (sunY > sun.height / 3) {
    sunY = 0;
  }
}

function gradient(w, h, c1, c2) {
  const img = createGraphics(w, h);
  // Draw gradient
  img.noFill();
  for (let i = 0; i <= h; i++) {
    const inter = i / h;
    const c = lerpColor(color(...c1), color(...c2), inter);
    img.stroke(c);
    img.line(0, i, w, i);
  }
  return img;
}

function radialGradient(x, y, w, h, inner, outer) {
  const img = createGraphics(w * 2, h * 2);
  img.ellipseMode(CENTER);
  img.noStroke();
  for (let i = Math.max(w, h); i > 0; i--) {
    const step = i / Math.max(w, h);
    const colour = lerpColor(color(...inner), color(...outer), step);
    img.fill(colour);
    img.ellipse(x, y, step * w, step * h);
  }
  return img;
}
