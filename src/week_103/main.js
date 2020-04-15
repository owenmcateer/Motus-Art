/**
 * Motus: Wormhole
 */
const canvasSize = 540;
const cx = canvasSize / 2;
const rings = 20;
const downLines = 10;
let timer = 0;
const speed = 0.004;
const wormHole = {
  minY: 240,
  maxY: canvasSize * 1.1,
  minW: 2,
  maxW: 200,
};


function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
}


function draw() {
  background(39);

  noFill();
  stroke(239, 100);
  strokeWeight(2);

  for (let i = 0; i < rings; i++) {
    const iTime = ((i + timer * 4) / rings) % 1;

    const y = map(easeInSine(iTime, 0, 1, 1), 0, 1, wormHole.minY, wormHole.maxY);
    const size = map(easeOutCubic(iTime, 0, 1, 1), 0, 1, wormHole.maxW, wormHole.minW);
    ellipse(cx, y, size * 4, size);

    // Top fixed ellipse
    if (i === 0) {
      ellipse(cx, wormHole.minY, wormHole.maxW * 4, wormHole.maxW);
    }
  }

  // Downlines
  for (let a = 0; a < TWO_PI; a += (TWO_PI / downLines)) {
    beginShape();
    for (let i = 0; i < rings; i++) {
      const fixedTime = i / rings;
      const fixedY = map(easeInSine(fixedTime, 0, 1, 1), 0, 1, wormHole.minY, wormHole.maxY);
      const fixedSize = map(easeOutCubic(fixedTime, 0, 1, 1), 0, 1, wormHole.maxW, wormHole.minW);
      const angle = a + ((timer * TWO_PI) / downLines);
      vertex(
        cos(angle) * (fixedSize * 2) + cx,
        sin(angle) * (fixedSize * 0.5) + fixedY,
      );
    }
    endShape();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}

// Easing functions
function easeInSine(t, b, c, d) {
  return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}

function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}
