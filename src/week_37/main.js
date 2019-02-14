/**
 * Motus: Sine of love
 * https://owenmcateer.github.io/Motus-Art
 *
 * Inspired by and maths from https://www.desmos.com/calculator/uxkyzzweb5
 */
const canvas = 1080;
const colours = {};
const cx = canvas / 2;

const heartSize = 240;

// Store previous points
let oxx = 0;
let oyy = 0;
let a;
let bg;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  colorMode(RGB, 255, 255, 255, 1);

  //  Colours
  colours.bgInner = [238, 167, 203];
  colours.bgOuter = [246, 211, 229];
  colours.heart = [150, 10, 10];

  // Render BG
  bg = radialGradient(width, height, colours.bgInner, colours.bgOuter);
}


// Draw tick
function draw() {
  // Background
  background(...colours.bgOuter);
  image(bg, 0, 0, width, height);

  // Heart styles
  strokeWeight(20);
  stroke(...colours.heart);
  strokeCap(ROUND);

  // Heart loop
  a = sin(frameCount / 120) * 20;
  for (let x = -1.8; x <= 1.8; x += 0.01) {
    graph(x);
  }
}

/**
 * Plot graph
 *
 * @param {int} x
 */
function graph(x) {
  // The maths
  // f = abs(x).^(2/3)+ 0.9*sqrt(abs(3.3 -x.^2)).*sin(a*3.14.*x);
  const f = pow(abs(x), 2 / 3) + 0.9 * sqrt(abs(3.3) - pow(x, 2)) * sin(a * PI * x);

  // Calculate position
  const xx = (x * heartSize) + cx;
  const yy = ((1.8 - f) * heartSize) + heartSize;

  // Don't draw first line
  if (x !== -1.8) {
    line(oxx, oyy, xx, yy);
  }

  // Update previous points
  oxx = xx;
  oyy = yy;
}

/**
 * Renders a radial gradient.
 *
 * @param {Number} w            width
 * @param {Number} h            height
 * @param {Color} inner         Inner colour
 * @param {Color} outer         Outer colour
 */
function radialGradient(w, h, inner, outer) {
  const gfx = createGraphics(w, h);
  gfx.noStroke();
  for (let i = Math.max(w, h); i > 0; i--) {
    const step = i / Math.max(w, h);
    const colour = lerpColor(color(...inner), color(...outer), step);
    gfx.fill(colour);
    gfx.ellipse(w / 2, h / 2, step * w, step * h);
  }
  return gfx;
}
