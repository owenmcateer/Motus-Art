/**
 * Motus: Twisted sequence
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
let timer = 0;
const speed = 0.015;
const blocks = 24;
const boxWidth = canvasSize / 2.5;
const boxHeight = boxWidth / 9;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  pixelDensity(2);
  smooth();
}


// Draw tick
function draw() {
  background(39);

  fill(239);
  stroke(0);
  strokeWeight(1);
  // rotateX(sin(timer / 4 * PI) * -0.15);

  // Slabs
  for (let i = 0; i < blocks; i++) {
    push();
    translate(0, i * boxHeight * 1.4 - 300 + (timer * (boxHeight * -1.4)));
    let r = timer;
    let plus = 0;
    if (timer >= 2) {
      r = timer - 2;
      plus = QUARTER_PI;
    }
    r = r - (i * (1 / blocks));
    r = constrain(r, 0, 1);
    r = easeInCubic(r, 0, 1, 1);
    rotateY(r * QUARTER_PI + plus);

    const flow = map(sin(((i / (blocks + (2 * timer))) * TWO_PI) + ((timer / 2) * -TWO_PI)), -1, 1, 0, 119);
    fill(flow + 71);
    box(boxWidth, boxHeight, boxWidth);
    pop();
  }



  // Frame label
  let frame = frameCount;
  if (frame < 10) {
    frame = `00${frame}`;
  }
  else if (frame < 100) {
    frame = `0${frame}`;
  }

  // Uncomment when ready to render
  // save(`seq-${frame}.png`);

  // Timer
  timer += speed;
  if (timer >= 4) {
    timer = 0;
    noLoop();
  }
}

// Easing function
function easeInCubic(t, b, c, d) {
  return c*(t/=d)*t*t + b;
}
