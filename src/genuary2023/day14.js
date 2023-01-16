/**
 * Genuary 2023: Day 14
 * "Aesemic"
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
const rez = 4;
let charScale;
let gridCount;
let gridGap;
let writtingDir;
let progress = 0;
let seed;

// Setup
function setup() {
  createCanvas(1080, 1080);

  // Settings
  writtingDir = floor(random(4));
  gridCount = round(random(10, 30));
  gridGap = width / (gridCount + 2);
  charScale = gridGap * 0.8;
  seed = random(1000000);
}

// Draw tick
function draw() {
  progress = 0;
  randomSeed(seed);
  // Styles
  background(39);
  stroke(239);
  noFill();

  // Rotate writting direction
  translate(width / 2, height / 2);
  rotate(HALF_PI * writtingDir);

  // Re-position
  translate(width / -2, height / -2);
  translate(gridGap, gridGap);

  // Set stroke weight
  strokeWeight(map(gridCount, 10, 30, 5, 2));

  // Write
  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < random(gridCount * 0.4, gridCount); y++) {
      // Animate
      progress++;
      if (progress > frameCount) break;

      // Draw char
      push();
      translate(x * gridGap, y * gridGap);
      drawChar();
      pop();
    }
  }
}

// Draw a single character
function drawChar() {
  const lines = round(random(2, 4));

  for (let l = 0; l < lines; l++) {
    const charDetail = round(random(3, 6));
    beginShape();
    for (let i = 0; i < charDetail; i++) {
      const pos = floor(random(rez * rez));
      const y = (floor(pos / rez)) / rez;
      const x = (pos % rez) / rez;
      curveVertex(x * charScale, y * charScale);
    }
    endShape();
  }
}
