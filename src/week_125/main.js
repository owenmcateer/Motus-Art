/**
 * Motus: The Eternal Descent
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;
let theWall;

const numOfXlines = 42;
const numOfYlines = 42;
const maxStrokeWeight = 2;
let phase = 0;
const speed = 0.0016;
const gap = 6;
const grayLight = 120;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  theWall = createGraphics(cx, height);
  pixelDensity(2);
}


// Draw tick
function draw() {
  background(0);
  theWall.clear();
  theWall.strokeCap(SQUARE);

  // X-lines
  for (let i = 0; i < numOfXlines; i++) {
    // const x = easeInSine((i - phase) / (numOfXlines - 1), 0, 1, 1);
    const x = (i - phase * 2) / (numOfXlines - 1);
    theWall.fill(grayLight, 200);
    theWall.noStroke();
    theWall.triangle(
      cx, map(x, 0, 1, height * -8 - maxStrokeWeight, height * 4 - maxStrokeWeight),
      cx, map(x, 0, 1, height * -8, height * 4),
      gap, map(x, 0, 1, 0, height),
    );
  }

  // Y-lines
  for (let i = 0; i < numOfYlines; i++) {
    const y = easeInQuint(easeInCubic((i + phase) / (numOfYlines - 1), 0, 1, 1), 0, 1, 1);
    theWall.strokeWeight(y * maxStrokeWeight + 0.5);
    theWall.noFill();
    theWall.stroke(grayLight, 200);
    theWall.line(
      map(y, 0, 1, gap, cx),
      0,
      map(y, 0, 1, gap, cx),
      height,
    );
  }

  // Left side
  push();
  translate(cx, 0);
  scale(-1, 1);
  image(theWall, 0, 0);
  pop();

  // Right side
  noStroke();
  fill(10);
  image(theWall, cx, 0);

  // The Glow
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = gap * 15;
  // drawingContext.shadowColor = 'rgba(200, 200, 250, 1)';
  drawingContext.shadowColor = 'rgba(199, 9, 192, 0.75)';
  fill(199, 9, 192);
  // Glow times 5
  for (let i = 0; i < 5; i++) {
    rect(cx - gap, 0, gap * 2, height + cx);
  }

  // Fade top
  const lineargradient = drawingContext.createLinearGradient(0, 0, 0, cx / 2);
  drawingContext.shadowBlur = 0;
  lineargradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
  lineargradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  drawingContext.fillStyle = lineargradient;
  rect(0, 0, width, cx / 2);

  // Reset shadow
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'rgba(255, 255, 248, 0.5)';




  // Frame label
  let frame = frameCount;
  if (frame < 10) {
    frame = `00${frame}`;
  }
  else if (frame < 100) {
    frame = `0${frame}`;
  }

  // Uncomment when ready to render
  save(`seq-${frame}.png`);

  // Timer
  phase += speed;
  if (phase >= 1) {
    phase = 0;
    noLoop();
  }
}


// Easing functions
function easeInCubic(t, b, c, d) {
  return c*(t/=d)*t*t + b;
}
function easeInQuint(t, b, c, d) {
  return c*(t/=d)*t*t*t*t + b;
}
