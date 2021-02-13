/**
 * Motus: Rotating & Flipping
 *
 * https://owenmcateer.github.io/Motus-Art
 */
let timer = 0;
const speed = 0.01;
const numOfTowers = 9;
const towerSize = 27;

// Setup
function setup() {
  createCanvas(540, 540, WEBGL);
  smooth();
  pixelDensity(2);
  colorMode(RGB, 255, 255, 255, 1);
}

// Draw tick
function draw() {
  background(39);
  stroke(239);
  strokeWeight(3);
  fill(239, 0.5);
  noFill();

  translate(towerSize * 2 * numOfTowers * -0.445, 0, 0);

  for (let i = 0; i < numOfTowers; i++) {
    let r = timer;
    r -= ((numOfTowers - i) * (1 / numOfTowers));
    r = constrain(r, 0, 1);
    r = easeInOutSine(1 - r, 0, 1, 1);

    push();
    translate(i * towerSize * 2, 0, 0);
    rotateX(r * PI);
    rotateY((r > 0.5) ? timer : -timer);
    box(towerSize, towerSize * 10, towerSize);
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= PI) {
    timer = 0;
  }
}


// Easing
function easeInOutSine(t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}
