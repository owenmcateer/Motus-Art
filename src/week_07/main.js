/**
 * Motus: Retrowave rider
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const terrain = [];
const rows = 70;
const cols = 13;
const size = 40;

let rowPosition = 0;
let flying = 0;
const altitude = 150;
const flyingSpeed = 4;
const trench = 5;
let canvasSky;
let canvasSun;

let colours = {};

// Setup
function setup() {
  createCanvas(canvas, canvas, WEBGL);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  colours = [
    color(8, 44, 127), // Night blue
    color(0, 255, 248), // Neon blue
    color(255, 0, 253), // Neon pink
    color(0, 29, 95), // Dark blue
  ];

  // Build terrain
  for (let y = 0; y < rows; y++) {
    terrain[y] = [];
    for (let x = 0; x < cols; x++) {
      terrain[y][x] = renderTerrainPoint(x, y);
    }
    rowPosition++;
  }

  // Draw sky & sun
  canvasSky = drawSky();
  canvasSun = drawSun();
}

// Draw tick
function draw() {
  background(colours[0]);

  // Output sun
  translate(0, -400, -2000);
  texture(canvasSky);
  plane(3400, 2600);

  fill(0, 0, 0, 0);
  texture(canvasSun);
  plane(1500);
  translate(0, 400, 2000);

  // Position terrain
  rotateX(PI / 2.12);
  translate(-220, -1900);

  // Terrain styling
  fill(colours[3]);
  stroke(colours[1]);
  strokeWeight(3);

  // Draw terrain
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * size, (y * size) + flying, terrain[y][x]);
      vertex(x * size, ((y + 1) * size) + flying, terrain[y + 1][x]);
    }
    endShape();
  }

  // Flying
  flying += flyingSpeed;
  // Recycle rows?
  if (flying >= size) {
    // Reset offset
    flying = 0;
    // Remove
    terrain.pop();
    // Add new
    const newRow = [];
    for (let x = 0; x < cols; x++) {
      // Trench
      if (x >= trench - 1 && x <= trench + 2) {
        newRow.push(renderTerrainPoint(x, rowPosition));
      } else {
        newRow.push(renderTerrainPoint(x, rowPosition));
      }
    }
    terrain.unshift(newRow);
    rowPosition++;
  }
}

function renderTerrainPoint(x, y) {
  let point;

  // Middle of trench
  if (x === trench || x === (trench + 1)) {
    point = random(0, 0.2) * size;
  }
  // Trench walls
  else if (x === (trench - 1) || x === (trench + 2)) {
    point = map(noise(x, y), 0, 1, 0, 0.2) * altitude;
  }
  // The rest
  else {
    point = noise(x, y) * altitude;
  }

  return point;
}

// Draw sun
function drawSky() {
  const horizon = 1000;
  const sky = createGraphics(width, height);

  // Draw gradient sky
  sky.noFill();
  for (let i = 0; i <= horizon; i++) {
    const inter = map(i, 0, horizon, 0, 1);
    const c = lerpColor(colours[0], color(0, 0 ,0), inter);
    sky.stroke(c);
    sky.line(0, i, width, i);
  }

  // Add some stars
  sky.noStroke();
  sky.fill(255, 255, 255, random(100, 255));
  for (let i = 0; i < 100; i++) {
    sky.ellipse(random(0, 1100), random(0, 550), random(1, 5));
  }

  return sky;
}

// Draw gradient sun
function drawSun() {
  const sun = createGraphics(500, 500);
  sun.noFill();

  for (let i = 0; i <= sun.height; i++) {
    // Which colour?
    if (i % 10 >= 0 && i % 10 < 5) {
      sun.stroke(colours[2]);
    } else {
      sun.stroke(colours[3]);
    }

    // Calc colour
    const inter = map(i, 0, sun.height, 0, 1);

    // Calc circle
    const s = i * 2;
    const r = sun.width;
    const lineWidth = Math.sqrt((2 * s * r) - (s * s));
    const offset = (sun.width / 2) - (lineWidth / 2);
    sun.line(offset, i, lineWidth + offset, i);
  }
  return sun;
}
