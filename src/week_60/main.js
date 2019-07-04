/**
 * Motus: Balanced Dimension
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;

const cubeSize = 10;
const cubeGap = 30;
const cubeTotalSize = cubeSize * cubeGap;
const cubeMiddle = cubeTotalSize / 2;
let offset = 0;
let pluse = 0;
let counter = 0;
const zColour = [];


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  smooth();
  pixelDensity(2);

  // Pre-calculate Z-axis colours
  for (let z = 0; z < cubeSize; z++) {
    zColour[z] = (easeInCirc((z + 1) / cubeSize, 0, 1, 1) * 215);
  }
}


// Draw
function draw() {
  background(40);

  offset = (cubeGap * 2) * counter;
  pluse = map(sin(PI * counter), -1, 1, 0, 1);

  // Center camera
  translate((cubeMiddle * -2) + offset, (cubeMiddle * -2) + (cubeGap * 0.5) + (offset / 2), -40);

  // Build matrix
  for (let x = 0; x < cubeSize * 2; x++) {
    for (let y = 0; y < cubeSize * 2; y++) {
      for (let z = 0; z < cubeSize; z++) {
        // Style
        stroke((zColour[z] * pluse) + 40);
        strokeWeight(map(z, 0, cubeSize, 4, 26));
        // Position
        push();
        translate(x * cubeGap, y * cubeGap, z * cubeGap);
        point(0, 0, 0);
        pop();
      }
    }
  }

  // Counter
  counter += 0.03;
  if (counter >= 1) {
    counter = 0;
  }
}

function easeInCirc(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
}
