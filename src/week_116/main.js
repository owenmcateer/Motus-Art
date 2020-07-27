/**
 * Motus: The arista
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const lines = 18;
let timer = 0;
let boundary;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
}


// Draw tick
function draw() {
  background(10);
  strokeJoin(MITER);
  strokeCap(PROJECT);

  // Shadow
  fill(46);
  noStroke();
  quad(10, 0, width + 10, height, width, 0, 10, 0);
  noFill();

  const areaHeight = height + (height / (lines + 2));
  boundary = areaHeight / lines;

  // Calculate moving lines
  const lineData = [];
  for (let i = 1; i <= lines; i++) {
    // Left points
    const leftY = i * (areaHeight / lines) + (timer * boundary) - boundary;

    // Mid points
    const easeSine = easeInSine(i / lines + (timer / lines), 0, 1, 1);
    const midX = easeSine * areaHeight;
    const midY = midX - 10;

    // Right points
    const rightY = i * (areaHeight / lines) + (timer * boundary) - boundary;
    const rightX = areaHeight;

    // Add to line array
    lineData.push({
      leftX: 0,
      leftY,
      midX,
      midY,
      rightX,
      rightY,
    });
  }

  // Render vertical lines first
  noFill();
  stroke(80);
  strokeWeight(1.5);
  lineData.forEach((line) => {
    beginShape();
    vertex(width + 50, -50);
    vertex(line.midX, line.midY);
    vertex(line.midX, height + 50);
    endShape();
  });

  // Render horizontal lines on top
  noFill();
  stroke(239);
  strokeWeight(6);
  lineData.forEach((line) => {
    beginShape();
    vertex(line.leftX, line.leftY);
    vertex(line.midX, line.midY);
    vertex(line.rightX, line.rightY);
    endShape();
  });

  // Timer
  timer += 0.005;
  if (timer >= 1) {
    timer = 0;
  }
}


// Easing functions
function easeInSine(t, b, c, d) {
  return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}
