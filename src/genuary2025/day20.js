/**
 * Genuary 2025: Day 02
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let gridSize = 20;
let xOffset = 0;
const s = 200;

// p5 setup
function setup() {
  createCanvas(540, 540, WEBGL);
}

// Draw tick
function draw() {
  background(39);
  stroke(239);
  strokeWeight(4);
  noFill();

  const t = frameCount * 0.03;
  const movement = (t % 1);
  const noiseInit = floor(t);

  // Camera
  rotateX(0.1);
  translate(0, 130, movement * s);
  translate(0, 0, (gridSize / -1.21) * s);

  for (let y = 0; y < gridSize; y++) {
    for (let x = -4; x < 4; x++) {
      push();
      translate(x * s, 0, y * s);

      if (x === 0) {
        fill(39);
        stroke(239);
        rotateX(HALF_PI);
        plane(s);
      } else {
        buildBuilding(x, y, 0, noiseInit, movement);
      }
      pop();
    }
  }

  // Circle mask
  resetMatrix();
  noFill();
  stroke(0);
  strokeWeight(80);
  translate(0, 0, (gridSize * 0.17) * s);
  circle(0, 0, width * 0.29);
}

// Building function
function buildBuilding(seedX, seedY, seedDepth, noiseInit, movement) {
  const noiseValue = noise(seedX + 123, seedY - noiseInit);
  const distance = map(seedY + movement, 0, gridSize, 0, 1);
  const gray = map(noiseValue, 0, 1, 0, 40);
  fill(gray * distance + 39);
  stroke(map(distance, 0, 1, 39, 239));

  const buildingSize = noiseValue * s * map(seedDepth, 0, 3, 1, 0.7);
  const buildingHeight = noiseValue * s * map(seedDepth, 0, 3, 1, 8);

  // box(buildingSize, buildingSize*8, buildingSize);
  box(buildingSize, buildingHeight, buildingSize);

  if (seedDepth < 5 && noiseValue > 0.45) {
    buildBuilding(seedX, seedY, seedDepth + 1, noiseInit, movement);
  }
}