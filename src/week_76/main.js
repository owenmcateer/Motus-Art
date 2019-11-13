/**
 * Motus Art: Breadthless Length
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;

let timer = 0;
const speed = 0.0015;
let distance;
let gapX;
let gapY;
const gridSize = 140;
const xOffset = -(gridSize * 2);
const yOffset = canvasSize + gridSize;
const size = gridSize * 0.35;
let entity;


function setup() {
  createCanvas(canvasSize, canvasSize);
  angleMode(DEGREES);
  pixelDensity(2);

  // X&Y gap
  gapX = cos(330) * gridSize;
  gapY = sin(330) * gridSize * 1.5;

  // Entity spacing
  const space = size / 1.6;
  entity = {
    e: {
      a: 210,
      x: cos(291) * space,
      y: sin(291) * space,
    },
    f: {
      a: 330,
      x: cos(51) * space,
      y: sin(51) * space,
    },
    g: {
      a: 90,
      x: cos(171) * space,
      y: sin(171) * space,
    },
  };
}


function draw() {
  background(40);
  distance = timer * (gridSize * 1.5);

  // Styling
  const fillCol = map(sin((timer * 6) * 360), 1, -1, 140, 180);
  fill(fillCol);
  noStroke();

  // Build grid
  for (let a = 0; a < 10; a++) {
    for (let b = 0; b < 10; b++) {
      // Grid position
      const by = b * gapY;
      let ax = a * gapX;
      if (b % 2 === 0) {
        ax = a * gapX + (gapX / 2);
      }

      // Entities
      // e
      let x = (cos(entity.e.a) * distance) + ax + entity.e.x + xOffset;
      let y = (sin(entity.e.a) * distance) + by + entity.e.y + yOffset;
      ellipse(x, y, size);
      // f
      x = (cos(entity.f.a) * distance) + ax + entity.f.x + xOffset;
      y = (sin(entity.f.a) * distance) + by + entity.f.y + yOffset;
      ellipse(x, y, size);
      // g
      x = (cos(entity.g.a) * distance) + ax + entity.g.x + xOffset;
      y = (sin(entity.g.a) * distance) + by + entity.g.y + yOffset;
      ellipse(x, y, size);

      // Central point
      // ellipse(ax, by+height, 2);
    }
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}
