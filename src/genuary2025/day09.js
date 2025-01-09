/**
 * Genuary 2025: Day 09
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */

let canvasScale = 1;
let circleMath;

// p5 setup
function setup() {
  // Set canvas size to fit window
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));

  // Update canvas scale
  canvasScale = width / 1080;

  // Circle math
  circleMath = new CircleMath();

  frameRate(1);
  pixelDensity(1);
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  canvasScale = width / 1080;
}

// Draw tick
function draw() {
  scale(canvasScale);
  background(39);

  const cells = round(random(6, 24));
  const triHeight = (sqrt(3) / 2) * (1080 / cells);

  noStroke();
  translate(540, 540);
  rotate(random(-HALF_PI, HALF_PI));
  translate(-540, -540);

  for (let y = 0; y < cells; y += 0.5) {
    for (let x = 0; x < cells; x++) {
      let xPos = x * (1080 / cells);
      const yPos = y * triHeight * 2;
      if (y % 2 === 1) {
        xPos += (1080 / cells) / 2;
      }

      fill(random(0, 150));
      if (x % 2 === 0) {
        triangle(
          xPos, yPos,
          xPos + (1080 / cells) / 2, yPos + triHeight,
          xPos - (1080 / cells) / 2, yPos + triHeight,
        );
      } else {
        triangle(
          xPos, yPos + triHeight,
          xPos + (1080 / cells) / 2, yPos,
          xPos - (1080 / cells) / 2, yPos,
        );
      }
    }
  }

  // Add some noise
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (x + y * width) * 4;
      const noiseValue = random(-20, 20);
      pixels[index] += noiseValue;
      pixels[index + 1] += noiseValue;
      pixels[index + 2] += noiseValue;
    }
  }
  updatePixels();

  // Circle mask
  noFill();
  stroke(0);
  strokeWeight(540);
  circle(540, 540, circleMath.diameter * 1.55);
}
