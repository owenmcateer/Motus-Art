/**
 * Motus: Lofi Mountains
 */
const canvasSize = 540;
let timer = 0;
const speed = 370;
const sunSpeed = speed * 2;
let overlayGrad;
const levels = [
  [205, 38, 55],
  [207, 46, 53],
  [209, 48, 47],
  [211, 57, 34],
];


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(30);
  colorMode(HSL, 360, 100, 100, 1);
  noiseSeed(12345);
  pixelDensity();

  overlayGrad = linearGradient(width, height, [0, 0, 0, 0.1], [0, 0, 0, 0.2], 'y');
}


// Draw tick
function draw() {
  // Timer
  timer = cos(frameCount / sunSpeed);
  timer = map(timer, -1, 1, 1, 0);
  const dusk = map(timer, 0, 1, 1, 0.5);
  background(203, 29, 71 * dusk);

  // Stars
  stroke(0, 100, 100, map(timer, 0, 1, 0, 0.3));
  strokeWeight(2);
  randomSeed(1);
  for (let i = 0; i < 100; i++) {
    point(random(width), random(250));
  }

  // Sun
  noStroke();
  fill(342, 66, 84);
  ellipse(
    cos((frameCount / sunSpeed) - HALF_PI) * 130 + 120,
    sin((frameCount / sunSpeed) - HALF_PI) * 100 + 200,
    150,
  );

  // Mountains
  for (let j = 0; j < levels.length; j++) {
    noiseDetail(4, 0.3);
    fill(levels[j][0], levels[j][1], levels[j][2] * dusk);

    beginShape();
    vertex(width, height);
    vertex(0, height);

    const jScale = map(j, 0, levels.length - 1, 100, 250);
    const jSpeed = (frameCount / speed) * map(j, 0, levels.length - 1, 0.5, 6);

    // Noisey peeks
    for (let i = 0; i <= width; i += 5) {
      vertex(i, noise((i / jScale) + jSpeed, j * 10) * 200 + (j * 80) + 100);
    }
    endShape(CLOSE);
  }

  // Gradient overlay
  image(overlayGrad, 0, 0);
}


/**
 * Renders a linear gradient.
 *
 * @param {Number} w            Width
 * @param {Number} h            Height
 * @param {Color}  c1           Start colour
 * @param {Color}  c2           End colour
 * @param {axis}   axis         x/y
 *
 * @return {graphic} gfx        p5 Graphic
 */
function linearGradient(w, h, c1, c2, axis) {
  // Create graphic
  const gfx = createGraphics(w, h);
  gfx.noFill();

  // Y axis, Top to bottom gradient
  if (axis === 'y') {
    for (let i = 0; i <= h; i++) {
      const inter = map(i, 0, h, 0, 1);
      const c = lerpColor(color(...c1), color(...c2), inter);
      gfx.stroke(c);
      gfx.line(0, i, w, i);
    }
  }
  // X axis, Left to right gradient
  else if (axis === 'x') {
    for (let i = 0; i <= w; i++) {
      const inter = map(i, 0, w, 0, 1);
      const c = lerpColor(color(...c1), color(...c2), inter);
      gfx.stroke(c);
      gfx.line(i, 0, i, h);
    }
  }

  // Return gradient
  return gfx;
}
