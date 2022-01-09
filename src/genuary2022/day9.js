/**
 * Genuary Day 9
 * "Architecture"
 *
 * @motus_art
 */
let timer = 0;
const speed = 0.004;
let grain;

function setup() {
  createCanvas(540, 540);
  grain = grainTexture();
}

function draw() {
  background(0);

  // BG
  fill(0);
  const bgTexture = drawingContext.createLinearGradient(0, 0, width, 0);
  bgTexture.addColorStop(0, 'rgba(25, 25, 30, 1)');
  bgTexture.addColorStop(0.5, 'rgba(155, 150, 155, 1)');
  bgTexture.addColorStop(1, 'rgba(25, 25, 30, 1)');
  drawingContext.fillStyle = bgTexture;
  rect(0, 0, width, height);

  // Lines
  blendMode(OVERLAY);
  stroke(200);
  strokeWeight(1);
  for (let i = -1; i < 10; i++) {
    const x1 = 0;
    const y1 = map((i / 10) + (timer * 2) / 10, 0, 1, -height, height * 2);
    const x2 = width / 2;
    const y2 = map((i / 10) + (timer * 2) / 10, 0, 1, 0, height);
    line(x1, y1, x2, y2);
    line(x2, y2, width, y1);
  }

  // V-lines
  stroke(160);
  for (let i = 0; i < 10; i++) {
    const x = easeOutQuad((i / 10) - (timer / 10), 0, 1, 1) * (width / 2);
    line(x, 0, x, height);
    line(width - x, 0, width - x, height);
  }

  // Center line
  stroke(200);
  strokeWeight(4);
  line(width / 2, 0, width / 2, height);

  // Grain overlay
  blendMode(OVERLAY);
  translate(0, timer * ((height * 2) / 10) - height / 2);
  image(grain, 0, 0);
  blendMode(BLEND);

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}


function grainTexture() {
  const grainGfx = createGraphics(width, height * 2);
  const d = pixelDensity();
  grainGfx.loadPixels();
  for (let i = 0; i < width * d * height * 2 * d * 4; i += 4) {
    grainGfx.pixels[i] = grainGfx.pixels[i + 1] = grainGfx.pixels[i + 2] = random(200);
    grainGfx.pixels[i + 3] = 255 * 0.1;
  }

  grainGfx.updatePixels();

  return grainGfx;
}


function easeOutQuad(t, b, c, d) {
  return -c *(t/=d)*(t-2) + b;
}
