/**
 * Motus: Vaporsun
 * https://owenmcateer.github.io/Motus-Art
 */

// Settings
const canvas = 1080;
const colours = [];
const cx = canvas / 2;
const sunSize = 900;
const sunOffset = (canvas - sunSize) / 2;
const sunBar = 48;
const sunGap = 24;

let movement = 0;
let palmTree;
let bgGlow;

// Preload
function preload() {
  palmTree = loadImage('../assets/img/week_28/palm-tree.svg');
}

// Setup
function setup() {
  frameRate(6);
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours
  colours.bg = [18, 19, 22, 0.1];
  colours.sunTop = [160, 16, 255, 0.9];
  colours.sunBottom = [255, 16, 170, 0.9];
  colours.glow = [130, 16, 112, 0.2];
  colours.glowBg = [18, 19, 22];

  // Setup background
  background(colours.glowBg);

  // BG glow
  bgGlow = createGraphics(canvas, canvas);
  radialGradient(bgGlow, bgGlow.width, bgGlow.height, color(...colours.glow), color(colours.glowBg));
}


// Draw tick
function draw() {
  background(colours.bg);

  // Background glow
  image(bgGlow, 0, 0);

  // Sun
  noFill();
  for (let i = 0; i <= sunSize; i++) {
    // Which colour?
    if ((i + sunBar + movement) % sunBar > sunGap) {
      continue;
    }

    // Calc colour
    const colour = lerpColor(color(...colours.sunTop), color(...colours.sunBottom), i / sunSize);
    stroke(colour);

    // Calculate circle
    const s = i * 2;
    const r = sunSize;
    const lineWidth = Math.sqrt((2 * s * r) - (s * s));
    const offset = cx - (lineWidth / 2);
    const y = i + sunOffset;

    // Draw line
    line(offset, y, lineWidth + offset, y);
  }

  // Movement
  movement -= 0.5;
  if (movement <= sunBar * -1) {
    movement = 0;
  }

  // Palm tree
  fill(colours.bg);
  image(palmTree, 180, 210, 710, 1068);
}

/**
 * Renders a radial gradient.
 *
 * @param {graphic} gfx         p5 Graphic
 * @param {Number} w            width
 * @param {Number} h            height
 * @param {Color} inner         Inner colour
 * @param {Color} outer         Outer colour
 */
 function radialGradient(gfx, w, h, inner, outer) {
  gfx.noStroke();
  for (let i = Math.max(w, h); i > 0; i--) {
    const step = i / Math.max(w, h);
    const colour = lerpColor(inner, outer, step);
    const x = w / 2;
    const y = h / 2;
    gfx.fill(colour);
    gfx.ellipse(x, y, step * w, step * h);
  }
}
