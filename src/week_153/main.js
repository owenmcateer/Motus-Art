/**
 * Motus: Night Ocean
 * https://owenmcateer.github.io/Motus-Art
 */
// Config
const randomSeedFloat = Math.random() * 10000;
const waves = {
  yOffset: 200,
  count: 9,
  stroke: {
    min: 0.5,
    max: 12,
  },
};

// Setup
function setup() {
  createCanvas(540, 540);
  pixelDensity(2);
  frameRate(30);
}

// Draw tick
function draw() {
  background(39);
  randomSeed(randomSeedFloat);

  // Stars
  for (let i = 0; i < 1000; i++) {
    strokeWeight(random(0.4, 2));
    stroke(100 + random(139));
    point(random(width), random(0, 220));
  }

  // Sun/moon
  noStroke();
  fill(239);
  ellipse(width * 0.3, height * 0.3 * sin(frameCount / 2000) + (height * 0.35), 300);

  // Base styles
  stroke(239);
  strokeWeight(10);
  strokeCap(SQUARE);
  fill(39);

  // Waves
  for (let wave = 0; wave < waves.count; wave++) {
    const distance = easeInQuad(wave / waves.count, 0, 1, 1);
    const gapBetweenWaves = map(distance, 0, 1, 1, 40);

    // Styling
    strokeWeight(distance * (waves.stroke.max - waves.stroke.min) + waves.stroke.min);
    drawingContext.setLineDash(randomDash(distance));
    drawingContext.lineDashOffset = (frameCount * -1) * distance;
    fill(39);

    beginShape();
    for (let x = -50; x < width + 100; x += 50) {
      const y = wave * gapBetweenWaves + sin(x / 100 + frameCount / -35 + wave) * noise(wave, x) * 33;
      curveVertex(x, y + 200);
    }

    vertex(width + 50, height + 50);
    vertex(0, height + 50);
    vertex(0, height + 50);
    endShape();
  }
}

// Easing function
function easeInQuad(t, b, c, d) {
  return c*(t/=d)*t + b;
}

// Random line dashes
function randomDash(scl) {
  return new Array(floor(random(6, 12)))
    .fill(0)
    .map(() => random(2, 40) * (scl + 0.2));
}
