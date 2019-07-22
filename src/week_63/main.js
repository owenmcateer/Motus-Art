/**
 * Motus: Perlins Mountains
 *
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;

const points = [];
const size = 10;
const gridSize = Math.ceil((canvasSize * 0.8) / size) + 1;
const gridOffset = Math.round((canvasSize * 0.1));
const maxHeight = 300;

const noiseScale = 0.08;
let noiseOffsetX = 0;
let noiseOffsetY = 0;
let phase = 0;


function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
  frameRate(30);

  // Build grid
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      points.push({
        posX: x,
        posY: y,
        x: (x * size) + gridOffset,
        y: (y * size) + gridOffset,
        noise: 0,
      });
    }
  }
}


function draw() {
  background(40);

  // One direction
  // noiseOffsetX = frameCount * -0.3;
  // noiseOffsetY = frameCount * -0.2;

  // Loop
  // noiseOffsetX = map(cos(TWO_PI * phase), -1, 1, 500, 600) * 2;
  // noiseOffsetY = map(sin(TWO_PI * phase), -1, 1, 500, 600) * 2;
  // phase += 0.001;
  // if (phase >= 1) {
  //   phase = 0;
  // }

  // Mouse controlled
  noiseOffsetX += map(mouseX, 0, width, 1, -1);
  noiseOffsetY += map(mouseY, 0, height, -1, 1);


  // Apply noise
  points.forEach((p) => {
    p.noise = constrain(noise((p.posX - noiseOffsetX) * noiseScale, (p.posY + noiseOffsetY) * noiseScale), 0.5, 1) * maxHeight - (maxHeight / 2);
    p.noiseyY = p.y - p.noise;
  });

  // Render
  noFill();
  stroke(140);
  for (let p = 0; p < points.length; p++) {
    const thisPoint = points[p];
    const connect = points.find(p => p.posX === thisPoint.posX + 1 && p.posY === thisPoint.posY - 1);

    if (connect) {
      line(points[p].x, points[p].noiseyY, connect.x, connect.noiseyY);
    }
  }
}
