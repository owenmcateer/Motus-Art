/**
 * Motus: Abstract noise
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const colour = {};
let counter = 120;


function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
  background(20);
  frameRate(30);

  colour.pink = color(209, 49, 222, 20);
  colour.green = color(49, 222, 209, 20);
}


function draw() {
  const phase = map(sin((frameCount / 100) - HALF_PI), -1, 1, 0, 1);
  stroke(lerpColor(colour.pink, colour.green, phase));
  strokeWeight(2);

  // Draw points
  for (let x = 0; x < canvasSize; x++) {
    const y = (canvasSize * 0.9) * noise(x / 100, frameCount / 100) + (canvasSize * 0.1);
    point(x, y);
  }

  counter++;
  if (counter < 30) {
    // Fade out
    background(20, (counter / 30) * 255);
  }
  else if (counter > 30 * 30) {
    // Reset
    counter = 0;
  }
}
