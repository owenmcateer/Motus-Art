/**
 * Genuary Day 17
 * "3 colors"
 *
 * @motus_art
 */

const canvasSize = 540;
const pixel = 82;
const gap = 8;
const led = (pixel / 3) - gap;
const plasmaScale = 2;
let lcdWidth;
let lcdHeight;

// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);

  lcdWidth = Math.ceil(width / pixel);
  lcdHeight = Math.ceil(height / pixel);

  noStroke();
}

function draw() {
  background(20);

  // Phase
  const phase = millis() * 0.005;

  // Loop X&Y
  for (let y = 0; y < lcdHeight; ++y) {
    for (let x = 0; x < lcdWidth; ++x) {
      // Plasma color
      const hue = phase * 8.0
        + y / (plasmaScale * 0.5)
        + 8.0 * sin(phase + y / (plasmaScale * 4.0)
        + 4.0 * sin(phase + x / (plasmaScale * 8.0)
        + 0.5 * sin(phase + y / (plasmaScale * 4.0))));

      // Get pixel colour
      colorMode(HSB, 255);
      const c = color(hue % 255, 255, 255);
      colorMode(RGB, 255);
      drawPixel(x, y, [red(c), green(c), blue(c)]);
    }
  }
}


function drawPixel(x, y, c) {
  // Cap lowest levels
  for (let l = 0; l < c.length; l++) {
    c[l] = Math.max(90, c[l]);
  }

  // Draw leds
  drawLed(x, y, 0, [c[0], 0, 0]);
  drawLed(x, y, 1, [0, c[1], 0]);
  drawLed(x, y, 2, [0, 0, c[2]]);
}

// Draw each pixel LED
function drawLed(x, y, l, val) {
  const posX = ((pixel + gap) * x) + gap;
  const posY = ((pixel + gap) * y) + ((led + gap) * l);

  fill(...val);
  rect(posX, posY + gap, pixel - gap, led, 4);
}
