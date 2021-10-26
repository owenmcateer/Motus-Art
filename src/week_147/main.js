/**
 * Motus: Entity Globe
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
let timer = 0;
const speed = 1 / (60 * 30 * 6);
let bgImg;

const entitySizeMin = 2;
const entitySizeMax = 3;
const globeRadius = canvasSize * 0.9;
const globeEntities = 1200;

function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);
  bgImg = createGraphics(width, height);
  drawBG();
}

function draw() {
  // Styles
  background(39);
  noStroke();
  fill(239);
  image(bgImg, 0, 0);
  translate(-entitySizeMax, height - globeRadius);

  // Render globe
  for (let i = 0; i < globeEntities; i++) {
    const entityNoise = noise(i * i);
    const timing = (entityNoise * TWO_PI) + (timer * PI);
    const yPlacement = seededRandom(i);
    const y = yPlacement * globeRadius;

    const s = yPlacement;
    const xCurve = sqrt(2 * s - s * s);

    const x = sin(timing % PI) * xCurve;
    const sizeZ = (cos(timing % PI) + 1) / 2;
    let sizePulse = 1;
    let colourPulse = 0.6;

    if (seededRandom(i * i) > 0.4) {
      sizePulse = map(sin(timer * PI * 150 + i), -1, 1, 0.6, 1.5);
      colourPulse = map(sin(timer * PI * 150 + i), -1, 1, 0.4, 1);
    }
    let size = sizeZ * entitySizeMax + entitySizeMin;
    size *= sizePulse;

    // Colour (front/back)
    if (sizeZ < 0.5) {
      fill(map(sizeZ, 0.5, 0, 255, 150), colourPulse);
    }
    else {
      fill(255, colourPulse);
    }

    // Draw
    ellipse(x * globeRadius, y, size);
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}


// Random number from seed
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}


// Draw star field background
function drawBG() {
  for (let i = 0; i < 10000; i++) {
    bgImg.stroke(random(60, 150));
    bgImg.strokeWeight(random());
    bgImg.point(random(width), random(height));
  }
}
