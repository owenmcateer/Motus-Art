/**
 * Motus: Entity cycle
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;

const waveHeight = canvas / 6;
const numLines = 6;
const speed = -50;
const segments = 6;
const segmentWidth = (canvas / segments) + 20;
let prevX;
let prevY;


function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  // noiseSeed(12345678);

  // Colours
  colours.bg = [37, 39, 28];
  colours.line = [255];
}

function draw() {
  background(...colours.bg);
  stroke(...colours.line);
  strokeWeight(3);

  // Reset previous
  prevX = 0;
  prevY = 0;

  // Lines
  for (let ii = 0; ii < numLines; ii++) {
    stroke(map(noise(ii * 50), 0, 1, 50, 255));

    // Loop segments
    for (let i = 0; i <= segments; i++) {
      const x = i * segmentWidth;
      const sinPos = sin((frameCount / speed) + i * 1.2);
      const y = (sinPos * waveHeight) + cx;

      // Generate noise
      const noiseX = noise(x, ii) * 100 - 100;
      const noiseY = noise(x, ii) * 160;

      // Don't draw first segment
      if (i !== 0) {
        line(
          prevX,
          prevY,
          x + noiseX,
          y + noiseY,
        );
      }

      // Set previous vectors
      prevX = x + noiseX;
      prevY = y + noiseY;
    }
  }
}
