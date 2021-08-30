/**
 * Motus: Wormhole (Audio reactive)
 *
 * A remixed piece made audio reactive for Observant https://www.instagram.com/obsmus/
 * https://www.instagram.com/p/CS_u7WOBs7q/
 *
 * Original: https://owenmcateer.github.io/Motus-Art/projects/week_103.html
 */
const canvasSize = 540;
const cx = canvasSize / 2;
const rings = 30;
const downLines = 10;
let timer = 0;
const speed = 0.004;
const wormHole = {
  minY: 240,
  maxY: canvasSize * 1.1,
  minW: 2,
  maxW: 200,
};
const levels = new Array(rings).fill(0);
let soundtrack;
let amplitude;


// Preload audio
function preload() {
  soundFormats('mp3');
  soundtrack = loadSound('../assets/audio/Observant-Hattori_Hanzō-Natural_Selection');
}


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);

  amplitude = new p5.Amplitude();
}


// Draw tick
function draw() {
  background(39);

  // Click to play text
  if (frameCount === 1) {
    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    text('Click to play', width / 2, 80);
    noLoop();
  }

  // Soundtrack levels
  const level = map(amplitude.getLevel(), 0, 1, -0.4, 0.4);
  levels.unshift(level);
  levels.pop();

  // Styles
  noFill();
  stroke(239, 100);
  strokeWeight(2);

  // Draw wormhole
  for (let i = 0; i < rings; i++) {
    const iTime = ((i + timer * 4) / rings) % 1;

    const y = map(easeInSine(iTime, 0, 1, 1), 0, 1, wormHole.minY, wormHole.maxY);
    const size = map(easeOutCubic(iTime, 0, 1, 1), 0, 1, wormHole.maxW, wormHole.minW);
    ellipse(cx, y, size * 4 + (levels[i] * size), size + (levels[i] * size));

    // Top fixed ellipse
    if (i === 0) {
      ellipse(cx, wormHole.minY, wormHole.maxW * 4 + (levels[i] * size), wormHole.maxW + (levels[i] * size));
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
        cos(angle) * (fixedSize * 2 + (levels[i] * (fixedSize * 2))) + cx,
        sin(angle) * (fixedSize * 0.5 + (levels[i] * (fixedSize * 0.5))) + fixedY,
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


// On click. Plays music first time
function mouseReleased() {
  if (frameCount === 1) {
    loop();
    soundtrack.play();
  }
}
