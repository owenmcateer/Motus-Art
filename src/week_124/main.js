// A WAY OUT OF THE PREFAB WORLD
const canvasSize = 540;
const speed = 0.004;
let timer = 0;
const boxHeight = 180;
const boxWidth = 10;
const radius = 110;
const numOfPillars = 16;
let modelCrystal;


// Preload
function preload() {
  modelCrystal = loadModel('../src/week_123/crystal.obj');
}


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  pixelDensity(2);
  smooth();
}


// Draw tick
function draw() {
  // Styling
  background(20);
  noStroke();
  stroke(155);
  fill(239);

  // Position camera
  rotateX(-0.2);
  translate(0, boxHeight / 3, 0);

  // Pan down+around
  translate(0, timer * -boxHeight, 0);
  rotateY((TWO_PI / numOfPillars) * timer);

  // Draw pillars
  for (let i = 0; i < numOfPillars; i++) {
    const pos = i / numOfPillars;
    let animate = (timer * 2 + pos / 2 - 1);
    animate = constrain(animate, 0, 1);

    push();
    rotateY(pos * TWO_PI);
    translate(radius, 0, 0);
    rotateZ(easeOutBounce(animate, 0, 1, 1) * PI);
    translate(0, boxHeight * -0.5, 0);
    box(boxWidth, boxHeight, boxWidth);
    pop();
  }

  // Crystal
  push();
  const crystalY = easeOutBack(timer, 0, 1, 1) * boxHeight;
  translate(0, crystalY - (boxHeight * 0.35), 0);
  // Global rotation offset
  rotateY((-TWO_PI / numOfPillars) * timer);
  // Crystal rotation
  rotateY(TWO_PI * timer);
  fill(0);
  stroke(255);

  strokeWeight(2);
  scale(0.6);
  modelCrystal.normalize();
  model(modelCrystal);
  pop();

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}


// Easing functions
function easeOutBounce(t, b, c, d) {
  if ((t /= d) < (1 / 2.75)) {
    return c * (7.5625 * t * t) + b;
  } else if (t < (2 / 2.75)) {
    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
  } else if (t < (2.5 / 2.75)) {
    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
  } else {
    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
  }
}

function easeOutBack(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}