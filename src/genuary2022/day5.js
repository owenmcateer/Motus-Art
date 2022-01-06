/**
 * Genuary Day 5
 * "Destroy a square"
 *
 * @motus_art
 */
let grainy;
const margin = 40;

function setup() {
  createCanvas(540, 540);

  grainy = grainTexture();
  frameCount = 110;
}

function draw() {
  background(39);
  stroke(239);
  strokeWeight(1);

  const angleAmount = (sin(frameCount / 30) + 0.9) * TWO_PI * 1.5;
  for (let a = 0; a < angleAmount; a += TWO_PI / 300) {
    const aa = a - HALF_PI;
    const x = constrain(cos(aa) * width + (width / 2), margin, width - margin);
    const y = constrain(sin(aa) * height + (height / 2), margin, height - margin);

    line(width / 2, height / 2, x, y);
  }

  // blendMode(OVERLAY);
  image(grainy, 0, 0);
}


function grainTexture() {
  const grain = createGraphics(width, height);
  const d = pixelDensity();
  grain.loadPixels();
  for (let i = 0; i < width * d * height * d * 4; i += 4) {
    grain.pixels[i] = grain.pixels[i + 1] = grain.pixels[i + 2] = random(200);
    grain.pixels[i + 3] = 255 * 0.2;
  }

  grain.updatePixels();
  return grain;
}
