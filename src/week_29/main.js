/**
 * Motus: Hue heart
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const cx = canvas / 2;
const size = 31;
let ii = 0;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(HSB);
  strokeWeight(3);
}

function draw() {
  background(0);
  const res = 200;
  // const beat = map(cos(frameCount / 20), -2, 2, 16, 23);
  const beat = easeInExpo(cos(frameCount / 30) * cos(frameCount / 6), 0, 100, 100) * 190;

  for (let i = 0; i < res; i++) {
    // Heart shape
    // The math http://mathworld.wolfram.com/HeartCurve.html
    const t = TWO_PI * (i / (res - 1));
    const x = (16 * pow(sin(t), 3));
    const y = (13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));

    // Outer lines
    const outlineX = x * size + cx;
    const outlineY = y * -size + cx - 70;

    // Inner lines (beating)
    const innerX = x * beat + cx;
    const innerY = y * -beat + cx - 30;

    // Set colours
    let hue = (i / res) + ii;
    hue = (hue * 360) % 360;
    stroke(hue, 100, 100);

    // Draw line
    line(outlineX, outlineY, innerX, innerY);
  }

  // HUE shifter
  ii += 0.002;
  if (ii > 90) {
    ii = 0;
  }
}

function easeInExpo(t, b, c, d) {
  return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
}